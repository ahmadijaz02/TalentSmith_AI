import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { geminiKeyManager, generateWithFallback } from "@/app/lib/gemini-config";
// Input Validation Schema
const RequestSchema = z.object({
  context: z.string().min(10, "Context is too short. Please tell us more about yourself."),
  section: z.string(),
  userQuery: z.string().optional(),
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

    const { context, section, userQuery } = validation.data;

    // 2. Construct Prompt
    let prompt = "";

    if (section === "personalInfo") {
      prompt = `
        You are an expert Career Coach and Resume Builder AI.
        
        **USER CONTEXT:**
        "${context}"

        **CURRENT SECTION:**
        "${section}"
        ${userQuery ? `User Instruction: "${userQuery}"` : ""}

        **TASK:**
        1. Analyze the context to extract personal information.
        2. If the context is nonsense or completely unrelated to a resume, set "isValid" to false.
        3. Extract the following fields: fullName, email, phone, location, linkedin, portfolio, role (current job title).
        4. Format the output as a JSON object.

        **OUTPUT JSON ONLY:**
        {
          "isValid": boolean,
          "feedback": "Short feedback message.",
          "missingFields": ["List", "of", "missing", "details"],
          "structuredData": {
            "fullName": "Extracted Name",
            "email": "Extracted Email",
            "phone": "Extracted Phone",
            "location": "Extracted Location",
            "linkedin": "Extracted LinkedIn URL",
            "portfolio": "Extracted Portfolio URL",
            "role": "Extracted Role/Title"
          },
          "suggestion": "A formatted string summary of the contact info (optional)"
        }
      `;
    } else {
      prompt = `
        You are an expert Career Coach and Resume Builder AI.
        
        **USER CONTEXT:**
        "${context}"

        **CURRENT SECTION:**
        "${section}"
        ${userQuery ? `User Instruction: "${userQuery}"` : ""}

        **TASK:**
        1. Analyze the context.
        2. If the context is nonsense or completely unrelated to a resume, set "isValid" to false.
        3. If valid, check if specific details for the "${section}" section are missing.
        4. Generate the content for the "${section}".

        **OUTPUT JSON ONLY:**
        {
          "isValid": boolean,
          "feedback": "Short feedback message.",
          "missingFields": ["List", "of", "missing", "details"],
          "suggestion": "The generated resume content string."
        }
      `;
    }

    // 3. Generate content with API Key rotation (using single model)
    const modelName = "gemini-2.5-flash";
 
    const result = await generateWithFallback(
      geminiKeyManager,
      modelName,
      prompt,
      {
        responseMimeType: "application/json",
        temperature: 0.7,
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
    console.error("AI Generation Error:", error);
    
    // Proper Type Narrowing for 'unknown' error
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage }, 
      { status: 500 }
    );
  }
}