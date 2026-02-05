export type TemplateLayout = 
  | "classic-sidebar-left"   // Colored sidebar left, white content right
  | "classic-sidebar-right"  // Colored sidebar right, white content left
  | "modern-stacked"         // Full width header, single column body
  | "modern-grid"            // Full width header, two column body split
  | "minimal-clean"          // Pure text, whitespace driven, no heavy blocks
  | "artistic-banner"     // Large colored header area, floating content
  | "timeline-vertical"
  | "curved-sidebar"
  | "bar-sidebar-right";

export type SectionSeparator = "none" | "line" | "dot" | "thick-bar";

export type TemplateConfig = {
  id: number;
  name: string;
  description: string;
  layout: TemplateLayout;
  hasPhoto: boolean;
  styles: {
    fontFamilyHeading: string; // e.g., 'Merriweather', 'Playfair Display'
    fontFamilyBody: string;    // e.g., 'Inter', 'Open Sans'
    
    // COLORS
    primaryColor: string;      // Used for headings, icons, borders
    secondaryColor: string;    // Used for subheadings, lighter accents
    sidebarBackgroundColor: string; // If layout has sidebar
    headerBackgroundColor: string;  // If layout has banner
    
    // VISUALS
    photoShape: "circle" | "rounded-square" | "square" | "blob";
    sectionSpacing: "compact" | "comfortable" | "spacious";
    entryBorder: boolean; // Adds subtle left-border to experience items
    separatorStyle: SectionSeparator;
    uppercaseHeadings: boolean;
  };
  sections: {
    order: string[]; 
  };
};

const DEFAULT_SECTIONS = ["summary", "experience", "education", "skills", "projects", "certifications"];

// --- HELPER FACTORY ---
const createConfig = (overrides: Partial<TemplateConfig> & { id: number; name: string }): TemplateConfig => ({
  description: "A professional, industry-standard resume template.",
  layout: "modern-stacked",
  hasPhoto: true,
  sections: { order: DEFAULT_SECTIONS },
  ...overrides,
  styles: {
    fontFamilyHeading: "Inter",
    fontFamilyBody: "Inter",
    primaryColor: "#0f172a",
    secondaryColor: "#64748b",
    sidebarBackgroundColor: "#f8fafc",
    headerBackgroundColor: "#ffffff",
    photoShape: "circle",
    sectionSpacing: "comfortable",
    entryBorder: false,
    separatorStyle: "line",
    uppercaseHeadings: true,
    ...overrides.styles,
  }
});

export const TEMPLATE_CONFIGS: Record<number, TemplateConfig> = {
  
  // =================================================================
  // GROUP 1: THE EXECUTIVE SUITE (Authority, Serif Fonts, Traditional)
  // =================================================================
  
  1: createConfig({
    id: 1,
    name: "The CEO",
    description: "Commanding presence with deep navy accents and traditional serif typography.",
    layout: "modern-stacked",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Playfair Display",
      fontFamilyBody: "Lato",
      primaryColor: "#1e3a8a", // Deep Navy
      secondaryColor: "#64748b",
      headerBackgroundColor: "#ffffff",
      sidebarBackgroundColor: "#ffffff",
      separatorStyle: "thick-bar",
      photoShape: "square",
      sectionSpacing: "spacious",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  2: createConfig({
    id: 2,
    name: "Global Consultant",
    description: "Clean, high-contrast design preferred by top-tier consulting firms.",
    layout: "classic-sidebar-left",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Merriweather",
      fontFamilyBody: "Open Sans",
      primaryColor: "#111827", // Almost Black
      secondaryColor: "#374151",
      sidebarBackgroundColor: "#f3f4f6", // Light Gray Sidebar
      headerBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: false
    }
  }),

  3: createConfig({
    id: 3,
    name: "Investment Banker",
    description: "Dense information density with a strict grid and no wasted space.",
    layout: "minimal-clean",
    hasPhoto: false,
    styles: {
      fontFamilyHeading: "Times New Roman", // Classic
      fontFamilyBody: "Arial",
      primaryColor: "#000000",
      secondaryColor: "#333333",
      sidebarBackgroundColor: "#ffffff",
      headerBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "square",
      sectionSpacing: "compact",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  4: createConfig({
    id: 4,
    name: "The Diplomat",
    description: "Elegant and understated with a focus on credentials.",
    layout: "modern-grid",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Lora",
      fontFamilyBody: "Source Sans Pro",
      primaryColor: "#3f2c22", // Deep Brown
      secondaryColor: "#78350f",
      sidebarBackgroundColor: "#fffaf0", // Floral White
      headerBackgroundColor: "#ffffff",
      separatorStyle: "dot",
      photoShape: "rounded-square",
      sectionSpacing: "spacious",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  5: createConfig({
    id: 5,
    name: "Legal Counsel",
    description: "Authoritative structure with a strong top border.",
    layout: "modern-stacked",
    hasPhoto: false,
    styles: {
      fontFamilyHeading: "Garamond",
      fontFamilyBody: "Georgia",
      primaryColor: "#1e1e2e",
      secondaryColor: "#4b5563",
      headerBackgroundColor: "#ffffff",
      sidebarBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  // =================================================================
  // GROUP 2: SILICON VALLEY (Clean, Modern Sans, ATS Friendly)
  // =================================================================

  6: createConfig({
    id: 6,
    name: "Full Stack",
    description: "Optimized for technical skills and project portfolios.",
    layout: "classic-sidebar-left",
    hasPhoto: false,
    styles: {
      fontFamilyHeading: "Roboto",
      fontFamilyBody: "Roboto",
      primaryColor: "#0ea5e9", // Sky Blue
      secondaryColor: "#0284c7",
      sidebarBackgroundColor: "#0f172a", // Dark Sidebar
      headerBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: true, // Timeline look
      uppercaseHeadings: true
    }
  }),

  7: createConfig({
    id: 7,
    name: "Product Manager",
    description: "Balances technical depth with leadership soft skills.",
    layout: "modern-grid",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Montserrat",
      fontFamilyBody: "Lato",
      primaryColor: "#0f766e", // Teal
      secondaryColor: "#115e59",
      sidebarBackgroundColor: "#ffffff",
      headerBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  8: createConfig({
    id: 8,
    name: "Data Scientist",
    description: "Structured layout emphasizing education and technical tools.",
    layout: "modern-stacked",
    hasPhoto: false,
    styles: {
      fontFamilyHeading: "Fira Sans",
      fontFamilyBody: "Fira Sans",
      primaryColor: "#4338ca", // Indigo
      secondaryColor: "#6366f1",
      sidebarBackgroundColor: "#ffffff",
      headerBackgroundColor: "#ffffff",
      separatorStyle: "thick-bar",
      photoShape: "circle",
      sectionSpacing: "compact",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  9: createConfig({
    id: 9,
    name: "Startup Founder",
    description: "Bold, modern, and energetic with high contrast.",
    layout: "artistic-banner",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Oswald",
      fontFamilyBody: "Inter",
      primaryColor: "#111827",
      secondaryColor: "#e2e8f0",
      headerBackgroundColor: "#111827", // Dark Header
      sidebarBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "rounded-square",
      sectionSpacing: "spacious",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  10: createConfig({
    id: 10,
    name: "DevOps Engineer",
    description: "Industrial, clean, and extremely readable.",
    layout: "classic-sidebar-right",
    hasPhoto: false,
    styles: {
      fontFamilyHeading: "Ubuntu",
      fontFamilyBody: "Open Sans",
      primaryColor: "#374151",
      secondaryColor: "#6b7280",
      sidebarBackgroundColor: "#f1f5f9",
      headerBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "circle",
      sectionSpacing: "compact",
      entryBorder: true,
      uppercaseHeadings: true
    }
  }),

  // =================================================================
  // GROUP 3: CREATIVE & DESIGN (Visual, Unique Layouts, Bold)
  // =================================================================

  11: createConfig({
    id: 11,
    name: "UX Designer",
    description: "Features a soft background blob and modern typography.",
    layout: "modern-grid",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Poppins",
      fontFamilyBody: "Poppins",
      primaryColor: "#be185d", // Pink
      secondaryColor: "#db2777",
      sidebarBackgroundColor: "#ffffff",
      headerBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "blob", // Unique shape
      sectionSpacing: "spacious",
      entryBorder: false,
      uppercaseHeadings: false
    }
  }),

  12: createConfig({
    id: 12,
    name: "Art Director",
    description: "Uses a distinct sidebar color and bold name placement.",
    layout: "classic-sidebar-left",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Abril Fatface", // Display font
      fontFamilyBody: "Raleway",
      primaryColor: "#ffffff",
      secondaryColor: "#fbcfe8",
      sidebarBackgroundColor: "#db2777", // Bold Pink Sidebar
      headerBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "square",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  13: createConfig({
    id: 13,
    name: "The Minimalist",
    description: "Swiss-style design, heavy use of whitespace and grid.",
    layout: "minimal-clean",
    hasPhoto: false,
    styles: {
      fontFamilyHeading: "Helvetica Neue",
      fontFamilyBody: "Helvetica Neue",
      primaryColor: "#000000",
      secondaryColor: "#555555",
      sidebarBackgroundColor: "#ffffff",
      headerBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "circle",
      sectionSpacing: "spacious",
      entryBorder: false,
      uppercaseHeadings: false
    }
  }),

  14: createConfig({
    id: 14,
    name: "Marketing Lead",
    description: "Energetic orange accents with a friendly layout.",
    layout: "artistic-banner",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Nunito",
      fontFamilyBody: "Nunito",
      primaryColor: "#c2410c", // Orange
      secondaryColor: "#ea580c",
      headerBackgroundColor: "#fff7ed", // Light orange tint
      sidebarBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  15: createConfig({
    id: 15,
    name: "Fashion Editorial",
    description: "High-fashion aesthetic with centered alignment.",
    layout: "modern-stacked",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Didot",
      fontFamilyBody: "Lato",
      primaryColor: "#1c1917",
      secondaryColor: "#44403c",
      headerBackgroundColor: "#ffffff",
      sidebarBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "rounded-square",
      sectionSpacing: "spacious",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  // =================================================================
  // GROUP 4: MODERN PROFESSIONAL (Versatile, Colored Sidebars)
  // =================================================================

  16: createConfig({
    id: 16,
    name: "Project Coordinator",
    description: "A balanced split layout with soft blue tones.",
    layout: "classic-sidebar-left",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Mukta",
      fontFamilyBody: "Open Sans",
      primaryColor: "#1e40af",
      secondaryColor: "#3b82f6",
      sidebarBackgroundColor: "#eff6ff", // Very light blue
      headerBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  17: createConfig({
    id: 17,
    name: "Sales Executive",
    description: "Trust-building design with green financial accents.",
    layout: "classic-sidebar-right",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Cabin",
      fontFamilyBody: "Roboto",
      primaryColor: "#065f46", // Green
      secondaryColor: "#047857",
      sidebarBackgroundColor: "#f0fdf4",
      headerBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "rounded-square",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  18: createConfig({
    id: 18,
    name: "HR Specialist",
    description: "Approachable and organized with purple accents.",
    layout: "modern-grid",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Quicksand",
      fontFamilyBody: "Mulish",
      primaryColor: "#6b21a8", // Purple
      secondaryColor: "#7e22ce",
      sidebarBackgroundColor: "#ffffff",
      headerBackgroundColor: "#faf5ff",
      separatorStyle: "line",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  19: createConfig({
    id: 19,
    name: "Operations Manager",
    description: "Solid, reliable structure with gray-scale sophistication.",
    layout: "modern-stacked",
    hasPhoto: false,
    styles: {
      fontFamilyHeading: "Exo 2",
      fontFamilyBody: "Roboto Condensed",
      primaryColor: "#334155",
      secondaryColor: "#475569",
      headerBackgroundColor: "#ffffff",
      sidebarBackgroundColor: "#ffffff",
      separatorStyle: "thick-bar",
      photoShape: "square",
      sectionSpacing: "compact",
      entryBorder: true,
      uppercaseHeadings: true
    }
  }),

  20: createConfig({
    id: 20,
    name: "Nurse / Medical",
    description: "Clean, hygienic look with calming cyan tones.",
    layout: "classic-sidebar-left",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Rubik",
      fontFamilyBody: "Rubik",
      primaryColor: "#0891b2", // Cyan
      secondaryColor: "#06b6d4",
      sidebarBackgroundColor: "#ecfeff",
      headerBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  // =================================================================
  // GROUP 5: ACADEMIC & RESEARCH (CV Style, Content Heavy)
  // =================================================================

  21: createConfig({
    id: 21,
    name: "University Professor",
    description: "Traditional academic CV layout focused on publications.",
    layout: "minimal-clean",
    hasPhoto: false,
    styles: {
      fontFamilyHeading: "Georgia",
      fontFamilyBody: "Verdana",
      primaryColor: "#7f1d1d", // Dark Red
      secondaryColor: "#991b1b",
      sidebarBackgroundColor: "#ffffff",
      headerBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "square",
      sectionSpacing: "compact",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  22: createConfig({
    id: 22,
    name: "Researcher",
    description: "Modern academic style with a tech-forward feel.",
    layout: "modern-grid",
    hasPhoto: false,
    styles: {
      fontFamilyHeading: "IBM Plex Serif",
      fontFamilyBody: "IBM Plex Sans",
      primaryColor: "#134e4a", // Teal Dark
      secondaryColor: "#115e59",
      sidebarBackgroundColor: "#ffffff",
      headerBackgroundColor: "#f0fdfa",
      separatorStyle: "dot",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  // =================================================================
  // GROUP 6: UNIQUE & HYBRID (Distinctive Geometries)
  // =================================================================

  23: createConfig({
    id: 23,
    name: "The Architect",
    description: "Precise geometry with a heavy left border.",
    layout: "classic-sidebar-left",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Barlow",
      fontFamilyBody: "Barlow",
      primaryColor: "#000000",
      secondaryColor: "#262626",
      sidebarBackgroundColor: "#d4d4d4", // Gray sidebar
      headerBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "square",
      sectionSpacing: "spacious",
      entryBorder: true,
      uppercaseHeadings: true
    }
  }),

  24: createConfig({
    id: 24,
    name: "Content Creator",
    description: "Warm, inviting, and personal.",
    layout: "artistic-banner",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Dosis",
      fontFamilyBody: "Open Sans",
      primaryColor: "#b45309", // Amber
      secondaryColor: "#d97706",
      headerBackgroundColor: "#fffbeb",
      sidebarBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "blob",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: false
    }
  }),

  25: createConfig({
    id: 25,
    name: "Real Estate Agent",
    description: "Professional gold accents with a photo focus.",
    layout: "classic-sidebar-left",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Cinzel", // Luxury font
      fontFamilyBody: "Lato",
      primaryColor: "#854d0e", // Gold/Bronze
      secondaryColor: "#a16207",
      sidebarBackgroundColor: "#1c1917", // Dark Background
      headerBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  26: createConfig({
    id: 26,
    name: "Tech Minimalist",
    description: "Monospaced accents for a coding-centric look.",
    layout: "minimal-clean",
    hasPhoto: false,
    styles: {
      fontFamilyHeading: "Space Mono",
      fontFamilyBody: "Space Grotesk",
      primaryColor: "#16a34a", // Matrix Green
      secondaryColor: "#22c55e",
      sidebarBackgroundColor: "#ffffff",
      headerBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "square",
      sectionSpacing: "comfortable",
      entryBorder: true,
      uppercaseHeadings: false
    }
  }),

  27: createConfig({
    id: 27,
    name: "The Strategist",
    description: "Two-column grid with a floating header card.",
    layout: "modern-grid",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Libre Baskerville",
      fontFamilyBody: "Source Sans Pro",
      primaryColor: "#4c1d95", // Deep Violet
      secondaryColor: "#5b21b6",
      sidebarBackgroundColor: "#ffffff",
      headerBackgroundColor: "#f3e8ff",
      separatorStyle: "thick-bar",
      photoShape: "circle",
      sectionSpacing: "spacious",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  28: createConfig({
    id: 28,
    name: "Junior Developer",
    description: "Clean, fresh, and eager. Focus on skills.",
    layout: "classic-sidebar-right",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Poppins",
      fontFamilyBody: "Inter",
      primaryColor: "#f43f5e", // Rose
      secondaryColor: "#fb7185",
      sidebarBackgroundColor: "#fff1f2",
      headerBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "rounded-square",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),

  29: createConfig({
    id: 29,
    name: "The Freelancer",
    description: "Modern, borderless, and highly scannable.",
    layout: "modern-stacked",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "DM Sans",
      fontFamilyBody: "DM Sans",
      primaryColor: "#0284c7",
      secondaryColor: "#0ea5e9",
      headerBackgroundColor: "#ffffff",
      sidebarBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "circle",
      sectionSpacing: "spacious",
      entryBorder: true,
      uppercaseHeadings: true
    }
  }),

  30: createConfig({
    id: 30,
    name: "Global Executive II",
    description: "The ultimate corporate layout with silver/gray accents.",
    layout: "artistic-banner",
    hasPhoto: true,
    styles: {
      fontFamilyHeading: "Playfair Display",
      fontFamilyBody: "Open Sans",
      primaryColor: "#374151",
      secondaryColor: "#6b7280",
      headerBackgroundColor: "#f3f4f6",
      sidebarBackgroundColor: "#ffffff",
      separatorStyle: "none",
      photoShape: "square",
      sectionSpacing: "spacious",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),
  // === GROUP 7: TIMELINE SERIES ===
  31: createConfig({
    id: 31,
    name: "The Chrono Structure",
    description: "A precision-aligned timeline layout with a central spine and icon markers.",
    layout: "timeline-vertical",
    hasPhoto: false, // Image shows text header, but we can support photo if needed
    styles: {
      fontFamilyHeading: "Montserrat", // Matches the geometric sans-serif in image
      fontFamilyBody: "Open Sans",
      primaryColor: "#2d3748", // Dark Slate/Charcoal from image
      secondaryColor: "#4a5568",
      sidebarBackgroundColor: "#ffffff", // It's white, not colored
      headerBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: true
    }
  }),
  32: createConfig({
    id: 32,
    name: "The Executive Curve",
    description: "Features a distinctive curved header and footer in the sidebar with a skill rating system.",
    layout: "curved-sidebar",
    hasPhoto: false, 
    styles: {
      fontFamilyHeading: "Lato",
      fontFamilyBody: "Lato",
      primaryColor: "#003b5c", // Deep Navy from image
      secondaryColor: "#334155",
      sidebarBackgroundColor: "#f1f5f9", // Very light gray-blue
      headerBackgroundColor: "#ffffff",
      separatorStyle: "line",
      photoShape: "circle",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: false
    }
  }),
  33: createConfig({
    id: 33,
    name: "The Slate Medical",
    description: "Professional medical layout with progress bars for skills and a clean slate header.",
    layout: "bar-sidebar-right",
    hasPhoto: false, 
    styles: {
      fontFamilyHeading: "Roboto", // Clean sans-serif
      fontFamilyBody: "Roboto",
      primaryColor: "#333d4b", // Dark Slate (Gunmetal)
      secondaryColor: "#4a5568",
      sidebarBackgroundColor: "#ffffff",
      headerBackgroundColor: "#333d4b", // Matches primary
      separatorStyle: "line",
      photoShape: "square",
      sectionSpacing: "comfortable",
      entryBorder: false,
      uppercaseHeadings: false
    }
  }),
};

export const getDefaultConfig = (id: number): TemplateConfig => {
  return TEMPLATE_CONFIGS[id] || TEMPLATE_CONFIGS[1];
};