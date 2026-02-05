import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const portfolioId = data.get("portfolioId") as string || "default";

  if (!file) {
    return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Define the path: public/uploads/[portfolioId]/
  const uploadDir = path.join(process.cwd(), "public", "uploads", portfolioId);
  
  try {
    // Create directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    // Sanitize filename and save
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const filePath = path.join(uploadDir, filename);
    
    await writeFile(filePath, buffer);
    
    // Return the public URL
    const fileUrl = `/uploads/${portfolioId}/${filename}`;
    
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
