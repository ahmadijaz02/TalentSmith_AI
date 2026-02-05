import FloatingNavbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero"; // <--- IMPORT THE NEW COMPONENT
import About from "./components/About";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    // Base container: Dark Navy background with slate text
    <div className="relative min-h-screen w-full bg-[#0F172A] text-slate-300 overflow-x-hidden selection:bg-[#0EA5E9] selection:text-white">
      
      {/* --- Ambient Background Effects --- */}
      {/* 1. Subtle Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Radial gradient to fade out grid at edges */}
        <div className="absolute inset-0 bg-[#0F172A] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black_100%)]"></div>
      </div>

      {/* 2. Top Glow (Spotlight effect for the Navbar & Hero) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0EA5E9]/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* --- Navigation --- */}
      <FloatingNavbar />

      {/* --- Main Content Area --- */}
      <main className="relative z-10 w-full px-4 md:px-6 pt-32">
        
        {/* The New Hero Component */}
        <Hero />
        <About />
        <Pricing />
        <Footer />

      </main>

    </div>
  );
}