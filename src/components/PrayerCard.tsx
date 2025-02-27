
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Book } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDailyPrayer } from "@/utils/prayerUtils";

const PrayerCard = () => {
  const [prayer, setPrayer] = useState({
    title: "",
    content: "",
    source: ""
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const dailyPrayer = getDailyPrayer();
    setPrayer(dailyPrayer);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="p-6 md:p-8 bg-white/80 dark:bg-[#2e463b]/80 backdrop-blur-md border border-green-200 dark:border-green-900 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-[#33691e] dark:text-[#aed581] mb-4 flex items-center justify-center">
          <Book className="w-5 h-5 mr-2 text-[#558b2f] dark:text-[#aed581]" />
          Günün Duası
        </h2>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-[#558b2f] dark:text-[#aed581] mb-2">
            {prayer.title}
          </h3>
          <div
            className={cn(
              "relative text-[#33691e] dark:text-gray-300 overflow-hidden transition-all duration-500",
              isExpanded ? "max-h-[1000px]" : "max-h-24"
            )}
          >
            <p className="text-base leading-relaxed">
              {prayer.content}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-[#2e463b] to-transparent"></div>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-[#558b2f] dark:text-[#aed581] border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900"
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <>
              <span className="mr-1">Daha az göster</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span className="mr-1">Devamını oku</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
        <p className="text-sm text-[#558b2f] dark:text-[#aed581] mt-4 italic">
          {prayer.source}
        </p>
      </div>
    </Card>
  );
};

export default PrayerCard;
