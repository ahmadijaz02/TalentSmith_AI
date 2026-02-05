import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { geminiKeyManager, generateWithFallback } from "@/app/lib/gemini-config";

// Input Validation Schema
const RequestSchema = z.object({
  resumeData: z.object({
    personalInfo: z.any(),
    summary: z.any(),
    experience: z.array(z.any()),
    education: z.array(z.any()),
    skills: z.any(),
    projects: z.array(z.any()).optional(),
    certifications: z.array(z.any()).optional(),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 1. Validate Input
    const validation = RequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid input", 
          details: validation.error 
        }, 
        { status: 400 }
      );
    }

    const { resumeData } = validation.data;

    // 2. Construct Prompt for ATS Analysis
    const prompt = `
      You are an ATS (Applicant Tracking System) Expert and Resume Analyzer.
      
      **RESUME DATA:**
      ${JSON.stringify(resumeData, null, 2)}

      **TASK:**
      1. Analyze the resume for ATS compatibility
      2. Calculate an overall ATS score (0-100)
      3. Identify weak points that reduce the score
      4. Provide specific, actionable suggestions for each weak point
      5. Highlight missing elements that are important for ATS systems

      **CRITERIA TO ANALYZE:**
      - Keyword optimization
      - Formatting and structure
      - Contact information completeness
      - Work experience details (quantifiable achievements, action verbs)
      - Skills section (technical vs soft skills)
      - Education format
      - Grammar and spelling
      - Length and readability
      - Section organization

      **OUTPUT JSON ONLY:**
      {
        "overallScore": number (0-100),
        "categoryScores": {
          "keywords": number (0-100),
          "formatting": number (0-100),
          "content": number (0-100),
          "completeness": number (0-100)
        },
        "weakPoints": [
          {
            "category": "string (e.g., 'Experience', 'Skills', 'Keywords')",
            "issue": "string (what's wrong)",
            "impact": "high" | "medium" | "low",
            "suggestion": "string (how to fix it)",
            "scoreReduction": number (points reduced)
          }
        ],
        "strengths": ["string array of what's good"],
        "recommendations": [
          {
            "field": "string (which section)",
            "current": "string (current text if applicable)",
            "suggested": "string (improved version)",
            "reason": "string (why this is better)"
          }
        ],
        "summary": "string (overall assessment)"
      }
    `;

    // 3. Generate analysis with API Key rotation (using single model)
    const modelName = "gemini-2.5-flash";
    
    const result = await generateWithFallback(
      geminiKeyManager,
      modelName,
      prompt,
      {
        responseMimeType: "application/json",
        temperature: 0.3, // Lower temperature for more consistent analysis
      }
    );

    const generatedText = result.text;
    const keyUsed = result.keyUsed;
    const usedModel = modelName;

    // 4. Parse and Return
    const parsedResponse = JSON.parse(generatedText);
    return NextResponse.json({ 
      success: true, 
      data: parsedResponse, 
      model: usedModel,
      apiKeyUsed: keyUsed,
      totalKeys: geminiKeyManager.getKeyCount()
    });

  } catch (error: unknown) {
    console.error("ATS Analysis Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: `Failed to analyze resume: ${errorMessage}` }, 
      { status: 500 }
    );
  }
}
