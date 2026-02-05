import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Octokit } from "@octokit/rest";

type RepoFile = {
  path: string;
  content: string;
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // @ts-expect-error - accessToken is a custom property added in the auth callback and not present on default types
  const accessToken = session?.accessToken;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { repoName?: string; files?: RepoFile[]; force?: boolean };
  const { repoName, files, force } = body;

  if (!repoName) {
    return NextResponse.json({ error: "Repository name is required" }, { status: 400 });
  }

  const octokit = new Octokit({
    auth: accessToken,
  });

  try {
    const user = await octokit.users.getAuthenticated();
    const username = user.data.login;
    const owner = username;
    const repo = repoName;

    // 1. Check if repo exists
    let repoData;
    let exists = false;
    try {
      const { data } = await octokit.repos.get({ owner, repo });
      repoData = data;
      exists = true;
    } catch (e: unknown) {
      const status =
        typeof e === "object" &&
        e !== null &&
        "status" in e &&
        typeof (e as { status?: unknown }).status === "number"
          ? (e as { status: number }).status
          : undefined;
      if (status !== 404) throw e;
    }

    if (exists && !force) {
      return NextResponse.json({ 
        exists: true, 
        message: `Repository '${repo}' already exists. Do you want to update it? This will overwrite existing files.`,
        repoUrl: repoData?.html_url
      });
    }

    // 2. Create repo if not exists
    if (!exists) {
      const { data } = await octokit.repos.createForAuthenticatedUser({
        name: repo,
        auto_init: true, // Create a README to start with
        private: false, // GitHub Pages usually requires public for free accounts
        description: "My Portfolio built with TalentSmith AI",
      });
      repoData = data;
    }

    // 3. Push Files
    // To push multiple files, we strictly should use the Git Data API (Tree/Commit/Ref)
    // For simplicity, we assume 'files' is an array of { path: 'index.html', content: '...' }
    // We will update the default branch (usually 'main')
    
    if (files && files.length > 0) {
      const branchReq = await octokit.repos.getBranch({
        owner,
        repo,
        branch: repoData?.default_branch || "main",
      });
      const latestCommitSha = branchReq.data.commit.sha;
      const baseTreeSha = branchReq.data.commit.commit.tree.sha;

      // Create Blobs
      const tree = await Promise.all(
        files.map(async (file: RepoFile) => {
          return {
            path: file.path,
            mode: "100644" as const,
            content: file.content,
            type: "blob" as const,
          };
        })
      );

      // Create Tree
      const { data: newTree } = await octokit.git.createTree({
        owner,
        repo,
        base_tree: baseTreeSha,
        tree,
      });

      // Create Commit
      const { data: newCommit } = await octokit.git.createCommit({
        owner,
        repo,
        message: "Update portfolio",
        tree: newTree.sha,
        parents: [latestCommitSha],
      });

      // Update Ref
      await octokit.git.updateRef({
        owner,
        repo,
        ref: `heads/${repoData?.default_branch || "main"}`,
        sha: newCommit.sha,
      });
    }

    // 4. Enable GitHub Pages
    // Check if Pages is already enabled
    let pagesUrl;
    try {
        const pages = await octokit.repos.getPages({ owner, repo });
        pagesUrl = pages.data.html_url;
    } catch (e: unknown) {
        const status =
          typeof e === "object" &&
          e !== null &&
          "status" in e &&
          typeof (e as { status?: unknown }).status === "number"
            ? (e as { status: number }).status
            : undefined;
        if (status === 404) {
             // Enable Pages
             try {
                await octokit.repos.createPagesSite({
                    owner,
                    repo,
                    source: {
                        branch: repoData?.default_branch || "main",
                        path: "/"
                    }
                });
                // Construct the URL manually as it might verify asynchronously
                pagesUrl = `https://${username}.github.io/${repo}/`;
             } catch (pageError: unknown) {
                 // It might already be enabled or fail for other reasons
                 console.error("Pages creation error", pageError);
                 // Fallback URL
                 pagesUrl = `https://${username}.github.io/${repo}/`;
             }
        } else {
            throw e;
        }
    }

    return NextResponse.json({
      success: true,
      repoUrl: repoData?.html_url,
      pagesUrl: pagesUrl,
      message: "Successfully published to GitHub!",
    });

  } catch (error: unknown) {
    console.error("GitHub API Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: message || "Something went wrong with GitHub communication" },
      { status: 500 }
    );
  }
}
