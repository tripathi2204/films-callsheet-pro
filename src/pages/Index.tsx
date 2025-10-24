import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CallSheetGenerator from "@/components/CallSheetGenerator";

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="print:hidden">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
      </div>
      <div id="call-sheet-generator">
        <CallSheetGenerator />
      </div>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
