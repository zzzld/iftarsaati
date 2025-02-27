
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Sistem tercihine göre başlangıç temasını belirle
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-white/80 dark:bg-[#2e463b]/80 border border-green-200 dark:border-green-900"
      onClick={toggleTheme}
      aria-label="Temayı değiştir"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-amber-500" />
      ) : (
        <Moon className="h-5 w-5 text-[#33691e]" />
      )}
    </Button>
  );
};

export default ThemeToggle;
