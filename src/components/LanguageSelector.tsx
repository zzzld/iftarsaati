
import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

const languages = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

const LanguageSelector = () => {
  const [language, setLanguage] = useState("tr");

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    setLanguage(langCode);
    localStorage.setItem("language", langCode);
    
    // Gerçek bir uygulamada bu fonksiyon dil değiştirme işlemlerini yapacaktır
    toast({
      title: "Dil değiştirildi",
      description: `Dil ${languages.find(l => l.code === langCode)?.name} olarak ayarlandı.`,
    });
    
    // Yeniden yükleme yapılabilir veya i18n kütüphanesi kullanılabilir
    // window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 dark:bg-[#2e463b]/80 border-green-200 dark:border-green-900"
          aria-label="Dil seçimi"
        >
          <Globe className="h-5 w-5 text-[#33691e] dark:text-[#aed581]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-[#1e3a2a] border-green-200 dark:border-green-900">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`cursor-pointer ${
              language === lang.code
                ? "bg-green-50 dark:bg-green-900/30 font-medium"
                : ""
            }`}
            onClick={() => changeLanguage(lang.code)}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
