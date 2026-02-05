"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { 
  ArrowLeft, Save, User, Briefcase, 
  Layers, FolderGit2, FileText, Mail, 
  MapPin, Globe, Award, Sparkles, Layout,
  UploadCloud, ImageIcon, Loader2, X, Plus,
  Code, Palette, Smartphone, Database, Server, 
  Megaphone, BarChart, Shield, Zap, Cpu, PenTool,
  Brain, ShoppingCart, Camera, Cloud, Search, CheckCircle2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Service Icons Palette
const SERVICE_ICONS: Record<string, LucideIcon> = {
    "code": Code,
    "palette": Palette,
    "smartphone": Smartphone,
    "globe": Globe,
    "database": Database,
    "server": Server,
    "megaphone": Megaphone,
    "chart": BarChart,
    "shield": Shield,
    "zap": Zap,
    "cpu": Cpu,
    "pen": PenTool,
    "layers": Layers,
    "brain": Brain,
    "cart": ShoppingCart
};

// Common tech stack icons map for auto-detection
const TECH_ICONS: Record<string, string> = {
  // Frontend
  "react": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "vue": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "angular": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  "svelte": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  "javascript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "typescript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "html": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "css": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "tailwind": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  "bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "sass": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  "redux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  "webpack": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
  "vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  "jquery": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
  "three.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",

  // Backend
  "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "django": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  "flask": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  "java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "spring": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  "c#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  ".net": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  "php": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "laravel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
  "go": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  "rust": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
  "ruby": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  "rails": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain-wordmark.svg",
  "c++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "graphql": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",

  // Database
  "mongodb": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "postgresql": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "mysql": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "redis": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  "firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  "sqlite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  "oracle": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",

  // Mobile
  "flutter": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "react native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "dart": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  "swift": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  "kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  "android": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  "ios": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",

  // DevOps & Cloud
  "aws": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "google cloud": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  "azure": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  "docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  "jenkins": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  "github actions": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
  "heroku": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
  "vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  "netlify": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
  "linux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "bash": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  "nginx": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",

  // Tools & Design
  "git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "github": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "gitlab": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
  "figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "photoshop": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
  "illustrator": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
  "unity": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
  "unreal": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg",
  "vscode": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
};

// Section definitions for Portfolio (Mapped to Template1)
const SECTIONS = [
  { key: "hero", label: "Hero & Branding", icon: User },
  { key: "about", label: "About Me", icon: FileText },
  { key: "skills", label: "Skills & Tech", icon: Award },
  { key: "services", label: "Services", icon: Layers },
  { key: "projects", label: "Featured Projects", icon: FolderGit2 },
  { key: "contact", label: "Contact Info", icon: Mail },
];

// Types for portfolio data
type Skill = { name: string; level: number };
type Project = { title: string; category: string; image: string; desc: string; tech: string; link: string };
type Service = { title: string; desc: string; icon: string };
type ContactSocials = { linkedin: string; github: string; twitter: string; instagram: string };
type Contact = { email: string; phone: string; address: string; socials: ContactSocials };
type Hero = { name: string; role: string; tagline: string; image: string; titles?: string[]; resume?: string; };
type About = { heading: string; description: string; details: string; image: string };

type PortfolioData = {
  hero: Hero;
  about: About;
  skills: Skill[];
  services: Service[];
  projects: Project[];
  contact: Contact;
};

const INITIAL_DATA: PortfolioData = {
  hero: {
    name: "",
    role: "",
    tagline: "",
    image: "",
    titles: [],
    resume: ""
  },
  about: {
    heading: "",
    description: "",
    details: "",
    image: ""
  },
  skills: [], // Start empty as requested
  services: [], // Start empty
  projects: [
    { 
      title: "", 
      category: "", 
      image: "",
      desc: "",
      tech: "",
      link: ""
    }
  ],
  contact: {
    email: "",
    phone: "",
    address: "",
    socials: {
        linkedin: "",
        github: "",
        twitter: "",
        instagram: ""
    }
  }
};

export default function PortfolioBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("hero");
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const { data: session } = useSession();
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'auth_check' | 'working' | 'success' | 'error' | 'exists'>('idle');
  const [publishLogs, setPublishLogs] = useState<string[]>([]);
  const [repoName, setRepoName] = useState("my-portfolio");
  const [publishedUrl, setPublishedUrl] = useState("");
  const [existsMessage, setExistsMessage] = useState("");

  const handlePublish = async (force = false) => {
    if (!session) {
        signIn('github');
        return;
    }

    setPublishStatus('working');
    setPublishLogs(prev => [...prev, force ? "Overwriting repository..." : "Starting publication process..."]);
    
    try {
        setPublishLogs(prev => [...prev, "Fetching template files..."]);
        
        // 1. Fetch Template Files (Client-side fetch from public folder)
        const [htmlContent, cssContent, jsContent] = await Promise.all([
            fetch('/portfolio-templates/Template1/index.html').then(res => res.text()),
            fetch('/portfolio-templates/Template1/style.css').then(res => res.text()),
            fetch('/portfolio-templates/Template1/script.js').then(res => res.text())
        ]);

        setPublishLogs(prev => [...prev, "Customizing template with your data..."]);

        // 2. Customize JS with Regex Replacements
        let updatedJs = jsContent;
        
        // Helper to safe stringify for JS injection
        const safeStr = (str: string) => str.replace(/'/g, "\\'").replace(/"/g, '\\"');
        
        // --- 1. Basic Info ---
        updatedJs = updatedJs.replace(/const pageTitle = '.*';/, `const pageTitle = '${safeStr(data.hero.name)} | Portfolio';`);
        updatedJs = updatedJs.replace(/const heroName = '.*';/, `const heroName = '${safeStr(data.hero.name)}';`);
        
        // Hero Titles
        if (data.hero.titles && data.hero.titles.length > 0) {
             const titlesString = JSON.stringify(data.hero.titles);
             updatedJs = updatedJs.replace(/const heroTitles = \[[\s\S]*?\];/, `const heroTitles = ${titlesString};`);
        } else if (data.hero.role) {
             updatedJs = updatedJs.replace(/const heroTitles = \[[\s\S]*?\];/, `const heroTitles = ['${safeStr(data.hero.role)}'];`);
        }

        // Hero Image (Use Base64 if available, or empty if user cleared it)
        // If user hasn't touched it (it's empty), we replace with empty to avoid default asset usage
        updatedJs = updatedJs.replace(/const heroImageURL = '.*';/, `const heroImageURL = '${data.hero.image || ""}';`);
        
        // Resume URL
        updatedJs = updatedJs.replace(/const heroCV_URL = '.*';/, `const heroCV_URL = '${safeStr(data.hero.resume || "#")}';`);

        // --- 2. About Section ---
        updatedJs = updatedJs.replace(/const aboutHeading = '.*';/, `const aboutHeading = '${safeStr(data.about.heading || "About Me")}';`);
        updatedJs = updatedJs.replace(/const aboutText = '.*';/, `const aboutText = '${safeStr(data.about.description)}';`);
        updatedJs = updatedJs.replace(/const aboutImageURL = '.*';/, `const aboutImageURL = '${data.about.image || ""}';`);

        // About Details (Transform string to list if simple, or keep structure)
        if (data.about.details) {
            // We'll create a simple list item for the details
             const aboutDetailsObj = [
                { 
                    type: 'list', 
                    title: 'Details',
                    items: [ safeStr(data.about.details) ]
                }
            ];
             updatedJs = updatedJs.replace(/const aboutDetails = \[[\s\S]*?\];/, `const aboutDetails = ${JSON.stringify(aboutDetailsObj)};`);
        }

        // --- 3. Skills Section ---
        // Map user skills to template format { name, iconClass }
        const skillsMapped = data.skills.map(skill => ({
            name: skill.name,
            // Try to guess devicon class, default to code-branch
            iconClass: `devicon-${skill.name.toLowerCase().replace(/[ .]/g, '')}-plain colored` 
        }));
        updatedJs = updatedJs.replace(/const skillsData = \[[\s\S]*?\];/, `const skillsData = ${JSON.stringify(skillsMapped)};`);

        // --- 4. Services Section ---
        // Map icons from generic keys to FontAwesome
        const iconMap: Record<string, string> = {
            code: 'fas fa-code',
            layers: 'fas fa-layer-group',
            smartphone: 'fas fa-mobile-alt',
            database: 'fas fa-database',
            server: 'fas fa-server',
            layout: 'fas fa-pencil-ruler',
            default: 'fas fa-concierge-bell'
        };

        const servicesMapped = data.services.map(service => ({
            icon: iconMap[service.icon] || iconMap.default,
            title: service.title,
            description: service.desc
        }));
        updatedJs = updatedJs.replace(/const servicesData = \[[\s\S]*?\];/, `const servicesData = ${JSON.stringify(servicesMapped)};`);

        // --- 5. Projects Section ---
        const projectsMapped = data.projects.map((project, idx) => ({
            id: idx + 1,
            title: project.title,
            subtitle: project.category,
            description: project.desc,
            image: project.image || "", // Use Base64 or empty
            thumbnail: project.image || "", // Use same image
            technologies: project.tech ? project.tech.split(',').map(s => s.trim()) : [],
            demoUrl: project.link || "#",
            codeUrl: project.link || "#",
            status: "Completed"
        }));
        updatedJs = updatedJs.replace(/const projectsData = \[[\s\S]*?\];/, `const projectsData = ${JSON.stringify(projectsMapped)};`);

        // --- 6. Contact Section ---
        const contactMapped = {
            email: data.contact.email,
            phone: data.contact.phone,
            location: data.contact.address,
            socialLinks: {
                github: data.contact.socials.github || "#",
                linkedin: data.contact.socials.linkedin || "#",
                twitter: data.contact.socials.twitter || "#",
                instagram: data.contact.socials.instagram || "#"
            }
        };
        updatedJs = updatedJs.replace(/const contactData = {[\s\S]*?};/, `const contactData = ${JSON.stringify(contactMapped)};`);
        
        // 3. Prepare Payload
        const payload = {
            repoName,
            force,
            files: [
                { path: 'index.html', content: htmlContent },
                { path: 'style.css', content: cssContent },
                { path: 'script.js', content: updatedJs },
                // Create a .nojekyll file to bypass Jekyll processing (good for custom HTML/JS sites)
                { path: '.nojekyll', content: '' }
            ]
        };

        setPublishLogs(prev => [...prev, "Connecting to GitHub..."]);
        const res = await fetch('/api/portfolio/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (result.exists) {
            setPublishStatus('exists');
            setExistsMessage(result.message);
            setPublishLogs(prev => [...prev, "Repository already exists."]);
        } else if (result.success) {
            setPublishStatus('success');
            setPublishedUrl(result.pagesUrl);
            setPublishLogs(prev => [...prev, "Successfully published!", "GitHub Pages is enabling... it might take a minute."]);
        } else {
            setPublishStatus('error');
            setPublishLogs(prev => [...prev, `Error: ${result.error || 'Unknown error'}`]);
        }
    } catch (err: unknown) {
        setPublishStatus('error');
        const message = err instanceof Error ? err.message : String(err);
        setPublishLogs(prev => [...prev, `Detailed Error: ${message}`]);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
        setIsSaving(false);
        // setShowPublishModal(true); // Don't auto show on save, let user click Publish
        alert("Portfolio saved successfully!");
    }, 1000);
  };   

  const handlePublishClick = () => {
      setShowPublishModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: string, key?: string, index?: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    
    try {
        const file = e.target.files[0];
        
        // Helper to resize and convert to Base64 (Client-side only)
        // This solves Vercel's read-only filesystem limit and reduces payload size
        const processImage = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target?.result as string;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        // Resize to max 800px width/height to keep payload light for Vercel/GitHub
                        const MAX_SIZE = 800; 
                        let width = img.width;
                        let height = img.height;
                        
                        if (width > height) {
                            if (width > MAX_SIZE) {
                                height *= MAX_SIZE / width;
                                width = MAX_SIZE;
                            }
                        } else {
                            if (height > MAX_SIZE) {
                                width *= MAX_SIZE / height;
                                height = MAX_SIZE;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx?.drawImage(img, 0, 0, width, height);
                        // Compress to JPEG 0.7 quality
                        resolve(canvas.toDataURL('image/jpeg', 0.7));
                    };
                    img.onerror = (err) => reject(err);
                };
                reader.onerror = (err) => reject(err);
            });
        };

        const base64Url = await processImage(file);

        // Update state with new Base64 URL
        if (section === "hero") {
            setData(prev => ({...prev, hero: {...prev.hero, image: base64Url}}));
        } else if (section === "about") {
            setData(prev => ({...prev, about: {...prev.about, image: base64Url}}));
        } else if (section === "projects" && typeof index === "number") {
            const newProjects = [...data.projects];
            newProjects[index].image = base64Url;
            setData(prev => ({...prev, projects: newProjects}));
        }

    } catch (error) {
        console.error("Upload error", error);
        alert("An error occurred during image processing.");
    } finally {
        setUploading(false);
    }
  };

  // --- FORM RENDERERS ---

  const renderFormInfo = () => {
    switch(activeSection) {
      case "hero":
        return (
          <div className="space-y-6">
            <SectionHeader icon={User} title="Hero Section" subtitle="First impressions matter. Customize your landing area." />
            
            <div className="grid grid-cols-1 gap-5">
                <InputGroup 
                    label="Display Name / Brand" 
                    value={data.hero.name} 
                    onChange={(v: string) => setData({...data, hero: {...data.hero, name: v}})}
                    placeholder="e.g. John Doe, Creative Studio"
                />
                <InputGroup 
                    label="Professional Role / Title" 
                    value={data.hero.role} 
                    onChange={(v: string) => setData({...data, hero: {...data.hero, role: v}})}
                    placeholder="e.g. Product Designer, AI Engineer"
                />
                
                <TextAreaGroup 
                    label="Tagline / Slogan" 
                    value={data.hero.tagline} 
                    onChange={(v: string) => setData({...data, hero: {...data.hero, tagline: v}})} 
                    placeholder="Brief description appearing below your name..."
                />
                
                <InputGroup 
                    label="Resume / CV Link" 
                    value={data.hero.resume || ""} 
                    onChange={(v: string) => setData({...data, hero: {...data.hero, resume: v}})}
                    placeholder="e.g. Google Drive Link, Dropbox URL..."
                    icon={FileText}
                />

                 <ImageUploadGroup 
                    label="Hero Image" 
                    imageValue={data.hero.image} 
                    onUpload={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e, "hero")} 
                    uploading={uploading}
                 />
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
             <SectionHeader icon={FileText} title="About Section" subtitle="Tell your story and define your mission." />

            <div className="space-y-5">
              <InputGroup 
                label="Section Heading" 
                value={data.about.heading} 
                onChange={(v: string) => setData({...data, about: {...data.about, heading: v}})}
                placeholder="e.g. About Me"
              />
              
              <TextAreaGroup 
                label="Bio / Description" 
                value={data.about.description} 
                onChange={(v: string) => setData({...data, about: {...data.about, description: v}})} 
                height="h-40"
                placeholder="Share your professional journey and what drives you..."
              />

              <TextAreaGroup 
                label="More Details" 
                value={data.about.details} 
                onChange={(v: string) => setData({...data, about: {...data.about, details: v}})} 
                height="h-24"
                placeholder="Additional info displayed in the details container..."
              />

               <ImageUploadGroup 
                    label="About Image" 
                    imageValue={data.about.image} 
                    onUpload={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e, "about")} 
                    uploading={uploading}
                 />
            </div>
          </div>
        );

      case "skills":
        const suggestions = Object.keys(TECH_ICONS).filter(k => 
            newSkill && k.toLowerCase().includes(newSkill.toLowerCase())
        );

        return (
            <div className="space-y-6">
                 <SectionHeader icon={Award} title="Skills & Technologies" subtitle="Highlight your technical expertise." />

                {/* Add New Skill Input & Suggestions */}
                <div className="relative group z-20">
                    <div className="flex gap-3 relative">
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && newSkill.trim()) {
                                        setData(prev => ({
                                            ...prev, 
                                            skills: [...prev.skills, { name: newSkill.trim(), level: 80 }]
                                        }));
                                        setNewSkill("");
                                    }
                                }}
                                placeholder="Type a skill (e.g. React, Python)..."
                                className="w-full px-4 py-3 md:px-5 md:py-4 bg-[#0F172A] border border-white/5 rounded-xl md:rounded-2xl text-white placeholder-slate-600 focus:border-[#0EA5E9] focus:bg-[#1E293B] outline-none transition-all pl-10 md:pl-12 font-medium tracking-wide shadow-lg shadow-black/20 text-sm md:text-base"
                            />
                            <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <Sparkles size={18} />
                            </div>

                            {/* DROPDOWN SUGGESTIONS */}
                            {suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1E293B] border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto custom-scrollbar">
                                    {suggestions.map(tech => (
                                        <button
                                            key={tech}
                                            onClick={() => {
                                                // Capitalize logic helper
                                                const formattedName = tech.charAt(0).toUpperCase() + tech.slice(1);
                                                setData(prev => ({
                                                    ...prev, 
                                                    skills: [...prev.skills, { name: formattedName, level: 80 }]
                                                }));
                                                setNewSkill(""); // Clear input
                                            }}
                                            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#0EA5E9]/10 text-left transition-colors border-b border-white/5 last:border-0 group/item"
                                        >
                                            <img src={TECH_ICONS[tech]} alt={tech} className="w-5 h-5 object-contain" />
                                            <span className="text-slate-300 group-hover/item:text-white font-medium">{tech.charAt(0).toUpperCase() + tech.slice(1)}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <button 
                            onClick={() => {
                                if (newSkill.trim()) {
                                    setData(prev => ({
                                        ...prev, 
                                        skills: [...prev.skills, { name: newSkill.trim(), level: 80 }]
                                    }));
                                    setNewSkill("");
                                }
                            }}
                            className="bg-[#0EA5E9] text-white p-3 md:p-4 rounded-xl hover:bg-[#0284c7] transition-colors shadow-lg shadow-sky-500/20 flex-shrink-0"
                            title="Add Skill manually"
                        >
                            <Plus size={20} className="md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>

                {/* Skills Grid */}
                {data.skills.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.skills.map((skill, index) => {
                            // Try to match icon somewhat loosely
                            const iconKey = Object.keys(TECH_ICONS).find(k => 
                                skill.name.toLowerCase() === k.toLowerCase() || 
                                skill.name.toLowerCase().includes(k.toLowerCase())
                            );
                            const iconUrl = iconKey ? TECH_ICONS[iconKey] : null;

                            return (
                                <div key={index} className="group p-4 bg-[#0F172A] border border-slate-700/50 rounded-xl hover:border-[#0EA5E9]/50 transition-all hover:bg-[#1E293B]/50 flex items-center gap-4 relative overflow-hidden">
                                    {/* Icon Box */}
                                    <div className="w-12 h-12 flex-shrink-0 bg-black/40 rounded-lg flex items-center justify-center border border-white/5 group-hover:border-[#0EA5E9]/20 transition-colors">
                                        {iconUrl ? (
                                            <img src={iconUrl} alt={skill.name} className="w-7 h-7 object-contain" />
                                        ) : (
                                            <div className="text-slate-500 font-bold text-xs">{skill.name.substring(0,2).toUpperCase()}</div>
                                        )}
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="font-bold text-white text-sm truncate pr-2" title={skill.name}>{skill.name}</div>
                                            <button 
                                                onClick={() => {
                                                    const newSkills = data.skills.filter((_, i) => i !== index);
                                                    setData({...data, skills: newSkills});
                                                }}
                                                className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white/5 rounded-md"
                                                title="Remove Skill"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                        
                                        {/* Simple Range Slider for Level */}
                                        <div className="flex items-center gap-3">
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="100" 
                                                value={skill.level} 
                                                onChange={(e) => {
                                                    const newSkills = [...data.skills];
                                                    newSkills[index].level = parseInt(e.target.value);
                                                    setData({...data, skills: newSkills});
                                                }}
                                                className="flex-1 h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0EA5E9]"
                                            />
                                            <span className="text-[10px] font-mono text-[#0EA5E9] w-8 text-right">{skill.level}%</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl bg-white/0 hover:bg-white/[0.02] transition-colors">
                         <div className="w-16 h-16 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0EA5E9]">
                            <Award size={32} />
                         </div>
                        <p className="text-slate-500 text-sm font-medium">Your tech stack is empty.</p>
                        <p className="text-slate-600 text-xs mt-1">Start typing above to add languages, frameworks, and tools.</p>
                    </div>
                )}
            </div>
        );

      case "services":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <SectionHeader icon={Layers} title="Services Provided" subtitle="What can you do for your clients?" noMargin />
                 <button 
                    onClick={() => {
                        setData(prev => ({
                            ...prev, 
                            services: [...prev.services, { title: "", desc: "", icon: "code" }]
                        }));
                    }}
                    className="px-3 py-1.5 bg-[#0EA5E9]/20 text-[#0EA5E9] text-xs font-bold rounded-lg hover:bg-[#0EA5E9]/30 transition-colors uppercase tracking-wider flex items-center gap-2"
                >
                    <Plus size={14} /> Add Service
                 </button>
            </div>

            {data.services.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {data.services.map((service, index) => {
                        const CurrentIcon = SERVICE_ICONS[service.icon] || Layers;
                        return (
                        <div key={index} className="p-4 md:p-6 bg-[#0F172A] border border-slate-700/50 rounded-xl hover:border-[#0EA5E9]/30 transition-colors relative group">
                            <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-2">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-[#0EA5E9]/10 rounded text-[#0EA5E9]">
                                       <CurrentIcon size={16} />
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Service #{index + 1}</h3>
                                </div>
                                <button 
                                    onClick={() => {
                                        const newServices = data.services.filter((_, i) => i !== index);
                                        setData({...data, services: newServices});
                                    }}
                                    className="text-slate-600 hover:text-red-400 p-1 hover:bg-white/5 rounded transition-all"
                                    title="Remove Service"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            
                            <div className="space-y-5">
                                <InputGroup 
                                    label="Service Title" 
                                    value={service.title} 
                                    onChange={(v: string) => {
                                        const newServices = [...data.services];
                                        newServices[index].title = v;
                                        setData({...data, services: newServices});
                                    }}
                                    placeholder="e.g. UI/UX Design"
                                />
                                
                                <TextAreaGroup 
                                    label="Service Description" 
                                    value={service.desc} 
                                    onChange={(v: string) => {
                                        const newServices = [...data.services];
                                        newServices[index].desc = v;
                                        setData({...data, services: newServices});
                                    }} 
                                    height="h-24"
                                    placeholder="Describe the value you provide..."
                                />

                                {/* Icon Picker */}
                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-[#0EA5E9] ml-1">
                                        Icon Symbol
                                    </label>
                                    <div className="flex flex-wrap gap-2 p-3 bg-[#1E293B]/50 rounded-2xl border border-white/5">
                                        {Object.entries(SERVICE_ICONS).map(([key, Icon]) => (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    const newServices = [...data.services];
                                                    newServices[index].icon = key;
                                                    setData({...data, services: newServices});
                                                }}
                                                title={key.charAt(0).toUpperCase() + key.slice(1)}
                                                className={`p-2.5 rounded-xl transition-all ${
                                                    service.icon === key 
                                                    ? "bg-[#0EA5E9] text-white shadow-lg shadow-sky-500/20 scale-105" 
                                                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                                }`}
                                            >
                                                <Icon size={18} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            ) : (
                 <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl bg-white/0 hover:bg-white/[0.02] transition-colors">
                     <div className="w-16 h-16 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0EA5E9]">
                        <Layers size={32} />
                     </div>
                    <p className="text-slate-500 text-sm font-medium">No services listed.</p>
                    <p className="text-slate-600 text-xs mt-1">Add services to outline what you offer.</p>
                </div>
            )}
          </div>
        );

      case "projects":
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                    <SectionHeader icon={FolderGit2} title="Featured Projects" subtitle="Showcase your best work." noMargin />
                    {/* Add Project Button (Visual Only for now) */}
                     <button className="px-3 py-1.5 bg-[#0EA5E9]/20 text-[#0EA5E9] text-xs font-bold rounded-lg hover:bg-[#0EA5E9]/30 transition-colors uppercase tracking-wider">
                        + Add Project
                     </button>
                </div>

                <div className="space-y-6">
                    {data.projects.map((project, index) => (
                        <div key={index} className="p-4 md:p-6 bg-[#0F172A] border border-slate-700/50 rounded-xl hover:border-[#0EA5E9]/30 transition-colors relative group">
                            <div className="absolute top-4 right-4 text-xs font-mono text-slate-600">ID: {index + 1}</div>
                            <h3 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-wider border-b border-white/5 pb-2">Project Details</h3>
                            
                            <div className="grid grid-cols-1 gap-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputGroup 
                                        label="Project Name" 
                                        value={project.title} 
                                        onChange={(v: string) => {
                                            const newProjects = [...data.projects];
                                            newProjects[index].title = v;
                                            setData({...data, projects: newProjects});
                                        }}
                                        placeholder="e.g. E-Commerce Dashboard"
                                    />
                                    <InputGroup 
                                        label="Category" 
                                        value={project.category} 
                                        onChange={(v: string) => {
                                            const newProjects = [...data.projects];
                                            newProjects[index].category = v;
                                            setData({...data, projects: newProjects});
                                        }}
                                        placeholder="e.g. Web Development"
                                    />
                                </div>

                                <TextAreaGroup 
                                    label="Description" 
                                    value={project.desc} 
                                    onChange={(v: string) => {
                                        const newProjects = [...data.projects];
                                        newProjects[index].desc = v;
                                        setData({...data, projects: newProjects});
                                    }} 
                                    height="h-24"
                                    placeholder="Briefly describe the project and your role..."
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputGroup label="Tech Stack" value={project.tech || ""} onChange={(v: string) => {
                                        const newProjects = [...data.projects];
                                        newProjects[index].tech = v;
                                        setData({...data, projects: newProjects});
                                    }} placeholder="e.g. React, Python" />
                                    <InputGroup 
                                        label="Demo Link" 
                                        value={project.link || ""} 
                                        onChange={(v: string) => {
                                            const newProjects = [...data.projects];
                                            newProjects[index].link = v;
                                            setData({...data, projects: newProjects});
                                        }} 
                                        icon={Globe}
                                        placeholder="https://..."
                                    />
                                </div>
                                
                                <ImageUploadGroup 
                                    label="Project Thumbnail" 
                                    imageValue={project.image} 
                                    onUpload={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e, "projects", undefined, index)} 
                                    uploading={uploading}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

      case "contact":
        return (
            <div className="space-y-6">
                 <SectionHeader icon={Mail} title="Contact Info" subtitle="How people can reach you." />

                <div className="grid grid-cols-1 gap-5">
                    <InputGroup label="Email Address" value={data.contact.email} onChange={(v: string) => setData({...data, contact: {...data.contact, email: v}})} icon={Mail} placeholder="e.g. hello@example.com" />
                    <InputGroup label="Phone Number" value={data.contact.phone} onChange={(v: string) => setData({...data, contact: {...data.contact, phone: v}})} placeholder="e.g. +1 555 123 4567" />
                    <InputGroup label="Physical Address" value={data.contact.address} onChange={(v: string) => setData({...data, contact: {...data.contact, address: v}})} icon={MapPin} placeholder="e.g. San Francisco, CA" />
                    
                    <div className="pt-6 border-t border-white/5">
                         <h3 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-wide">Social Connect</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InputGroup label="LinkedIn" value={data.contact.socials.linkedin} onChange={(v: string) => setData({...data, contact: {...data.contact, socials: {...data.contact.socials, linkedin: v}}})} placeholder="Profile URL" />
                            <InputGroup label="GitHub" value={data.contact.socials.github} onChange={(v: string) => setData({...data, contact: {...data.contact, socials: {...data.contact.socials, github: v}}})} placeholder="Profile URL" />
                            <InputGroup label="Twitter (X)" value={data.contact.socials.twitter} onChange={(v: string) => setData({...data, contact: {...data.contact, socials: {...data.contact.socials, twitter: v}}})} placeholder="Profile URL" />
                            <InputGroup label="Instagram" value={data.contact.socials.instagram || ""} onChange={(v: string) => setData({...data, contact: {...data.contact, socials: {...data.contact.socials, instagram: v}}})} placeholder="Profile URL" />
                         </div>
                    </div>
                </div>
            </div>
        );
        
      default:
        return (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                <Sparkles size={48} className="mb-4 opacity-20" />
                <p>Configuration for {activeSection} coming soon.</p>
            </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
        {/* SIDEBAR */}
        <aside className="w-16 md:w-20 lg:w-64 bg-[#0F172A] border-r border-white/5 flex flex-col z-30 flex-shrink-0">
            {/* Sidebar Header */}
            <div className="h-20 flex flex-col justify-center px-2 lg:px-6 border-b border-white/5">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                     <Link href="/portfolio" className="bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/20 p-2 rounded-lg transition-colors group">
                        <ArrowLeft size={18} className="text-[#0EA5E9]" />
                    </Link>
                    <div className="hidden lg:block">
                        <h1 className="font-bold text-white text-lg leading-tight tracking-wide">BUILDER</h1>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Engine v1.0</p>
                    </div>
                </div>
            </div>

            {/* Navigation Sections */}
            <div className="flex-1 overflow-y-auto py-6 space-y-2 px-3">
                {SECTIONS.map((section) => (
                    <button
                        key={section.key}
                        onClick={() => setActiveSection(section.key)}
                        className={`w-full flex items-center justify-center lg:justify-start gap-4 p-3 rounded-2xl transition-all duration-300 group relative ${
                            activeSection === section.key 
                            ? "bg-gradient-to-r from-[#0EA5E9] to-[#0284c7] text-white shadow-lg shadow-sky-900/20" 
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                        <section.icon size={22} className={activeSection === section.key ? "text-white" : "text-slate-500 group-hover:text-white transition-colors"} />
                        <span className="hidden lg:block font-medium text-sm">{section.label}</span>
                        
                        {/* Active Indicator Strip */}
                        {activeSection === section.key && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-r-full lg:hidden" />
                        )}
                    </button>
                ))}
            </div>

             <div className="p-4 border-t border-white/5 space-y-2">
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full h-12 bg-slate-800 text-white hover:bg-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isSaving ? <span className="animate-spin text-lg">⌛</span> : <Save size={20} />}
                    <span className="hidden lg:block">Save Draft</span>
                </button>
                <button 
                    onClick={handlePublishClick}
                    className="w-full h-12 bg-[#0EA5E9] text-white hover:bg-[#0284C7] rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] group"
                >
                    <Globe size={20} className="group-hover:animate-pulse" />
                    <span className="hidden lg:block">Publish</span>
                </button>
            </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 bg-[#020617] overflow-y-auto custom-scrollbar relative">
             <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 pb-32 space-y-6 md:space-y-8">
                 {/* Section Title with Glow */}
                <div className="relative">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{SECTIONS.find(s => s.key === activeSection)?.label}</h1>
                    <p className="text-sm md:text-base text-slate-500">Customize this section for your portfolio.</p>
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0EA5E9] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
                </div>
                
                {/* The Form */}
                <div className="space-y-8 relative z-10">
                    {renderFormInfo()}
                </div>
             </div>
        </main>

        {/* PUBLISH MODAL */}
        <AnimatePresence>
            {showPublishModal && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#0F172A] border border-white/10 rounded-2xl w-full max-w-lg p-4 md:p-6 shadow-2xl relative"
                    >
                        <button 
                            onClick={() => setShowPublishModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            <Globe className="text-[#0EA5E9]" />
                            Publish to GitHub
                        </h2>
                        <p className="text-slate-400 mb-6">Deploy your portfolio to GitHub Pages effectively for free.</p>

                        {!session ? (
                            <div className="text-center py-8">
                                <div className="mb-4 text-slate-300">You need to connect your GitHub account first.</div>
                                <button 
                                    onClick={() => signIn('github')}
                                    className="px-6 py-3 bg-[#24292F] hover:bg-[#2c3239] text-white rounded-xl font-bold flex items-center gap-2 mx-auto transition-all"
                                >
                                    <FolderGit2 size={20} />
                                    Connect GitHub
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Repo Name Input */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">Repository Name</label>
                                    <input 
                                        type="text" 
                                        value={repoName}
                                        onChange={(e) => setRepoName(e.target.value)}
                                        className="w-full px-4 py-3 bg-[#1E293B] border border-white/5 rounded-xl text-white outline-none focus:border-[#0EA5E9]"
                                        placeholder="my-portfolio"
                                        disabled={publishStatus === 'working' || publishStatus === 'success'}
                                    />
                                    <p className="text-xs text-slate-500 mt-2">
                                        Use <code>{session.user?.name || 'username'}.github.io</code> for your main site.
                                    </p>
                                </div>

                                {/* Logs Area */}
                                {publishLogs.length > 0 && (
                                    <div className="bg-black/50 rounded-xl p-4 max-h-40 overflow-y-auto custom-scrollbar font-mono text-xs text-slate-300">
                                        {publishLogs.map((log, i) => (
                                            <div key={i} className="mb-1">
                                                <span className="text-[#0EA5E9] mr-2">➜</span>
                                                {log}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Status Messages & Actions */}
                                {publishStatus === 'idle' && (
                                    <button 
                                        onClick={() => handlePublish(false)}
                                        className="w-full py-4 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-xl font-bold shadow-lg shadow-[#0EA5E9]/20 transition-all"
                                    >
                                        Publish Now
                                    </button>
                                )}

                                {publishStatus === 'exists' && (
                                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-center">
                                        <p className="text-yellow-200 mb-4 text-sm font-medium">
                                            {existsMessage || "Repository already exists."}
                                        </p>
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => setShowPublishModal(false)}
                                                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-sm"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={() => handlePublish(true)}
                                                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm"
                                            >
                                                Overwrite (Shift Data)
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {publishStatus === 'success' && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                                            <CheckCircle2 className="text-green-500 shrink-0" />
                                            <div className="overflow-hidden">
                                                <div className="font-bold text-green-400">Published Successfully!</div>
                                                <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-green-300/70 hover:text-green-300 truncate block underline">
                                                    {publishedUrl}
                                                </a>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => window.open(publishedUrl, '_blank')}
                                            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg transition-all"
                                        >
                                            Visit Website
                                        </button>
                                    </div>
                                )}

                                {publishStatus === 'error' && (
                                    <button 
                                        onClick={() => { setPublishStatus('idle'); setPublishLogs([]); }}
                                        className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold"
                                    >
                                        Try Again
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}

// --- HELPER COMPONENTS ---

type SectionHeaderProps = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  noMargin?: boolean;
};

const SectionHeader = ({ icon: Icon, title, subtitle, noMargin }: SectionHeaderProps) => (
    <div className={`flex items-center gap-3 ${noMargin ? '' : 'mb-4 md:mb-6'}`}>
        <div className="p-1.5 md:p-2 bg-[#0EA5E9]/10 rounded-lg">
            <Icon className="text-[#0EA5E9] w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
            <h2 className="text-lg md:text-xl font-bold text-white leading-tight">{title}</h2>
            {subtitle && <p className="text-slate-400 text-xs md:text-sm">{subtitle}</p>}
        </div>
    </div>
);

type InputGroupProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon?: LucideIcon;
  placeholder?: string;
};

const InputGroup = ({ label, value, onChange, icon: Icon, placeholder }: InputGroupProps) => (
  <div className="group">
    <label className="block text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3 text-[#0EA5E9] ml-1">
        {label}
    </label>
    <div className="relative transform transition-all duration-300 group-hover:-translate-y-1">
        <input 
            type="text" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 md:px-5 md:py-4 bg-[#0F172A] border border-white/5 rounded-xl md:rounded-2xl text-white placeholder-slate-600 focus:border-[#0EA5E9] focus:bg-[#1E293B] focus:shadow-[0_0_20px_rgba(14,165,233,0.15)] outline-none transition-all pl-4 md:pl-5 font-medium tracking-wide text-sm md:text-base"
        />
        {Icon && (
            <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#0EA5E9] transition-colors">
                <Icon size={18} className="md:w-5 md:h-5" />
            </div>
        )}
        {/* Animated Bottom Line */}
        <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
    </div>
  </div>
);

type TextAreaGroupProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  height?: string;
};

const TextAreaGroup = ({ label, value, onChange, placeholder, height = "h-24" }: TextAreaGroupProps) => (
    <div className="group">
      <label className="block text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3 text-[#0EA5E9] ml-1">
          {label}
      </label>
      <div className="relative transform transition-all duration-300 group-hover:-translate-y-1">
          <textarea 
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={`w-full px-4 py-3 md:px-5 md:py-4 bg-[#0F172A] border border-white/5 rounded-xl md:rounded-2xl text-white placeholder-slate-600 focus:border-[#0EA5E9] focus:bg-[#1E293B] focus:shadow-[0_0_20px_rgba(14,165,233,0.15)] outline-none transition-all pl-4 md:pl-5 font-medium tracking-wide resize-none text-sm md:text-base ${height}`}
          />
           {/* Animated Bottom Line */}
          <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
      </div>
    </div>
);

type ImageUploadGroupProps = {
  label: string;
  imageValue?: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading?: boolean;
};

const ImageUploadGroup: React.FC<ImageUploadGroupProps> = ({ label, imageValue = "", onUpload, uploading = false }) => (
    <div className="group">
        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3 text-[#0EA5E9] ml-1">
            {label}
        </label>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-5 bg-[#0F172A] border border-white/5 border-dashed rounded-xl md:rounded-2xl hover:border-[#0EA5E9]/50 transition-colors group-hover:bg-[#1E293B]/30">
            {/* Preview Box */}
            <div className="w-full md:w-32 h-40 md:h-32 flex-shrink-0 bg-black rounded-lg md:rounded-xl overflow-hidden border border-white/10 relative">
                {imageValue ? (
                    <img src={imageValue} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <ImageIcon size={32} />
                    </div>
                )}
                 {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                        <Loader2 className="animate-spin text-[#0EA5E9]" />
                    </div>
                )}
            </div>

            {/* Upload Controls */}
            <div className="flex-1 flex flex-col justify-center gap-3">
                <div className="relative">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={onUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={uploading}
                    />
                    <div className="flex items-center gap-3 px-5 py-3 bg-[#0EA5E9]/10 rounded-xl border border-[#0EA5E9]/20 text-[#0EA5E9] font-bold text-sm group-hover:bg-[#0EA5E9] group-hover:text-white transition-all w-fit">
                        <UploadCloud size={18} />
                        {uploading ? "Uploading..." : "Select Image"}
                    </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                    Recommended: high-resolution JPG or PNG. Images will be stored in your private assets folder.
                </p>
                {imageValue && (
                     <div className="text-[10px] text-green-500 font-mono flex items-center gap-1">
                        ✓ Asset loaded securely
                     </div>
                )}
            </div>
        </div>
    </div>
);
