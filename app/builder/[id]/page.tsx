"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Save, CheckCircle2, User, Briefcase, 
  GraduationCap, Award, FolderGit2, FileText, Plus, Trash2, 
  Loader2, Mail, Phone, MapPin, Globe, Linkedin, Download,
  Sparkles,AlertTriangle, MessageSquare
} from "lucide-react";
import { getDefaultConfig, TemplateConfig } from "@/app/lib/template-config";

// Section definitions
const SECTIONS = [
  { key: "personalInfo", label: "Personal Information", icon: User },
  { key: "summary", label: "Professional Summary", icon: FileText },
  { key: "experience", label: "Work Experience", icon: Briefcase },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "skills", label: "Skills", icon: Award },
  { key: "projects", label: "Projects", icon: FolderGit2 },
  { key: "certifications", label: "Certifications", icon: Award },
];

// USER_DATA from page.tsx - Dummy data to show initially
const USER_DATA = {
  name: "Nadeem Ahmad",
  photo: "",
  role: "Machine Learning Engineer",
  email: "nadeem@techcorp.ai",
  phone: "+1 (555) 987-6543",
  address: "San Francisco, CA",
  linkedin: "linkedin.com/in/nadeem-ahmad-ml",
  website: "www.nadeemahmad.dev",
  summary: "Award-winning Product Designer with 8+ years of experience creating intuitive, user-centered digital experiences for Fortune 500 companies and startups. Specialized in UX/UI design, design systems, and leading cross-functional teams to deliver impactful products. Passionate about accessibility and inclusive design.",
  experience: [
    {
      company: "TechCorp AI",
      role: "Senior ML Engineer",
      date: "2021 - Present",
      desc: "Leading the development of next-generation recommendation systems, improving user engagement by 35% through advanced deep learning models."
    },
    {
      company: "DataViz Inc",
      role: "ML Research Scientist",
      date: "2018 - 2021",
      desc: "Pioneered computer vision algorithms for real-time video analysis, deployed to 10M+ users globally."
    }
  ],
  education: [
    { school: "Stanford University", degree: "M.S. Computer Science (AI)", date: "2018" },
    { school: "MIT", degree: "B.S. Computer Science", date: "2016" }
  ],
  projects: [
    { title: "AI Recommendation Engine", description: "Built a scalable recommendation engine using PyTorch and Redis.", technologies: ["Python", "PyTorch", "Redis"], link: "github.com/nadeem/ai-engine", startDate: "2020-01", endDate: "2020-06" }
  ],
  certifications: [
    { name: "AWS Certified Machine Learning - Specialty", issuer: "Amazon Web Services", issueDate: "2022-05", expiryDate: "2025-05", credentialId: "AWS-12345", link: "aws.amazon.com/verify" }
  ],
  skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "AWS", "Docker", "Kubernetes"],
  languages: ["English (Native)", "Urdu (Fluent)", "Arabic (Conversational)"]
};

// Helper Components from realpage.tsx
const FontLoader = ({ config }: { config: TemplateConfig }) => {
  useEffect(() => {
    const linkId = "google-fonts-resume";
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    const headingFont = config.styles.fontFamilyHeading.replace(/ /g, "+");
    const bodyFont = config.styles.fontFamilyBody.replace(/ /g, "+");
    link.href = `https://fonts.googleapis.com/css2?family=${headingFont}:wght@300;400;600;700&family=${bodyFont}:wght@300;400;500;600&display=swap`;
  }, [config]);
  return null;
};

const SectionTitle = ({ title, config }: { title: string, config: TemplateConfig }) => (
  <h3 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: config.styles.primaryColor }}>
    {title}
  </h3>
);

const ContactItem = ({ icon: Icon, text, config }: { icon: React.ElementType, text: string, config: TemplateConfig }) => (
  <div className="flex items-center gap-2 text-sm">
    <Icon size={14} style={{ color: config.styles.primaryColor }} />
    <span>{text}</span>
  </div>
);

const SidebarHeader = ({ title }: { title: string }) => (
  <h3 className="text-xs uppercase tracking-wider font-bold mb-3 border-b border-black/10 pb-2">
    {title}
  </h3>
);

const TimelineHeader = ({ title, icon: Icon, color }: { title: string, icon: React.ElementType, color: string }) => (
  <div className="flex items-center gap-4 mb-6 relative">
    <div 
      className="absolute -left-[41px] w-10 h-10 rounded-full flex items-center justify-center text-white z-10"
      style={{ backgroundColor: color }}
    >
      <Icon size={18} />
    </div>
    <h3 className="text-lg font-bold uppercase tracking-widest" style={{ color }}>
      {title}
    </h3>
  </div>
);

// LAYOUT ENGINES from realpage.tsx

// 1. Sidebar Layout
const SidebarLayoutSidebar = ({ config, userData }: { config: TemplateConfig, userData: typeof USER_DATA }) => {
  const { styles } = config;
  
  return (
    <div 
      className={`p-8 w-[32%] shrink-0 flex flex-col gap-6 text-sm leading-relaxed`}
      style={{ 
        backgroundColor: styles.sidebarBackgroundColor,
        color: styles.secondaryColor 
      }}
    >
      {config.hasPhoto && (
        <div className={`w-32 h-32 mx-auto overflow-hidden bg-white mb-4 shadow-sm object-cover
          ${styles.photoShape === 'circle' ? 'rounded-full' : 
            styles.photoShape === 'rounded-square' ? 'rounded-xl' : 
            styles.photoShape === 'blob' ? 'rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]' : 'rounded-none'}`}
        >
          {userData.photo ? (
            <img src={userData.photo} alt={userData.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-full h-full text-slate-300 p-2" />
          )}
        </div>
      )}

      <div>
        <h4 className="font-bold mb-3 uppercase tracking-wider text-xs border-b pb-1 border-black/10">Contact</h4>
        <div className="space-y-2 break-words">
          <ContactItem icon={Mail} text={userData.email} config={config} />
          <ContactItem icon={Phone} text={userData.phone} config={config} />
          <ContactItem icon={MapPin} text={userData.address} config={config} />
          <ContactItem icon={Linkedin} text={userData.linkedin} config={config} />
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-3 uppercase tracking-wider text-xs border-b pb-1 border-black/10">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {userData.skills.map(skill => (
            <span key={skill} className="px-2 py-1 bg-black/5 rounded text-xs font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-3 uppercase tracking-wider text-xs border-b pb-1 border-black/10">Education</h4>
        {userData.education.map((edu, i) => (
          <div key={i} className="mb-3">
            <div className="font-bold text-gray-900">{edu.school}</div>
            <div className="text-xs">{edu.degree}</div>
            <div className="text-xs opacity-70">{edu.date}</div>
          </div>
        ))}
      </div>

      {userData.certifications && userData.certifications.length > 0 && (
        <div>
          <h4 className="font-bold mb-3 uppercase tracking-wider text-xs border-b pb-1 border-black/10">Certifications</h4>
          {userData.certifications.map((cert, i) => (
            <div key={i} className="mb-3">
              <div className="font-bold text-gray-900">{cert.name}</div>
              <div className="text-xs">{cert.issuer}</div>
              <div className="text-xs opacity-70">{cert.issueDate}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarLayoutMain = ({ config, userData }: { config: TemplateConfig, userData: typeof USER_DATA }) => {
  const { styles } = config;
  
  return (
    <div className="p-10 flex-1">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: styles.fontFamilyHeading, color: styles.primaryColor }}>
          {userData.name}
        </h1>
        <p className="text-xl tracking-wide uppercase text-gray-500" style={{ fontFamily: styles.fontFamilyBody }}>
          {userData.role}
        </p>
      </div>

      <div className="mb-8">
        <SectionTitle title="Profile" config={config} />
        <p className="text-sm leading-relaxed text-gray-700">{userData.summary}</p>
      </div>

      <div className="mb-8">
        <SectionTitle title="Experience" config={config} />
        <div className="space-y-6">
          {userData.experience.map((exp, i) => (
            <div key={i} className={`relative pl-4 ${styles.entryBorder ? 'border-l-2' : ''}`} style={{ borderColor: styles.primaryColor + '40' }}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-gray-900 text-md">{exp.role}</h4>
                <span className="text-xs font-mono text-gray-500">{exp.date}</span>
              </div>
              <div className="text-sm font-semibold mb-2" style={{ color: styles.secondaryColor }}>{exp.company}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {userData.projects && userData.projects.length > 0 && (
        <div>
          <SectionTitle title="Projects" config={config} />
          <div className="space-y-6">
            {userData.projects.map((proj, i) => (
              <div key={i} className={`relative pl-4 ${styles.entryBorder ? 'border-l-2' : ''}`} style={{ borderColor: styles.primaryColor + '40' }}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 text-md">{proj.title}</h4>
                  <span className="text-xs font-mono text-gray-500">{proj.startDate} - {proj.endDate}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">{proj.description}</p>
                {proj.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {proj.technologies.map((tech, t) => (
                      <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarLayout = ({ config, side, userData }: { config: TemplateConfig, side: "left" | "right", userData: typeof USER_DATA }) => {
  return (
    <div className={`w-full h-full flex ${side === 'right' ? 'flex-row-reverse' : 'flex-row'} bg-white`}>
      <SidebarLayoutSidebar config={config} userData={userData} />
      <SidebarLayoutMain config={config} userData={userData} />
    </div>
  );
};

// 2. Modern Stacked Layout
const ModernStackedLayout = ({ config, userData }: { config: TemplateConfig, userData: typeof USER_DATA }) => {
  const { styles } = config;

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div 
        className="px-10 py-12 border-b border-gray-100"
        style={{ backgroundColor: styles.headerBackgroundColor }}
      >
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2" style={{ fontFamily: styles.fontFamilyHeading, color: styles.primaryColor }}>
                {userData.name}
              </h1>
              <p className="text-lg uppercase tracking-widest font-medium" style={{ color: styles.secondaryColor }}>{userData.role}</p>
            </div>
            {config.hasPhoto && (
               <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg">
                  {userData.photo ? (
                    <img src={userData.photo} alt={userData.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-full h-full p-2 text-gray-400"/>
                  )}
               </div>
            )}
        </div>
        
        <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-600">
           <span className="flex items-center gap-1"><Mail size={14}/> {userData.email}</span>
           <span className="flex items-center gap-1"><Phone size={14}/> {userData.phone}</span>
           <span className="flex items-center gap-1"><MapPin size={14}/> {userData.address}</span>
           <span className="flex items-center gap-1"><Globe size={14}/> {userData.website}</span>
        </div>
      </div>

      <div className="p-10 space-y-8 flex-1">
         <div>
            <SectionTitle title="Professional Summary" config={config} />
            <p className="text-gray-700 leading-relaxed">{userData.summary}</p>
         </div>

         <div>
            <SectionTitle title="Experience" config={config} />
            {userData.experience.map((exp, i) => (
                <div key={i} className="mb-6 grid grid-cols-[1fr_3fr] gap-4">
                   <div className="text-sm text-gray-500 font-mono mt-1">{exp.date}</div>
                   <div>
                      <h4 className="font-bold text-gray-900 text-lg">{exp.role}</h4>
                      <div className="text-primary font-medium mb-2" style={{ color: styles.primaryColor }}>{exp.company}</div>
                      <p className="text-sm text-gray-600">{exp.desc}</p>
                   </div>
                </div>
            ))}
         </div>

         {userData.projects && userData.projects.length > 0 && (
           <div>
              <SectionTitle title="Projects" config={config} />
              {userData.projects.map((proj, i) => (
                  <div key={i} className="mb-6 grid grid-cols-[1fr_3fr] gap-4">
                     <div className="text-sm text-gray-500 font-mono mt-1">{proj.startDate} - {proj.endDate}</div>
                     <div>
                        <h4 className="font-bold text-gray-900 text-lg">{proj.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{proj.description}</p>
                        {proj.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {proj.technologies.map((tech, t) => (
                              <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{tech}</span>
                            ))}
                          </div>
                        )}
                     </div>
                  </div>
              ))}
           </div>
         )}

         <div className="grid grid-cols-2 gap-10">
            <div>
              <SectionTitle title="Education" config={config} />
              {userData.education.map((edu, i) => (
                 <div key={i} className="mb-4">
                    <div className="font-bold">{edu.school}</div>
                    <div className="text-sm">{edu.degree}</div>
                    <div className="text-xs text-gray-500">{edu.date}</div>
                 </div>
              ))}

              {userData.certifications && userData.certifications.length > 0 && (
                <div className="mt-6">
                  <SectionTitle title="Certifications" config={config} />
                  {userData.certifications.map((cert, i) => (
                     <div key={i} className="mb-4">
                        <div className="font-bold">{cert.name}</div>
                        <div className="text-sm">{cert.issuer}</div>
                        <div className="text-xs text-gray-500">{cert.issueDate}</div>
                     </div>
                  ))}
                </div>
              )}
            </div>
            <div>
               <SectionTitle title="Skills" config={config} />
               <div className="flex flex-wrap gap-2">
                  {userData.skills.map(s => <span key={s} className="border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold text-gray-600">{s}</span>)}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// 3. Artistic Banner Layout
const ArtisticBannerLayout = ({ config, userData }: { config: TemplateConfig, userData: typeof USER_DATA }) => {
  const { styles } = config;

  return (
    <div className="w-full h-full bg-white flex flex-col">
       <div 
          className="px-10 py-16 text-white"
          style={{ backgroundColor: styles.headerBackgroundColor === '#ffffff' ? styles.primaryColor : styles.headerBackgroundColor }}
       >
          <div className="flex items-end justify-between">
            <div className={`${styles.headerBackgroundColor === '#ffffff' || styles.headerBackgroundColor === '#111827' ? 'text-white' : 'text-gray-900'}`}>
                <h1 className="text-6xl font-bold mb-4" style={{ fontFamily: styles.fontFamilyHeading }}>
                  {userData.name.split(' ')[0]} <br/> 
                  <span className="opacity-70">{userData.name.split(' ')[1]}</span>
                </h1>
                <p className="text-xl tracking-widest uppercase border-t border-current pt-4 inline-block">
                  {userData.role}
                </p>
            </div>
            {config.hasPhoto && (
              <div className="w-40 h-40 bg-white shadow-2xl -mb-24 mr-10 relative z-10 overflow-hidden">
                 {userData.photo ? (
                   <img src={userData.photo} alt={userData.name} className="w-full h-full object-cover" />
                 ) : (
                   <User className="w-full h-full p-4 text-gray-300"/>
                 )}
              </div>
            )}
          </div>
       </div>

       <div className="flex-1 p-12 mt-10 grid grid-cols-[2fr_1fr] gap-12">
           <div className="space-y-10">
              <div>
                 <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: styles.primaryColor }}>
                    <span className="w-8 h-1 bg-current block"></span> Profile
                 </h3>
                 <p className="text-gray-600 leading-relaxed">{userData.summary}</p>
              </div>

              <div>
                 <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: styles.primaryColor }}>
                    <span className="w-8 h-1 bg-current block"></span> Experience
                 </h3>
                 {userData.experience.map((exp, i) => (
                    <div key={i} className="mb-8 border-l-2 pl-6" style={{ borderColor: styles.secondaryColor }}>
                       <h4 className="font-bold text-lg">{exp.role}</h4>
                       <div className="text-sm font-bold uppercase text-gray-400 mb-2">{exp.company} | {exp.date}</div>
                       <p className="text-gray-600 text-sm">{exp.desc}</p>
                    </div>
                 ))}
              </div>

              {userData.projects && userData.projects.length > 0 && (
                <div>
                   <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: styles.primaryColor }}>
                      <span className="w-8 h-1 bg-current block"></span> Projects
                   </h3>
                   {userData.projects.map((proj, i) => (
                      <div key={i} className="mb-8 border-l-2 pl-6" style={{ borderColor: styles.secondaryColor }}>
                         <h4 className="font-bold text-lg">{proj.title}</h4>
                         <div className="text-sm font-bold uppercase text-gray-400 mb-2">{proj.startDate} - {proj.endDate}</div>
                         <p className="text-gray-600 text-sm mb-2">{proj.description}</p>
                         {proj.technologies && (
                            <div className="flex flex-wrap gap-2">
                              {proj.technologies.map((tech, t) => (
                                <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{tech}</span>
                              ))}
                            </div>
                         )}
                      </div>
                   ))}
                </div>
              )}
           </div>

           <div className="space-y-10 pt-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                 <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
                 <div className="space-y-3 text-sm text-gray-600">
                    <div>{userData.email}</div>
                    <div>{userData.phone}</div>
                    <div>{userData.address}</div>
                    <div>{userData.website}</div>
                 </div>
              </div>

              <div>
                 <h4 className="font-bold text-gray-900 mb-4">Education</h4>
                 {userData.education.map((edu, i) => (
                    <div key={i} className="mb-4">
                       <div className="font-bold">{edu.school}</div>
                       <div className="text-sm text-gray-500">{edu.degree}</div>
                    </div>
                 ))}
              </div>

              {userData.certifications && userData.certifications.length > 0 && (
                <div>
                   <h4 className="font-bold text-gray-900 mb-4">Certifications</h4>
                   {userData.certifications.map((cert, i) => (
                      <div key={i} className="mb-4">
                         <div className="font-bold">{cert.name}</div>
                         <div className="text-sm text-gray-500">{cert.issuer}</div>
                      </div>
                   ))}
                </div>
              )}

              <div>
                 <h4 className="font-bold text-gray-900 mb-4">Expertise</h4>
                 <div className="flex flex-col gap-2">
                    {userData.skills.map(s => (
                       <div key={s} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                          <span className="text-sm text-gray-600">{s}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
       </div>
    </div>
  );
};

// 4. Modern Grid Layout
const ModernGridLayout = ({ config, userData }: { config: TemplateConfig, userData: typeof USER_DATA }) => {
   const { styles } = config;
   return (
     <div className="w-full h-full bg-white p-10 flex flex-col">
        <div className="text-center pb-10 border-b-2 border-gray-100 mb-10">
           {config.hasPhoto && (
             <div className="w-32 h-32 mx-auto rounded-full bg-slate-100 mb-6 overflow-hidden">
                {userData.photo ? (
                  <img src={userData.photo} alt={userData.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-full h-full p-4 text-slate-300"/>
                )}
             </div>
           )}
           <h1 className="text-4xl font-bold mb-2 uppercase tracking-tight" style={{ color: styles.primaryColor, fontFamily: styles.fontFamilyHeading }}>{userData.name}</h1>
           <p className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">{userData.role}</p>
           
           <div className="flex justify-center gap-4 text-xs font-bold text-gray-500 uppercase">
              <span>{userData.email}</span>
              <span>•</span>
              <span>{userData.phone}</span>
              <span>•</span>
              <span>{userData.address}</span>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-12 flex-1">
           <div className="space-y-8">
              <div>
                <SectionTitle title="Profile" config={config} />
                <p className="text-sm text-gray-600 text-justify">{userData.summary}</p>
              </div>

              <div>
                <SectionTitle title="Education" config={config} />
                {userData.education.map((edu, i) => (
                    <div key={i} className="mb-4">
                       <div className="font-bold text-gray-900">{edu.school}</div>
                       <div className="text-sm text-gray-600 italic">{edu.degree}</div>
                       <div className="text-xs text-gray-400 mt-1">{edu.date}</div>
                    </div>
                 ))}
              </div>

              {userData.certifications && userData.certifications.length > 0 && (
                <div>
                   <SectionTitle title="Certifications" config={config} />
                   {userData.certifications.map((cert, i) => (
                      <div key={i} className="mb-4">
                         <div className="font-bold text-gray-900">{cert.name}</div>
                         <div className="text-sm text-gray-600 italic">{cert.issuer}</div>
                         <div className="text-xs text-gray-400 mt-1">{cert.issueDate}</div>
                      </div>
                   ))}

                </div>
              )}

              <div>
                <SectionTitle title="Skills" config={config} />
                <div className="grid grid-cols-2 gap-2">
                   {userData.skills.map(s => <div key={s} className="text-sm text-gray-600 border-b border-gray-100 pb-1">{s}</div>)}
                </div>
              </div>
           </div>

           <div>
             <SectionTitle title="Experience" config={config} />
             <div className="space-y-8 border-l border-gray-100 pl-6 ml-2">
                {userData.experience.map((exp, i) => (
                   <div key={i} className="relative">
                      <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-white border-2" style={{ borderColor: styles.primaryColor }}></div>
                      
                      <h4 className="font-bold text-lg">{exp.role}</h4>
                      <div className="text-sm font-bold text-gray-400 mb-2">{exp.company} | {exp.date}</div>
                      <p className="text-sm text-gray-600 leading-relaxed">{exp.desc}</p>
                   </div>
                ))}
             </div>

             {userData.projects && userData.projects.length > 0 && (
                <div className="mt-8">
                   <SectionTitle title="Projects" config={config} />
                   <div className="space-y-8 border-l border-gray-100 pl-6 ml-2">
                      {userData.projects.map((proj, i) => (
                         <div key={i} className="relative">
                            <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-white border-2" style={{ borderColor: styles.primaryColor }}></div>
                            
                            <h4 className="font-bold text-lg">{proj.title}</h4>
                            <div className="text-sm font-bold text-gray-400 mb-2">{proj.startDate} - {proj.endDate}</div>
                            <p className="text-sm text-gray-600 leading-relaxed mb-2">{proj.description}</p>
                            {proj.technologies && (
                               <div className="flex flex-wrap gap-2">
                                 {proj.technologies.map((tech, t) => (
                                   <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{tech}</span>
                                 ))}
                               </div>
                            )}
                         </div>
                      ))}
                   </div>
                </div>
             )}
           </div>
        </div>
     </div>
   );
};

// 5. Minimal Clean Layout
const MinimalCleanLayout = ({ config, userData }: { config: TemplateConfig, userData: typeof USER_DATA }) => {
   const { styles } = config;
   return (
     <div className="w-full h-full bg-white p-14 flex flex-col font-light text-black">
        <header className="mb-16">
           <h1 className="text-5xl mb-4" style={{ fontFamily: styles.fontFamilyHeading, fontWeight: 300 }}>{userData.name}</h1>
           <div className="flex justify-between items-end border-t border-black pt-4">
              <p className="text-lg uppercase tracking-widest">{userData.role}</p>
              <div className="text-right text-xs leading-loose">
                 {userData.email} <br/> {userData.phone}
              </div>
           </div>
        </header>

        <div className="grid grid-cols-[1fr_3fr] gap-10">
           <div className="text-xs font-bold uppercase tracking-widest pt-2">Summary</div>
           <div className="text-sm leading-relaxed mb-8">{userData.summary}</div>

           <div className="text-xs font-bold uppercase tracking-widest pt-2">Experience</div>
           <div className="space-y-10">
              {userData.experience.map((exp, i) => (
                 <div key={i}>
                    <div className="flex justify-between items-baseline mb-2">
                       <h4 className="font-bold text-lg">{exp.role}</h4>
                       <span className="text-xs">{exp.date}</span>
                    </div>
                    <div className="text-sm italic mb-2">{exp.company}</div>
                    <p className="text-sm opacity-80">{exp.desc}</p>
                 </div>
              ))}
           </div>

           {userData.projects && userData.projects.length > 0 && (
              <>
                 <div className="text-xs font-bold uppercase tracking-widest pt-2 mt-8">Projects</div>
                 <div className="space-y-10">
                    {userData.projects.map((proj, i) => (
                       <div key={i}>
                          <div className="flex justify-between items-baseline mb-2">
                             <h4 className="font-bold text-lg">{proj.title}</h4>
                             <span className="text-xs">{proj.startDate} - {proj.endDate}</span>
                          </div>
                          <p className="text-sm opacity-80 mb-2">{proj.description}</p>
                          {proj.technologies && (
                             <div className="text-xs opacity-60">
                                {proj.technologies.join(" • ")}
                             </div>
                          )}
                       </div>
                    ))}
                 </div>
              </>
           )}

           <div className="text-xs font-bold uppercase tracking-widest pt-2 mt-8">Education</div>
           <div>
              {userData.education.map((edu, i) => (
                 <div key={i}>
                    <div className="font-bold">{edu.school}</div>
                    <div className="text-sm">{edu.degree}</div>
                 </div>
              ))}
           </div>

           {userData.certifications && userData.certifications.length > 0 && (
              <>
                 <div className="text-xs font-bold uppercase tracking-widest pt-2 mt-8">Certifications</div>
                 <div>
                    {userData.certifications.map((cert, i) => (
                       <div key={i} className="mb-2">
                          <div className="font-bold">{cert.name}</div>
                          <div className="text-sm">{cert.issuer}</div>
                       </div>
                    ))}
                 </div>
              </>
           )}
           
           <div className="text-xs font-bold uppercase tracking-widest pt-2 mt-8">Skills</div>
           <div className="text-sm leading-loose">
              {userData.skills.join("  •  ")}
           </div>
        </div>
     </div>
   );
};

// 6. Timeline Vertical Layout
const TimelineVerticalLayout = ({ config, userData }: { config: TemplateConfig, userData: typeof USER_DATA }) => {
  const { styles } = config;

  return (
    <div className="w-full h-full bg-white p-12 flex flex-col font-sans">
      
      <div className="mb-10 pb-6 border-b-[3px]" style={{ borderColor: styles.secondaryColor }}>
        <h1 className="text-5xl font-extrabold uppercase mb-2 tracking-tight text-gray-800">
          {userData.name}
        </h1>
        <p className="text-xl uppercase tracking-[0.15em] text-gray-500 font-medium">
          {userData.role}
        </p>
      </div>

      <div className="grid grid-cols-[30%_1fr] gap-10 flex-1 relative">
        
        <div className="space-y-10">
          <div>
            <SidebarHeader title="Contact" />
            <div className="space-y-4 text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-3">
                <Phone size={16} fill="black" className="text-black" /> 
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} fill="black" className="text-black" />
                <span className="break-all">{userData.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} fill="black" className="text-black shrink-0" />
                <span>{userData.address}</span>
              </div>
               <div className="flex items-center gap-3">
                <Globe size={16} className="text-black" />
                <span className="break-all">{userData.website}</span>
              </div>
            </div>
          </div>

          <div>
            <SidebarHeader title="Skills" />
            <ul className="space-y-3 text-sm text-gray-600">
              {userData.skills.map(s => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SidebarHeader title="Languages" />
            <ul className="space-y-2 text-sm text-gray-600">
               {userData.languages.map((lang, i) => (
                <li key={i}>• {lang}</li>
               ))}
            </ul>
          </div>

          {userData.certifications && userData.certifications.length > 0 && (
            <div>
              <SidebarHeader title="Certifications" />
              <ul className="space-y-4 text-sm text-gray-600">
                 {userData.certifications.map((cert, i) => (
                  <li key={i}>
                    <div className="font-bold">{cert.name}</div>
                    <div className="text-xs text-gray-500">{cert.issuer}</div>
                  </li>
                 ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative pl-10 border-l-2" style={{ borderColor: styles.secondaryColor }}>
          
          <div className="mb-10">
            <TimelineHeader title="Profile" icon={User} color={styles.primaryColor} />
            <div className="relative">
               <div className="absolute -left-[45px] top-1 w-3 h-3 bg-white border-2 rounded-full z-10" style={{ borderColor: styles.secondaryColor }}></div>
               <p className="text-sm leading-7 text-gray-600 text-justify">
                  {userData.summary}
               </p>
            </div>
          </div>

          <div className="mb-10">
            <TimelineHeader title="Work Experience" icon={Briefcase} color={styles.primaryColor} />
            <div className="space-y-8">
              {userData.experience.map((exp, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-white border-2 rounded-full z-10" style={{ borderColor: styles.secondaryColor }}></div>
                  
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-800 text-lg">{exp.company}</h4>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{exp.date}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">{exp.role}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {userData.projects && userData.projects.length > 0 && (
            <div className="mb-10">
              <TimelineHeader title="Projects" icon={Briefcase} color={styles.primaryColor} />
              <div className="space-y-8">
                {userData.projects.map((proj, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-white border-2 rounded-full z-10" style={{ borderColor: styles.secondaryColor }}></div>
                    
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-gray-800 text-lg">{proj.title}</h4>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{proj.startDate} - {proj.endDate}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                      {proj.description}
                    </p>
                    {proj.technologies && (
                       <div className="flex flex-wrap gap-2">
                         {proj.technologies.map((tech, t) => (
                           <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 border border-gray-200">{tech}</span>
                         ))}
                       </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
             <TimelineHeader title="Education" icon={GraduationCap} color={styles.primaryColor} />
             <div className="space-y-6">
                {userData.education.map((edu, i) => (
                   <div key={i} className="relative">
                      <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-white border-2 rounded-full z-10" style={{ borderColor: styles.secondaryColor }}></div>
                      
                      <div className="flex justify-between items-end border-b border-gray-200 pb-2 mb-2">
                         <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                         <span className="text-xs font-bold text-gray-500">{edu.date}</span>
                      </div>
                      <div className="text-sm text-gray-600">{edu.school}</div>
                   </div>
                ))}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

// 7. Curved Sidebar Layout
const CurvedSidebarLayout = ({ config, userData }: { config: TemplateConfig, userData: typeof USER_DATA }) => {
  const { styles } = config;

  const SkillWithDots = ({ skill }: { skill: string }) => {
    const rating = Math.floor(Math.random() * 2) + 4;
    
    return (
      <div className="flex justify-between items-center mb-2 text-sm">
        <span className="font-medium text-slate-700">{skill}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div 
              key={dot} 
              className={`w-2.5 h-2.5 rounded-full ${dot <= rating ? 'bg-[#003b5c]' : 'bg-slate-300'}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-white flex flex-row font-sans">
      
      <div className="w-[22%] bg-[#f8fafc] flex flex-col relative shrink-0">
        
        <div className="relative bg-[#003b5c] text-white pt-10 pb-16 px-4 text-center">
           <h1 className="text-3xl font-bold mb-1">{userData.name}</h1>
           <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
             <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-12 w-full fill-[#f8fafc]">
               <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
             </svg>
           </div>
        </div>

        <div className="px-4 py-4 flex-1 space-y-8">
           
           <div>
              <h3 className="text-[#003b5c] text-xl font-normal mb-4 border-b border-slate-300 pb-1">Personal details</h3>
              <div className="space-y-3 text-sm text-slate-700">
                 <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[#003b5c]" />
                    <span className="break-all">{userData.email}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[#003b5c]" />
                    <span>{userData.phone}</span>
                 </div>
                 <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#003b5c] shrink-0" />
                    <span>{userData.address}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Linkedin size={16} className="text-[#003b5c]" />
                    <span className="break-all">{userData.linkedin}</span>
                 </div>
              </div>
           </div>

           <div>
              <h3 className="text-[#003b5c] text-xl font-normal mb-4 border-b border-slate-300 pb-1">Hard Skills</h3>
              <div>
                {userData.skills.slice(0, 4).map(s => <SkillWithDots key={s} skill={s} />)}
              </div>
           </div>

           <div>
              <h3 className="text-[#003b5c] text-xl font-normal mb-4 border-b border-slate-300 pb-1">Soft Skills</h3>
              <div>
                {userData.skills.slice(4).map(s => <SkillWithDots key={s} skill={s} />)}
              </div>
           </div>

           {userData.certifications && userData.certifications.length > 0 && (
              <div>
                 <h3 className="text-[#003b5c] text-xl font-normal mb-4 border-b border-slate-300 pb-1">Certifications</h3>
                 <div className="space-y-3">
                   {userData.certifications.map((cert, i) => (
                     <div key={i} className="text-sm">
                       <div className="font-medium text-slate-700">{cert.name}</div>
                       <div className="text-xs text-slate-500">{cert.issuer}</div>
                     </div>
                   ))}
                 </div>
              </div>
           )}

        </div>

        <div className="relative h-24 mt-auto">
           <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
             <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-16 w-full fill-[#003b5c]">
               <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
             </svg>
           </div>
           <div className="h-full bg-[#003b5c]"></div>
        </div>

      </div>

      <div className="flex-1 p-6 pt-12 space-y-8 text-slate-800">
         
         <div>
            <h2 className="text-[#003b5c] text-2xl font-light mb-3 border-b border-slate-200 pb-2">Summary</h2>
            <p className="text-sm leading-relaxed text-slate-700">{userData.summary}</p>
         </div>

         <div>
            <h2 className="text-[#003b5c] text-2xl font-light mb-4 border-b border-slate-200 pb-2">Work Experience</h2>
            <div className="space-y-6">
               {userData.experience.map((exp, i) => (
                  <div key={i}>
                     <div className="flex justify-between items-baseline font-bold text-slate-800 text-sm mb-1">
                        <span>{exp.role}</span>
                        <span>{exp.date}</span>
                     </div>
                     <div className="text-[#003b5c] text-sm mb-2 font-medium">{exp.company}</div>
                     <p className="text-sm text-slate-600 leading-relaxed pl-3 border-l-2 border-slate-100">
                       • {exp.desc}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {userData.projects && userData.projects.length > 0 && (
            <div>
               <h2 className="text-[#003b5c] text-2xl font-light mb-4 border-b border-slate-200 pb-2">Projects</h2>
               <div className="space-y-6">
                  {userData.projects.map((proj, i) => (
                     <div key={i}>
                        <div className="flex justify-between items-baseline font-bold text-slate-800 text-sm mb-1">
                           <span>{proj.title}</span>
                           <span>{proj.startDate} - {proj.endDate}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed pl-3 border-l-2 border-slate-100 mb-2">
                          • {proj.description}
                        </p>
                        {proj.technologies && (
                           <div className="pl-3 text-xs text-slate-500">
                              {proj.technologies.join(" • ")}
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         )}

         <div>
            <h2 className="text-[#003b5c] text-2xl font-light mb-4 border-b border-slate-200 pb-2">Education</h2>
            <div className="space-y-4">
               {userData.education.map((edu, i) => (
                  <div key={i}>
                     <div className="flex justify-between items-baseline font-bold text-slate-800 text-sm mb-1">
                        <span>{edu.degree}</span>
                        <span>{edu.date}</span>
                     </div>
                     <div className="text-[#003b5c] text-sm">{edu.school}</div>
                  </div>
               ))}
            </div>
         </div>

      </div>

    </div>
  );
};

// 8. Bar Sidebar Right Layout
const getStableRandom = (seed: string, min: number, max: number) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const range = max - min + 1;
  return min + (Math.abs(hash) % range);
};

const SkillProgressBar = ({ skill, primaryColor }: { skill: string; primaryColor: string }) => {
  const width = getStableRandom(skill, 70, 100);
  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-slate-700 mb-1">{skill}</div>
      <div className="w-full h-2 bg-gray-200">
        <div className="h-full" style={{ width: `${width}%`, backgroundColor: primaryColor }}></div>
      </div>
    </div>
  );
};

const BarSidebarRightLayout = ({ config, userData }: { config: TemplateConfig, userData: typeof USER_DATA }) => {
  const { styles } = config;

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans">
      
      <div 
        className="px-10 py-12 text-white"
        style={{ backgroundColor: styles.headerBackgroundColor }}
      >
        <h1 className="text-4xl font-normal mb-3 tracking-wide">
          {userData.name}
        </h1>
        
        <div className="flex flex-wrap gap-6 text-sm opacity-80 font-light">
           <div className="flex items-center gap-2">
              <Mail size={14} /> {userData.email}
           </div>
           <div className="flex items-center gap-2">
              <Phone size={14} /> {userData.phone}
           </div>
           <div className="flex items-center gap-2">
              <MapPin size={14} /> {userData.address}
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-[1fr_24%]">
        
        <div className="p-6 pr-8 space-y-10">
           
           <div>
              <h2 className="text-2xl text-slate-700 mb-3">Summary</h2>
              <hr className="border-gray-200 mb-4" />
              <p className="text-sm leading-relaxed text-slate-600">{userData.summary}</p>
           </div>

           <div>
              <h2 className="text-2xl text-slate-700 mb-3">Work Experience</h2>
              <hr className="border-gray-200 mb-6" />
              <div className="space-y-8">
                 {userData.experience.map((exp, i) => (
                    <div key={i}>
                       <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-slate-800">{exp.role}</h3>
                          <span className="text-xs text-slate-500">{exp.date}</span>
                       </div>
                       <div className="text-sm text-slate-500 italic mb-2">{exp.company}</div>
                       <p className="text-sm text-slate-600 leading-relaxed">• {exp.desc}</p>
                    </div>
                 ))}
              </div>
           </div>

           {userData.projects && userData.projects.length > 0 && (
              <div>
                 <h2 className="text-2xl text-slate-700 mb-3">Projects</h2>
                 <hr className="border-gray-200 mb-6" />
                 <div className="space-y-8">
                    {userData.projects.map((proj, i) => (
                       <div key={i}>
                          <div className="flex justify-between items-baseline mb-1">
                             <h3 className="font-bold text-slate-800">{proj.title}</h3>
                             <span className="text-xs text-slate-500">{proj.startDate} - {proj.endDate}</span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed mb-2">• {proj.description}</p>
                          {proj.technologies && (
                             <div className="text-xs text-slate-400">
                                {proj.technologies.join(" • ")}
                             </div>
                          )}
                       </div>
                    ))}
                 </div>
              </div>
           )}

           <div>
              <h2 className="text-2xl text-slate-700 mb-3">Education</h2>
              <hr className="border-gray-200 mb-4" />
              {userData.education.map((edu, i) => (
                 <div key={i} className="mb-4">
                    <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                    <div className="text-sm text-slate-600">{edu.school}</div>
                    <div className="text-xs text-slate-400 mt-1">Graduated: {edu.date}</div>
                 </div>
              ))}
           </div>

        </div>

        <div className="p-6 pl-4 border-l border-gray-100 bg-white">
           
           <div className="mb-10">
              <h3 className="text-lg text-slate-700 mb-3">Personal details</h3>
              <hr className="border-gray-200 mb-4" />
              <div className="text-sm text-slate-600">
                 <div className="font-bold mb-1">LinkedIn</div>
                 <div className="break-all text-slate-500">{userData.linkedin}</div>
              </div>
           </div>

           <div className="mb-10">
              <h3 className="text-lg text-slate-700 mb-3">Hard Skills</h3>
              <hr className="border-gray-200 mb-4" />
              <div>
                 {userData.skills.slice(0, 5).map(s => (
                    <SkillProgressBar key={s} skill={s} primaryColor={styles.primaryColor} />
                 ))}
              </div>
           </div>

           <div className="mb-10">
              <h3 className="text-lg text-slate-700 mb-3">Soft Skills</h3>
              <hr className="border-gray-200 mb-4" />
              <div>
                 {userData.skills.slice(5).map(s => (
                    <SkillProgressBar key={s} skill={s} primaryColor={styles.primaryColor} />
                 ))}
              </div>
           </div>

           {userData.certifications && userData.certifications.length > 0 && (
              <div className="mb-10">
                 <h3 className="text-lg text-slate-700 mb-3">Certifications</h3>
                 <hr className="border-gray-200 mb-4" />
                 <div className="space-y-4">
                    {userData.certifications.map((cert, i) => (
                       <div key={i}>
                          <div className="text-sm font-medium text-slate-700">{cert.name}</div>
                          <div className="text-xs text-slate-500">{cert.issuer}</div>
                       </div>
                    ))}
                 </div>
              </div>
           )}

           <div>
              <h3 className="text-lg text-slate-700 mb-3">Languages</h3>
              <hr className="border-gray-200 mb-4" />
              {userData.languages.map((lang, i) => (
                <SkillProgressBar key={i} skill={lang} primaryColor={styles.primaryColor} />
              ))}
           </div>

        </div>

      </div>

    </div>
  );
};

// Layout Renderer
const renderLayout = (config: TemplateConfig, userData: typeof USER_DATA) => {
  switch(config.layout) {
    case "classic-sidebar-left": return <SidebarLayout config={config} side="left" userData={userData} />;
    case "classic-sidebar-right": return <SidebarLayout config={config} side="right" userData={userData} />;
    case "modern-stacked": return <ModernStackedLayout config={config} userData={userData} />;
    case "artistic-banner": return <ArtisticBannerLayout config={config} userData={userData} />;
    case "modern-grid": return <ModernGridLayout config={config} userData={userData} />;
    case "minimal-clean": return <MinimalCleanLayout config={config} userData={userData} />;
    case "timeline-vertical": return <TimelineVerticalLayout config={config} userData={userData} />;
    case "curved-sidebar": return <CurvedSidebarLayout config={config} userData={userData} />;
    case "bar-sidebar-right": return <BarSidebarRightLayout config={config} userData={userData} />;
    default: return <SidebarLayout config={config} side="left" userData={userData} />;
  }
};

// --- UPDATED COMPONENT: AI ASSISTANT ---
type AIResponse = {
  isValid: boolean;
  feedback: string;
  missingFields?: string[];
  suggestion?: string;
  structuredData?: Record<string, unknown>;
};

const AIAssistant = ({
  context,
  section,
  onApply
}: {
  context: string;
  section: string;
  onApply: (data: AIResponse | string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);
  
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState("");

  const handleAskAI = async () => {
    setIsThinking(true);
    setResponse(null);
    setError("");

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: context, // Uses the global context saved earlier
          section: section,
          userQuery: query // Optional: user can add specific instructions
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate response");
      }

      setResponse(data.data);
    } catch (err) {
      console.error(err);
      setError("AI is temporarily unavailable. Please check your connection.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="mb-6 bg-gradient-to-b from-[#14B8A6]/10 to-transparent border border-[#14B8A6]/30 rounded-xl p-4 shadow-lg shadow-[#14B8A6]/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-[#14B8A6] font-bold text-sm uppercase tracking-wide">
          <Sparkles size={14} />
          AI Assistant
        </div>
        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-white/5">
          Gemini
        </span>
      </div>
      
      <div className="text-xs text-slate-500 mb-4 line-clamp-2 italic border-l-2 border-slate-700 pl-2">
        Context: {context}
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs flex items-center gap-2">
          <AlertTriangle size={14} />
          {error}
        </div>
      )}

      {/* FEEDBACK STATE (Invalid Input or Missing Info) */}
      {response && !response.isValid && (
        <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg space-y-2">
          <div className="text-amber-500 text-xs font-bold flex items-center gap-2">
            <AlertTriangle size={14} />
            Input Needs Attention
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">{response.feedback}</p>
          {response.missingFields && response.missingFields.length > 0 && (
            <ul className="list-disc list-inside text-xs text-amber-400/80 pt-1">
              {response.missingFields.map((field, i) => (
                <li key={i}>Missing: {field}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* SUCCESS STATE (Suggestion Generated) */}
      {response && response.isValid && (
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
            <MessageSquare size={14} />
            Suggestion
          </div>
          <div className="bg-slate-900 rounded-lg p-3 text-sm text-slate-300 border border-white/5 leading-relaxed whitespace-pre-wrap">
            {response.suggestion || (response.structuredData ? "Structured data extracted successfully." : "")}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onApply(response)}
              className="flex-1 py-2 bg-[#14B8A6] hover:bg-[#0d9488] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={12} />
              Apply to Field
            </button>
          </div>
        </div>
      )}

      {/* INPUT AREA */}
      {!response?.isValid && (
        <div className="space-y-3">
          {/* User Guidance Message */}
          <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-xs text-blue-300 leading-relaxed">
              <strong>💡 Tip:</strong> If you provided comprehensive context earlier, you can leave this empty and the AI will use that information. 
              Or add specific details for this section only.
            </p>
          </div>
          
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              section === 'experience' 
              ? "Describe what you did (e.g., 'Managed a team of 5 devs...')" 
              : `Add specific details for ${section} or leave empty to use your saved context...`
            }
            className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#14B8A6] focus:outline-none resize-none h-20 placeholder:text-slate-600"
          />
          <button
            onClick={handleAskAI}
            disabled={isThinking}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white border border-white/10 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            {isThinking ? (
              <>
                <Loader2 size={12} className="animate-spin text-[#14B8A6]" />
                Thinking...
              </>
            ) : (
              <>
                <Sparkles size={12} />
                {query ? "Generate with New Instructions" : "Auto-Generate from Saved Context"}
              </>
            )}
          </button>
        </div>
      )}
      
      {/* RETRY BUTTON (Only show if valid response exists) */}
      {response?.isValid && (
        <button
          onClick={() => { setResponse(null); setQuery(""); }}
          className="w-full mt-2 py-2 text-slate-500 hover:text-slate-300 text-xs transition-colors"
        >
          Try a different approach
        </button>
      )}
    </div>
  );
};
// MAIN COMPONENT
export default function BuilderPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = Number(params.id);
  const templateConfig = getDefaultConfig(templateId);

  const [currentStep, setCurrentStep] = useState(0);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aiContext, setAiContext] = useState<string | null>(null);

  // Form data states
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
      github: "",
      photo: "",
    },
    summary: { text: "" },
    experience: [{
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    }],
    education: [{
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
      honors: "",
    }],
    skills: {
      technical: [""],
      soft: [""],
      languages: [""],
      tools: [""],
    },
    projects: [{
      title: "",
      description: "",
      technologies: [""],
      link: "",
      startDate: "",
      endDate: "",
    }],
    certifications: [{
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      link: "",
    }],
  });

  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const searchParams = useParams();
  
  // Check for download action in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('action') === 'download') {
        // Wait a bit for data to load then trigger download
        setTimeout(() => {
          handleExportPDF();
          // Clean up URL
          window.history.replaceState({}, '', window.location.pathname);
        }, 1500);
      }
    }
  }, [isLoading]); // Run when loading finishes
  useEffect(() => {
    const isAiSession = localStorage.getItem('talentSmith_isAiSession');
    const userContext = localStorage.getItem('talentSmith_userContext');
    
    if (isAiSession === 'true' && userContext) {
      setAiContext(userContext);
    }
  }, []);

  // 3. SAVE FORM DATA TO LOCALSTORAGE WHENEVER IT CHANGES
  useEffect(() => {
    if (resumeId) {
      const accumulatedContext = buildAccumulatedContext();
      localStorage.setItem(`resume_formData_${templateId}`, JSON.stringify(formData));
      localStorage.setItem(`resume_aiContext_${templateId}`, accumulatedContext);
      // Update the AI context with accumulated data
      setAiContext(accumulatedContext);
    }
  }, [formData, resumeId, templateId]);

  // 4. BUILD ACCUMULATED CONTEXT FROM ALL FILLED SECTIONS
  const buildAccumulatedContext = () => {
    const parts: string[] = [];
    
    // Get initial context if exists
    const initialContext = localStorage.getItem('talentSmith_userContext');
    if (initialContext) {
      parts.push(initialContext);
    }
    
    // Add personal info
    if (formData.personalInfo.fullName) {
      parts.push(`Name: ${formData.personalInfo.fullName}`);
      if (formData.personalInfo.email) parts.push(`Email: ${formData.personalInfo.email}`);
      if (formData.personalInfo.phone) parts.push(`Phone: ${formData.personalInfo.phone}`);
      if (formData.personalInfo.location) parts.push(`Location: ${formData.personalInfo.location}`);
    }
    
    // Add summary
    if (formData.summary.text) {
      parts.push(`Professional Summary: ${formData.summary.text}`);
    }
    
    // Add experience
    if (formData.experience.length > 0 && formData.experience[0].jobTitle) {
      const expList = formData.experience.map(exp => 
        `${exp.jobTitle} at ${exp.company}: ${exp.description}`
      ).join('; ');
      parts.push(`Work Experience: ${expList}`);
    }
    
    // Add education
    if (formData.education.length > 0 && formData.education[0].degree) {
      const eduList = formData.education.map(edu => 
        `${edu.degree} from ${edu.institution}`
      ).join('; ');
      parts.push(`Education: ${eduList}`);
    }
    
    // Add skills
    const allSkills = [
      ...formData.skills.technical.filter(s => s),
      ...formData.skills.soft.filter(s => s),
      ...formData.skills.tools.filter(s => s)
    ];
    if (allSkills.length > 0) {
      parts.push(`Skills: ${allSkills.join(', ')}`);
    }
    
    return parts.join('\n\n');
  };

  // 3. ADD HANDLE APPLY FUNCTION
  const handleAIApply = (data: AIResponse | string) => {
    const currentSectionKey = SECTIONS[currentStep].key;

    // Handle structured data for personalInfo (validate & coerce to strings)
    if (currentSectionKey === 'personalInfo' && typeof data !== 'string' && data.structuredData) {
      const sd = data.structuredData as Record<string, unknown>;
      setFormData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          fullName: typeof sd.fullName === 'string' ? sd.fullName : prev.personalInfo.fullName,
          email: typeof sd.email === 'string' ? sd.email : prev.personalInfo.email,
          phone: typeof sd.phone === 'string' ? sd.phone : prev.personalInfo.phone,
          location: typeof sd.location === 'string' ? sd.location : prev.personalInfo.location,
          linkedin: typeof sd.linkedin === 'string' ? sd.linkedin : prev.personalInfo.linkedin,
          portfolio: typeof sd.portfolio === 'string' ? sd.portfolio : prev.personalInfo.portfolio,
        }
      }));
      return;
    }

    // Handle text suggestion for other sections
    const text = typeof data === 'string' ? data : data.suggestion;
    if (!text) return;

    // Clean text (remove quotes if AI added them inappropriately)
    const cleanText = text.replace(/^"|"$/g, '');

    if (currentSectionKey === 'summary') {
      setFormData(prev => ({ ...prev, summary: { text: cleanText } }));
    } 
    else if (currentSectionKey === 'experience') {
      // Apply to the most recent (last) experience entry description
      setFormData(prev => {
        const newExp = [...prev.experience];
        if (newExp.length > 0) {
          newExp[newExp.length - 1].description = cleanText;
        }
        return { ...prev, experience: newExp };
      });
    }
  };

  // Merge form data with USER_DATA for preview
  const getPreviewData = () => {
    const merged = { ...USER_DATA };
    
    // Update with form data if filled
    if (formData.personalInfo.fullName) merged.name = formData.personalInfo.fullName;
    if (formData.personalInfo.email) merged.email = formData.personalInfo.email;
    if (formData.personalInfo.phone) merged.phone = formData.personalInfo.phone;
    if (formData.personalInfo.location) merged.address = formData.personalInfo.location;
    if (formData.personalInfo.linkedin) merged.linkedin = formData.personalInfo.linkedin;
    if (formData.personalInfo.portfolio) merged.website = formData.personalInfo.portfolio;
    if (formData.personalInfo.photo) merged.photo = formData.personalInfo.photo;
    if (formData.summary.text) merged.summary = formData.summary.text;
    
    // Map experience
    if (formData.experience.length > 0 && formData.experience[0].jobTitle) {
      merged.experience = formData.experience.map(exp => ({
        company: exp.company,
        role: exp.jobTitle,
        date: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
        desc: exp.description
      }));
    }
    
    // Map education
    if (formData.education.length > 0 && formData.education[0].degree) {
      merged.education = formData.education.map(edu => ({
        school: edu.institution,
        degree: edu.degree,
        date: edu.graduationDate
      }));
    }

    // Map projects
    if (formData.projects.length > 0 && formData.projects[0].title) {
      merged.projects = formData.projects.map(proj => ({
        title: proj.title,
        description: proj.description,
        technologies: proj.technologies || [],
        link: proj.link,
        startDate: proj.startDate,
        endDate: proj.endDate
      }));
    }

    // Map certifications
    if (formData.certifications.length > 0 && formData.certifications[0].name) {
      merged.certifications = formData.certifications.map(cert => ({
        name: cert.name,
        issuer: cert.issuer,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate,
        credentialId: cert.credentialId,
        link: cert.link
      }));
    }
    
    // Map skills
    const allSkills = [
      ...formData.skills.technical.filter(s => s),
      ...formData.skills.soft.filter(s => s),
      ...formData.skills.tools.filter(s => s)
    ];
    if (allSkills.length > 0) {
      merged.skills = allSkills;
    }
    
    return merged;
  };

  // Initialize resume
  useEffect(() => {
    const initializeResume = async () => {
      setIsLoading(true);
      try {
        const storedResumeId = localStorage.getItem(`resume_${templateId}`);

        if (storedResumeId) {
          try {
            const response = await fetch(`/api/resume?id=${storedResumeId}`);
            const result = await response.json();

            if (result.success) {
              loadResumeData(result.data);
              setResumeId(storedResumeId);
              setIsLoading(false);
              return;
            }
          } catch {
            console.log("Could not load existing resume, creating new one");
          }
        }

        await createNewResume();
      } catch (error) {
        console.error("Error initializing resume:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeResume();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  const createNewResume = async () => {
    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });

      const result = await response.json();

      if (result.success) {
        setResumeId(result.data._id);
        localStorage.setItem(`resume_${templateId}`, result.data._id);
      }
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  // Typed shape for resume data received from the API
  type ResumeData = {
    _id?: string;
    personalInfo?: {
      fullName?: string;
      email?: string;
      phone?: string;
      location?: string;
      linkedin?: string;
      portfolio?: string;
      github?: string;
      photo?: string;
    };
    summary?: {
      text?: string;
    };
    experience?: Array<{
      jobTitle?: string;
      company?: string;
      location?: string;
      startDate?: string;
      endDate?: string;
      current?: boolean;
      description?: string;
      achievements?: string[];
    }>;
    education?: Array<{
      degree?: string;
      institution?: string;
      location?: string;
      graduationDate?: string;
      gpa?: string;
      honors?: string;
    }>;
    skills?: {
      technical?: string[];
      soft?: string[];
      languages?: string[];
      tools?: string[];
    };
    projects?: Array<{
      title?: string;
      description?: string;
      technologies?: string[];
      link?: string;
      startDate?: string;
      endDate?: string;
    }>;
    certifications?: Array<{
      name?: string;
      issuer?: string;
      issueDate?: string;
      expiryDate?: string;
      credentialId?: string;
      link?: string;
    }>;
    completedSections?: string[];
    currentSection?: number;
  };

  const loadResumeData = (data: ResumeData) => {
    setFormData(prev => ({
      ...prev,
      ...(data.personalInfo && { personalInfo: { ...prev.personalInfo, ...data.personalInfo } }),
      ...(data.summary && { summary: { ...prev.summary, ...data.summary } }),
      ...(data.experience?.length && { experience: data.experience.map(exp => ({
        jobTitle: exp.jobTitle ?? "",
        company: exp.company ?? "",
        location: exp.location ?? "",
        startDate: exp.startDate ?? "",
        endDate: exp.endDate ?? "",
        current: exp.current ?? false,
        description: exp.description ?? "",
        achievements: exp.achievements && exp.achievements.length ? exp.achievements : [""],
      })) }),
      ...(data.education?.length && { education: data.education.map(edu => ({
        degree: edu.degree ?? "",
        institution: edu.institution ?? "",
        location: edu.location ?? "",
        graduationDate: edu.graduationDate ?? "",
        gpa: edu.gpa ?? "",
        honors: edu.honors ?? "",
      })) }),
      ...(data.skills && { skills: {
        technical: data.skills.technical && data.skills.technical.length ? data.skills.technical : [""],
        soft: data.skills.soft && data.skills.soft.length ? data.skills.soft : [""],
        languages: data.skills.languages && data.skills.languages.length ? data.skills.languages : [""],
        tools: data.skills.tools && data.skills.tools.length ? data.skills.tools : [""],
      } }),
      ...(data.projects?.length && { projects: data.projects.map(p => ({
        title: p.title ?? "",
        description: p.description ?? "",
        technologies: p.technologies && p.technologies.length ? p.technologies : [""],
        link: p.link ?? "",
        startDate: p.startDate ?? "",
        endDate: p.endDate ?? "",
      })) }),
      ...(data.certifications?.length && { certifications: data.certifications.map(c => ({
        name: c.name ?? "",
        issuer: c.issuer ?? "",
        issueDate: c.issueDate ?? "",
        expiryDate: c.expiryDate ?? "",
        credentialId: c.credentialId ?? "",
        link: c.link ?? "",
      })) }),
    }));
    if (data.completedSections) setCompletedSections(data.completedSections);
    if (data.currentSection !== undefined) setCurrentStep(data.currentSection);
  };

  const saveSection = async () => {
    if (!resumeId) return;

    setIsSaving(true);
    try {
      const currentSection = SECTIONS[currentStep];
      let sectionData;

      switch (currentSection.key) {
        case "personalInfo": sectionData = formData.personalInfo; break;
        case "summary": sectionData = formData.summary; break;
        case "experience": sectionData = formData.experience; break;
        case "education": sectionData = formData.education; break;
        case "skills": sectionData = formData.skills; break;
        case "projects": sectionData = formData.projects; break;
        case "certifications": sectionData = formData.certifications; break;
      }

      const updatedCompleted = [...new Set([...completedSections, currentSection.key])];

      const response = await fetch("/api/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeId,
          sectionName: currentSection.key,
          sectionData,
          currentSection: currentStep,
          completedSections: updatedCompleted,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setCompletedSections(updatedCompleted);
        return true;
      }
    } catch (error) {
      console.error("Error saving section:", error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = async () => {
    const saved = await saveSection();
    if (saved !== false && currentStep < SECTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
      // The AI query will be cleared automatically by the AIAssistant component key change
    } else if (saved !== false && currentStep === SECTIONS.length - 1) {
      // Navigate to ATS check page
      router.push(`/builder/${templateId}/ats`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAndExit = async () => {
    await saveSection();
    router.push("/templates");
  };

  const saveAllData = async () => {
    if (!resumeId) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeId,
          formData,
          completedSections,
          currentSection: currentStep,
        }),
      });

      const result = await response.json();
      if (result.success) {
         console.log("All data saved successfully");
         return true;
      }
    } catch (error) {
      console.error("Error saving all data:", error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

const forceRGB = (value: string): string => {
  if (!value) return value;

  if (
    value.startsWith('rgb') ||
    value.startsWith('#') ||
    value === 'transparent'
  ) {
    return value;
  }

  const temp = document.createElement('div');
  temp.style.color = value;
  document.body.appendChild(temp);
  const rgb = getComputedStyle(temp).color;
  document.body.removeChild(temp);

  return rgb;
};

const handleExportPDF = async () => {
  // Save all data before exporting
  await saveAllData();

  console.log('🚀 Starting PDF export...');
  
  const element = document.getElementById('resume-preview');
  if (!element) {
    console.error('❌ Element not found');
    alert('Resume preview not found');
    return;
  }
  
  console.log('✅ Element found');

  try {
    console.log('📦 Loading dependencies...');
    const { default: jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;
    console.log('✅ Dependencies loaded');

    // Preload fonts BEFORE creating iframe
    console.log('🔤 Preloading fonts...');
    await document.fonts.ready;
    console.log('✅ Main document fonts loaded');

    console.log('🖼️ Creating iframe...');
    const iframe = document.createElement('iframe');
    iframe.style.cssText =
      'position:fixed;left:-9999px;top:0;width:210mm;height:297mm;border:none;';
    document.body.appendChild(iframe);
    await new Promise((r) => requestAnimationFrame(r));
    console.log('✅ Iframe created');

    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) throw new Error('Iframe document not available');

    console.log('📝 Collecting stylesheets...');
    let allStyles = '';
    
    // Get inline styles
    document.querySelectorAll('style').forEach(style => {
      allStyles += style.textContent || '';
    });
    
    // Get all linked stylesheets
    const styleSheets = Array.from(document.styleSheets);
    for (const sheet of styleSheets) {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          allStyles += rule.cssText + '\n';
        });
      } catch (e) {
        console.warn('Could not access stylesheet:', e);
      }
    }
    
    // Get font-face rules specifically
    let fontFaces = '';
    for (const sheet of styleSheets) {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          if (rule instanceof CSSFontFaceRule) {
            fontFaces += rule.cssText + '\n';
          }
        });
      } catch (e) {
        // Ignore CORS errors
      }
    }
    
    console.log('✅ Styles collected');

    console.log('📝 Writing iframe content...');
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">
          <style>
            ${fontFaces}
            
            * { 
              box-sizing: border-box; 
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            body { 
              margin: 0; 
              padding: 0;
              background: #fff;
              width: 210mm;
              font-family: 'Lato', sans-serif;
            }
            
            ${allStyles}
          </style>
        </head>
        <body></body>
      </html>
    `);
    iframeDoc.close();
    console.log('✅ Iframe content written with styles');

    console.log('🔄 Cloning element...');
    const clone = element.cloneNode(true) as HTMLElement;
    clone.removeAttribute('id');
    clone.style.width = '210mm';
    clone.style.minHeight = '297mm';
    clone.style.margin = '0';
    clone.style.padding = '0';
    console.log('✅ Element cloned');

    console.log('📌 Appending to iframe...');
    iframeDoc.body.appendChild(clone);

    console.log('⏳ Waiting for iframe fonts to load...');
    
    // Wait for iframe fonts
    if (iframeDoc.fonts?.ready) {
      await iframeDoc.fonts.ready;
    }
    
    // Additional wait for font rendering
    await new Promise((r) => setTimeout(r, 1000));
    
    // Force reflow
    clone.style.display = 'none';
    clone.offsetHeight; // Trigger reflow
    clone.style.display = 'block';
    
    await new Promise((r) => setTimeout(r, 500));
    
    console.log('✅ Fonts rendered');

    console.log('📸 Capturing canvas...');
    const canvas = await html2canvas(clone, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      allowTaint: true,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
      foreignObjectRendering: false, // Disable this - can cause font issues
      onclone: (clonedDoc, clonedElement) => {
        console.log('🔍 Inside onclone callback');
        // Ensure fonts are set
        clonedElement.style.fontFamily = "'Lato', sans-serif";
        
        // Force all text elements to use the font
        const allTextElements = clonedElement.querySelectorAll('*');
        allTextElements.forEach((el: Element) => {
          const htmlEl = el as HTMLElement;
          if (!htmlEl.style.fontFamily) {
            htmlEl.style.fontFamily = "'Lato', sans-serif";
          }
        });
      }
    });
    console.log('✅ Canvas captured:', canvas.width, 'x', canvas.height);

    console.log('🧹 Cleaning up iframe...');
    document.body.removeChild(iframe);

    console.log('📄 Generating PDF...');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');

    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let y = 0;
    let remaining = imgHeight;
    let pageCount = 0;

    while (remaining > 0) {
      pdf.addImage(imgData, 'PNG', 0, y, pdfWidth, imgHeight);
      remaining -= pdfHeight;
      y -= pdfHeight;
      pageCount++;
      if (remaining > 0) pdf.addPage();
    }
    
    console.log(`✅ PDF generated with ${pageCount} page(s)`);

    const fileName = `resume_${formData.personalInfo.fullName || 'download'}.pdf`;
    console.log('💾 Saving:', fileName);
    pdf.save(fileName);
    
    console.log('🎉 PDF export complete!');
  } catch (err) {
    console.error('❌ PDF export failed:', err);
    alert(`PDF export failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
};


  // Form Renderers (simplified for brevity)
  const renderCurrentSection = () => {
    const section = SECTIONS[currentStep];

    if (section.key === "personalInfo") {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Profile Photo</label>
              <div className="flex items-center gap-4">
                {formData.personalInfo.photo && (
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-700 border border-white/10">
                    <img src={formData.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                )}
                <label className="cursor-pointer px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm">
                  <User size={16} />
                  {formData.personalInfo.photo ? "Change Photo" : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, photo: reader.result as string }
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                {formData.personalInfo.photo && (
                   <button 
                      onClick={() => setFormData({...formData, personalInfo: {...formData.personalInfo, photo: ""}})}
                      className="text-red-400 hover:text-red-300 text-sm"
                   >
                      Remove
                   </button>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.personalInfo.fullName}
                onChange={(e) => setFormData({...formData, personalInfo: {...formData.personalInfo, fullName: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
              <input
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => setFormData({...formData, personalInfo: {...formData.personalInfo, email: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.personalInfo.phone}
                onChange={(e) => setFormData({...formData, personalInfo: {...formData.personalInfo, phone: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
              <input
                type="text"
                value={formData.personalInfo.location}
                onChange={(e) => setFormData({...formData, personalInfo: {...formData.personalInfo, location: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                placeholder="New York, NY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn</label>
              <input
                type="url"
                value={formData.personalInfo.linkedin}
                onChange={(e) => setFormData({...formData, personalInfo: {...formData.personalInfo, linkedin: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Portfolio</label>
              <input
                type="url"
                value={formData.personalInfo.portfolio}
                onChange={(e) => setFormData({...formData, personalInfo: {...formData.personalInfo, portfolio: e.target.value}})}
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                placeholder="www.johndoe.com"
              />
            </div>
          </div>
        </div>
      );
    }

    if (section.key === "summary") {
      return (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300 mb-2">Professional Summary</label>
          <textarea
            value={formData.summary.text}
            onChange={(e) => setFormData({...formData, summary: {text: e.target.value}})}
            rows={8}
            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9] resize-none"
            placeholder="Write a compelling summary..."
          />
        </div>
      );
    }

    if (section.key === "experience") {
      return (
        <div className="space-y-6">
          {formData.experience.map((exp, index) => (
            <div key={index} className="p-6 bg-slate-800/30 border border-white/10 rounded-xl space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">Experience #{index + 1}</h4>
                {formData.experience.length > 1 && (
                  <button
                    onClick={() => setFormData({...formData, experience: formData.experience.filter((_, i) => i !== index)})}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => {
                      const newExp = formData.experience.map((item, i) => 
                        i === index ? { ...item, jobTitle: e.target.value } : item
                      );
                      setFormData({...formData, experience: newExp});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company *</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = formData.experience.map((item, i) => 
                        i === index ? { ...item, company: e.target.value } : item
                      );
                      setFormData({...formData, experience: newExp});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="Tech Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => {
                      const newExp = formData.experience.map((item, i) => 
                        i === index ? { ...item, location: e.target.value } : item
                      );
                      setFormData({...formData, experience: newExp});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Start Date *</label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => {
                      const newExp = formData.experience.map((item, i) => 
                        i === index ? { ...item, startDate: e.target.value } : item
                      );
                      setFormData({...formData, experience: newExp});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9] [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => {
                      const newExp = formData.experience.map((item, i) => 
                        i === index ? { ...item, endDate: e.target.value } : item
                      );
                      setFormData({...formData, experience: newExp});
                    }}
                    disabled={exp.current}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9] disabled:opacity-50 [color-scheme:dark]"
                  />
                </div>
                <div className="flex items-center pt-8">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={exp.current}
                    onChange={(e) => {
                      const newExp = formData.experience.map((item, i) => 
                        i === index ? { ...item, current: e.target.checked, endDate: e.target.checked ? "" : item.endDate } : item
                      );
                      setFormData({...formData, experience: newExp});
                    }}
                    className="w-4 h-4 text-[#0EA5E9] bg-slate-800 border-white/10 rounded focus:ring-[#0EA5E9]"
                  />
                  <label htmlFor={`current-${index}`} className="ml-2 text-sm text-slate-300">
                    Currently working here
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => {
                    const newExp = formData.experience.map((item, i) => 
                      i === index ? { ...item, description: e.target.value } : item
                    );
                    setFormData({...formData, experience: newExp});
                  }}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9] resize-none"
                  placeholder="Describe your role and responsibilities..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Key Achievements</label>
                {exp.achievements?.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => {
                        const newExp = formData.experience.map((item, i) => {
                          if (i === index) {
                            const newAchievements = [...(item.achievements || [])];
                            newAchievements[achIndex] = e.target.value;
                            return { ...item, achievements: newAchievements };
                          }
                          return item;
                        });
                        setFormData({...formData, experience: newExp});
                      }}
                      className="flex-1 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                      placeholder="Achievement or impact..."
                    />
                    {exp.achievements && exp.achievements.length > 1 && (
                      <button
                        onClick={() => {
                          const newExp = formData.experience.map((item, i) => {
                            if (i === index) {
                              return { ...item, achievements: item.achievements?.filter((_, aIndex) => aIndex !== achIndex) };
                            }
                            return item;
                          });
                          setFormData({...formData, experience: newExp});
                        }}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newExp = formData.experience.map((item, i) => {
                      if (i === index) {
                        return { ...item, achievements: [...(item.achievements || []), ""] };
                      }
                      return item;
                    });
                    setFormData({...formData, experience: newExp});
                  }}
                  className="mt-2 text-sm text-[#0EA5E9] hover:text-[#0284c7] flex items-center gap-1"
                >
                  <Plus size={16} /> Add Achievement
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => setFormData({
              ...formData,
              experience: [...formData.experience, {
                jobTitle: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                description: "",
                achievements: [""],
              }]
            })}
            className="w-full py-3 border-2 border-dashed border-white/20 rounded-lg text-slate-400 hover:text-white hover:border-[#0EA5E9] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add Another Experience
          </button>
        </div>
      );
    }

    if (section.key === "education") {
      return (
        <div className="space-y-6">
          {formData.education.map((edu, index) => (
            <div key={index} className="p-6 bg-slate-800/30 border border-white/10 rounded-xl space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">Education #{index + 1}</h4>
                {formData.education.length > 1 && (
                  <button
                    onClick={() => setFormData({...formData, education: formData.education.filter((_, i) => i !== index)})}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Degree *</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = formData.education.map((item, i) => 
                        i === index ? { ...item, degree: e.target.value } : item
                      );
                      setFormData({...formData, education: newEdu});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Institution *</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => {
                      const newEdu = formData.education.map((item, i) => 
                        i === index ? { ...item, institution: e.target.value } : item
                      );
                      setFormData({...formData, education: newEdu});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => {
                      const newEdu = formData.education.map((item, i) => 
                        i === index ? { ...item, location: e.target.value } : item
                      );
                      setFormData({...formData, education: newEdu});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="Boston, MA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Graduation Date</label>
                  <input
                    type="month"
                    value={edu.graduationDate}
                    onChange={(e) => {
                      const newEdu = formData.education.map((item, i) => 
                        i === index ? { ...item, graduationDate: e.target.value } : item
                      );
                      setFormData({...formData, education: newEdu});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9] [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">GPA</label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => {
                      const newEdu = formData.education.map((item, i) => 
                        i === index ? { ...item, gpa: e.target.value } : item
                      );
                      setFormData({...formData, education: newEdu});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="3.8/4.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Honors/Awards</label>
                  <input
                    type="text"
                    value={edu.honors}
                    onChange={(e) => {
                      const newEdu = formData.education.map((item, i) => 
                        i === index ? { ...item, honors: e.target.value } : item
                      );
                      setFormData({...formData, education: newEdu});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="Summa Cum Laude"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setFormData({
              ...formData,
              education: [...formData.education, {
                degree: "",
                institution: "",
                location: "",
                graduationDate: "",
                gpa: "",
                honors: "",
              }]
            })}
            className="w-full py-3 border-2 border-dashed border-white/20 rounded-lg text-slate-400 hover:text-white hover:border-[#0EA5E9] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add Another Education
          </button>
        </div>
      );
    }

    if (section.key === "skills") {
      return (
        <div className="space-y-6">
          {["technical", "soft", "languages", "tools"].map((skillType) => (
            <div key={skillType}>
              <label className="block text-sm font-medium text-slate-300 mb-3 capitalize">
                {skillType} Skills
              </label>
              {formData.skills[skillType as keyof typeof formData.skills]?.map((skill: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const newSkills = { ...formData.skills };
                      const currentSkills = [...newSkills[skillType as keyof typeof formData.skills]];
                      currentSkills[index] = e.target.value;
                      newSkills[skillType as keyof typeof formData.skills] = currentSkills;
                      setFormData({...formData, skills: newSkills});
                    }}
                    className="flex-1 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder={`e.g., ${skillType === "technical" ? "JavaScript, Python" : skillType === "soft" ? "Leadership, Communication" : skillType === "languages" ? "English (Native)" : "Git, Docker"}`}
                  />
                  {formData.skills[skillType as keyof typeof formData.skills].length > 1 && (
                    <button
                      onClick={() => {
                        const newSkills = { ...formData.skills };
                        newSkills[skillType as keyof typeof formData.skills] = newSkills[skillType as keyof typeof formData.skills].filter((_, i) => i !== index);
                        setFormData({...formData, skills: newSkills});
                      }}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  const newSkills = { ...formData.skills };
                  newSkills[skillType as keyof typeof formData.skills] = [...newSkills[skillType as keyof typeof formData.skills], ""];
                  setFormData({...formData, skills: newSkills});
                }}
                className="mt-2 text-sm text-[#0EA5E9] hover:text-[#0284c7] flex items-center gap-1"
              >
                <Plus size={16} /> Add Skill
              </button>
            </div>
          ))}
        </div>
      );
    }

    if (section.key === "projects") {
      return (
        <div className="space-y-6">
          {formData.projects.map((project, index) => (
            <div key={index} className="p-6 bg-slate-800/30 border border-white/10 rounded-xl space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">Project #{index + 1}</h4>
                {formData.projects.length > 1 && (
                  <button
                    onClick={() => setFormData({...formData, projects: formData.projects.filter((_, i) => i !== index)})}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Project Title *</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => {
                      const newProjects = formData.projects.map((p, i) => 
                        i === index ? { ...p, title: e.target.value } : p
                      );
                      setFormData({...formData, projects: newProjects});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="E-commerce Platform"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = formData.projects.map((p, i) => 
                        i === index ? { ...p, description: e.target.value } : p
                      );
                      setFormData({...formData, projects: newProjects});
                    }}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9] resize-none"
                    placeholder="Brief description of the project..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Technologies Used</label>
                  {project.technologies?.map((tech, techIndex) => (
                    <div key={techIndex} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => {
                          const newProjects = formData.projects.map((p, i) => {
                            if (i === index) {
                              const newTechs = [...(p.technologies || [])];
                              newTechs[techIndex] = e.target.value;
                              return { ...p, technologies: newTechs };
                            }
                            return p;
                          });
                          setFormData({...formData, projects: newProjects});
                        }}
                        className="flex-1 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                        placeholder="Technology name"
                      />
                      {project.technologies && project.technologies.length > 1 && (
                        <button
                          onClick={() => {
                            const newProjects = formData.projects.map((p, i) => {
                              if (i === index) {
                                return { ...p, technologies: p.technologies?.filter((_, tIndex) => tIndex !== techIndex) };
                              }
                              return p;
                            });
                            setFormData({...formData, projects: newProjects});
                          }}
                          className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newProjects = formData.projects.map((p, i) => {
                        if (i === index) {
                          return { ...p, technologies: [...(p.technologies || []), ""] };
                        }
                        return p;
                      });
                      setFormData({...formData, projects: newProjects});
                    }}
                    className="mt-2 text-sm text-[#0EA5E9] hover:text-[#0284c7] flex items-center gap-1"
                  >
                    <Plus size={16} /> Add Technology
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Project Link</label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => {
                        const newProjects = formData.projects.map((p, i) => 
                          i === index ? { ...p, link: e.target.value } : p
                        );
                        setFormData({...formData, projects: newProjects});
                      }}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
                    <input
                      type="month"
                      value={project.startDate}
                      onChange={(e) => {
                        const newProjects = formData.projects.map((p, i) => 
                          i === index ? { ...p, startDate: e.target.value } : p
                        );
                        setFormData({...formData, projects: newProjects});
                      }}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9] [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                    <input
                      type="month"
                      value={project.endDate}
                      onChange={(e) => {
                        const newProjects = formData.projects.map((p, i) => 
                          i === index ? { ...p, endDate: e.target.value } : p
                        );
                        setFormData({...formData, projects: newProjects});
                      }}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9] [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setFormData({
              ...formData,
              projects: [...formData.projects, {
                title: "",
                description: "",
                technologies: [""],
                link: "",
                startDate: "",
                endDate: "",
              }]
            })}
            className="w-full py-3 border-2 border-dashed border-white/20 rounded-lg text-slate-400 hover:text-white hover:border-[#0EA5E9] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add Another Project
          </button>
        </div>
      );
    }

    if (section.key === "certifications") {
      return (
        <div className="space-y-6">
          {formData.certifications.map((cert, index) => (
            <div key={index} className="p-6 bg-slate-800/30 border border-white/10 rounded-xl space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">Certification #{index + 1}</h4>
                {formData.certifications.length > 1 && (
                  <button
                    onClick={() => setFormData({...formData, certifications: formData.certifications.filter((_, i) => i !== index)})}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Certification Name *</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => {
                      const newCerts = formData.certifications.map((c, i) => 
                        i === index ? { ...c, name: e.target.value } : c
                      );
                      setFormData({...formData, certifications: newCerts});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Issuing Organization</label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => {
                      const newCerts = formData.certifications.map((c, i) => 
                        i === index ? { ...c, issuer: e.target.value } : c
                      );
                      setFormData({...formData, certifications: newCerts});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Issue Date</label>
                  <input
                    type="month"
                    value={cert.issueDate}
                    onChange={(e) => {
                      const newCerts = formData.certifications.map((c, i) => 
                        i === index ? { ...c, issueDate: e.target.value } : c
                      );
                      setFormData({...formData, certifications: newCerts});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9] [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Expiry Date (Optional)</label>
                  <input
                    type="month"
                    value={cert.expiryDate}
                    onChange={(e) => {
                      const newCerts = formData.certifications.map((c, i) => 
                        i === index ? { ...c, expiryDate: e.target.value } : c
                      );
                      setFormData({...formData, certifications: newCerts});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9] [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Credential ID</label>
                  <input
                    type="text"
                    value={cert.credentialId}
                    onChange={(e) => {
                      const newCerts = formData.certifications.map((c, i) => 
                        i === index ? { ...c, credentialId: e.target.value } : c
                      );
                      setFormData({...formData, certifications: newCerts});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="ABC123XYZ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Credential URL</label>
                  <input
                    type="url"
                    value={cert.link}
                    onChange={(e) => {
                      const newCerts = formData.certifications.map((c, i) => 
                        i === index ? { ...c, link: e.target.value } : c
                      );
                      setFormData({...formData, certifications: newCerts});
                    }}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#0EA5E9]"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setFormData({
              ...formData,
              certifications: [...formData.certifications, {
                name: "",
                issuer: "",
                issueDate: "",
                expiryDate: "",
                credentialId: "",
                link: "",
              }]
            })}
            className="w-full py-3 border-2 border-dashed border-white/20 rounded-lg text-slate-400 hover:text-white hover:border-[#0EA5E9] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add Another Certification
          </button>
        </div>
      );
    }

    return <div className="text-white">Section {section.label} form content here</div>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#0EA5E9] animate-spin" />
          <p className="text-slate-400">Loading your resume builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0F172A] text-slate-300 flex flex-col">
      <FontLoader config={templateConfig} />

      {/* Header */}
      <div className="border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/templates" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{templateConfig.name}</h1>
              <p className="text-sm text-slate-400">Resume Builder</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExportPDF}
              className="px-4 py-2 bg-[#0EA5E9] text-white rounded-lg text-sm font-bold hover:bg-[#0284c7] transition-colors flex items-center gap-2"
            >
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-white/10 bg-[#0F172A]/60 backdrop-blur-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-3">
            {SECTIONS.map((section, index) => {
              const Icon = section.icon;
              const isCompleted = completedSections.includes(section.key);
              const isCurrent = index === currentStep;

              return (
                <div key={section.key} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-[#0EA5E9] text-white"
                        : isCurrent
                        ? "bg-[#0EA5E9]/20 text-[#0EA5E9] border-2 border-[#0EA5E9]"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                  </div>
                  <span className="text-[10px] text-center hidden lg:block max-w-[80px]">{section.label}</span>
                </div>
              );
            })}
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0EA5E9] to-[#14B8A6] transition-all duration-500"
              style={{ width: `${((currentStep + 1) / SECTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        {/* LEFT SIDE - FORM */}
        <div className="w-full lg:w-1/2 lg:overflow-y-auto p-6 bg-[#0F172A] shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3 mb-2">
                {(() => {
                  const Icon = SECTIONS[currentStep].icon;
                  return <Icon className="w-7 h-7 text-[#0EA5E9]" />;
                })()}
                <h2 className="text-2xl font-bold text-white">{SECTIONS[currentStep].label}</h2>
              </div>
              <p className="text-sm text-slate-400">Step {currentStep + 1} of {SECTIONS.length}</p>
            </div>
                {/* --- INJECTED AI COMPONENT HERE --- */}
                {aiContext && (
                  <AIAssistant 
                   context={aiContext} 
                    section={SECTIONS[currentStep].key} 
                     onApply={handleAIApply}
                      />
                  )}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="mb-6"
              >
                {renderCurrentSection()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center pt-6 border-t border-white/10 sticky bottom-0 bg-[#0F172A] pb-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-5 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white hover:bg-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <ArrowLeft size={16} />
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={isSaving}
                className="px-5 py-2.5 bg-gradient-to-r from-[#0EA5E9] to-[#14B8A6] rounded-lg text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Saving...
                  </>
                ) : currentStep === SECTIONS.length - 1 ? (
                  <>
                    <CheckCircle2 size={16} />
                    Complete
                  </>
                ) : (
                  <>
                    Next Section
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - RESUME PREVIEW */}
        <div className="w-full lg:w-1/2 bg-[#0b1120] border-t lg:border-t-0 lg:border-l border-white/10 lg:overflow-y-auto overflow-x-hidden p-8 shrink-0">
            
            {/* A4 Container - centered properly */}
            <div className="flex justify-center items-start min-h-full px-12">
              <div className="origin-top transform scale-[0.60] md:scale-[0.70] lg:scale-[0.78] xl:scale-[0.85] transition-all duration-300 ease-out">
                <div 
                  id="resume-preview"
                  className="w-[170mm] min-h-[297mm] bg-white text-black shadow-2xl overflow-hidden relative"
                  style={{ fontFamily: templateConfig.styles.fontFamilyBody }}
                >
                  {renderLayout(templateConfig, getPreviewData())}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
