import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Resume from '@/app/models/Resume';

// GET - Fetch resume by ID
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const resumeId = searchParams.get('id');
    
    if (!resumeId) {
      return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 });
    }
    
    const resume = await Resume.findById(resumeId);
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: resume }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching resume:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Create new resume
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { templateId, personalInfo } = body;
    
    if (!templateId) {
      return NextResponse.json({ error: 'Template ID is required' }, { status: 400 });
    }
    
    const newResume = await Resume.create({
      templateId,
      personalInfo: personalInfo || {},
      summary: {},
      experience: [],
      education: [],
      skills: {},
      projects: [],
      certifications: [],
      completedSections: [],
      currentSection: 0,
      isComplete: false,
    });
    
    return NextResponse.json({ success: true, data: newResume }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating resume:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Helper to remove empty entries from arrays
const cleanEntries = (arr: unknown[], keyField: string): Record<string, unknown>[] => {
  if (!Array.isArray(arr)) return [];
  return arr.filter((item): item is Record<string, unknown> => {
    if (typeof item !== 'object' || item === null) return false;
    const value = (item as Record<string, unknown>)[keyField];
    return typeof value === 'string' && value.trim() !== '';
  });
};

// PUT - Update existing resume
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { resumeId, sectionData, sectionName, currentSection, completedSections, formData } = body;
    
    if (!resumeId) {
      return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 });
    }
    
    const updateData: Record<string, unknown> = {};
    
    // Handle single section update
    if (sectionName && sectionData !== undefined) {
      if (sectionName === 'experience') {
        updateData[sectionName] = cleanEntries(sectionData as unknown[], 'jobTitle');
      } else if (sectionName === 'education') {
        updateData[sectionName] = cleanEntries(sectionData as unknown[], 'degree');
      } else if (sectionName === 'projects') {
        updateData[sectionName] = cleanEntries(sectionData as unknown[], 'title');
      } else if (sectionName === 'certifications') {
        updateData[sectionName] = cleanEntries(sectionData as unknown[], 'name');
      } else {
        updateData[sectionName] = sectionData;
      }
    }

    // Handle full data update
    if (formData) {
      if (formData.personalInfo) updateData.personalInfo = formData.personalInfo;
      if (formData.summary) updateData.summary = formData.summary;
      
      if (formData.experience) {
        updateData.experience = cleanEntries(formData.experience, 'jobTitle');
      }
      
      if (formData.education) {
        updateData.education = cleanEntries(formData.education, 'degree');
      }
      
      if (formData.skills) updateData.skills = formData.skills;
      
      if (formData.projects) {
        updateData.projects = cleanEntries(formData.projects, 'title');
      }
      
      if (formData.certifications) {
        updateData.certifications = cleanEntries(formData.certifications, 'name');
      }
    }
    
    if (currentSection !== undefined) {
      updateData.currentSection = currentSection;
    }
    
    if (completedSections) {
      updateData.completedSections = completedSections;
    }
    
    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!updatedResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedResume }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error updating resume:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete resume
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const resumeId = searchParams.get('id');
    
    if (!resumeId) {
      return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 });
    }
    
    const deletedResume = await Resume.findByIdAndDelete(resumeId);
    
    if (!deletedResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Resume deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting resume:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
