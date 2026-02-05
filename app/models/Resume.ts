import mongoose from 'mongoose';

// Experience Schema
const ExperienceSchema = new mongoose.Schema({
  jobTitle: { type: String },
  company: { type: String },
  location: String,
  startDate: { type: String },
  endDate: String,
  current: { type: Boolean, default: false },
  description: String,
  achievements: [String],
});

// Education Schema
const EducationSchema = new mongoose.Schema({
  degree: { type: String },
  institution: { type: String },
  location: String,
  graduationDate: String,
  gpa: String,
  honors: String,
});

// Project Schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String },
  description: String,
  technologies: [String],
  link: String,
  startDate: String,
  endDate: String,
});

// Certification Schema
const CertificationSchema = new mongoose.Schema({
  name: { type: String },
  issuer: String,
  issueDate: String,
  expiryDate: String,
  credentialId: String,
  link: String,
});

// Main Resume Schema
const ResumeSchema = new mongoose.Schema({
  templateId: { type: Number, required: true },
  userId: String, // Optional: for user tracking
  
  // Personal Information
  personalInfo: {
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: String,
    location: String,
    linkedin: String,
    portfolio: String,
    github: String,
    profilePhoto: String, // URL to photo
  },
  
  // Summary/Objective
  summary: {
    text: String,
  },
  
  // Experience
  experience: [ExperienceSchema],
  
  // Education
  education: [EducationSchema],
  
  // Skills
  skills: {
    technical: [String],
    soft: [String],
    languages: [String],
    tools: [String],
  },
  
  // Projects
  projects: [ProjectSchema],
  
  // Certifications
  certifications: [CertificationSchema],
  
  // Meta information
  completedSections: {
    type: [String],
    default: [],
  },
  
  currentSection: {
    type: Number,
    default: 0, // Index of current section being filled
  },
  
  isComplete: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Prevent model recompilation in development
const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

export default Resume;
