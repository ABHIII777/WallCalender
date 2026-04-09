import { useState, useEffect } from "react";
import "./App.css"
import CalenderCard from "./ui/CalenderCard";

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? true : false;
  });

  // Sync state to HTML document class so standard Tailwind 'dark:' variants cascade
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div 
      className={`flex min-h-screen w-full items-center justify-center p-4 overflow-hidden relative transition-colors duration-700 ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}
    >
      {/* Lamp Highlight Overlay: Warms the top center of the dark wall */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isDark ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(circle at 50% -20%, rgba(255, 250, 200, 0.3) 0%, rgba(255, 250, 200, 0.05) 50%, transparent 75%)',
        }}
      />

      {/* Modern Floating Theme Switcher */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 px-4 py-2 rounded-full font-medium text-sm backdrop-blur-xl border transition-all duration-300 shadow-md 
        bg-white/50 border-gray-200 text-slate-800 hover:bg-white/80 
        dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800/80"
      >
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>

      <CalenderCard />
    </div>
  );
}
