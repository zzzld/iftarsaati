
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
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
    <Card className="p-6 md:p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800 dark:text-white mb-4">
          Günün Duası
        </h2>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
            {prayer.title}
          </h3>
          <div
            className={cn(
              "text-gray-600 dark:text-gray-300 overflow-hidden transition-all duration-500",
              isExpanded ? "max-h-[1000px]" : "max-h-24"
            )}
          >
            <p className="text-base leading-relaxed">
              {prayer.content}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
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
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
          {prayer.source}
        </p>
      </div>
    </Card>
  );
};

export default PrayerCard;
