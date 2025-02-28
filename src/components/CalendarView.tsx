
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/utils/dateUtils";
import { PrayerTimeData } from "@/services/prayerTimesService";

interface CalendarViewProps {
  prayerTimes: PrayerTimeData[];
}

const CalendarView = ({ prayerTimes }: CalendarViewProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<PrayerTimeData | null>(null);

  // prayerTimes değiştiğinde seçili değerleri sıfırla
  useEffect(() => {
    if (date) {
      handleSelect(date);
    }
  }, [prayerTimes]);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    
    setDate(selectedDate);
    
    const formattedDate = format(selectedDate, "dd.MM.yyyy", { locale: tr });
    setSelectedDate(formattedDate);
    
    // Seçilen tarihe ait namaz vakitlerini bul
    let dayTimes = null;
    
    try {
      dayTimes = prayerTimes.find(time => {
        // API'den gelen tarih formatını kontrol et
        if (!time.miladi_tarih) return false;
        
        const dateParts = time.miladi_tarih.split('.');
        if (dateParts.length === 3) {
          const day = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10);
          const year = parseInt(dateParts[2], 10);
          
          return (
            day === selectedDate.getDate() &&
            month === selectedDate.getMonth() + 1 &&
            year === selectedDate.getFullYear()
          );
        }
        return false;
      });
    } catch (error) {
      console.error("Error finding prayer times for selected date:", error);
      dayTimes = null;
    }
    
    setSelectedTimes(dayTimes || null);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 dark:bg-[#2e463b]/80 border-green-200 dark:border-green-900"
          aria-label="Takvim"
        >
          <CalendarIcon className="h-5 w-5 text-[#33691e] dark:text-[#aed581]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white dark:bg-[#1e3a2a] border-green-200 dark:border-green-900">
        <div className="p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            locale={tr}
            className="rounded-md border border-green-100 dark:border-green-800"
            classNames={{
              day_selected: "bg-[#33691e] text-white hover:bg-[#558b2f] focus:bg-[#558b2f]",
              day_today: "bg-green-100 dark:bg-green-900 text-[#33691e] dark:text-[#aed581]",
            }}
            // 7 günlük bir aralık göster (API verileriyle uyumlu olacak şekilde)
            fromDate={new Date()}
            toDate={(() => {
              const endDate = new Date();
              endDate.setDate(endDate.getDate() + 6);
              return endDate;
            })()}
          />
        </div>
        
        {selectedTimes ? (
          <div className="p-3 pt-0">
            <h3 className="font-medium text-[#33691e] dark:text-[#aed581] mb-2">
              {selectedDate} Namaz Vakitleri
            </h3>
            <div className="text-sm grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">İmsak:</span>
                <span className="font-medium text-[#33691e] dark:text-white">{selectedTimes.imsak}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Güneş:</span>
                <span className="font-medium text-[#33691e] dark:text-white">{selectedTimes.gunes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Öğle:</span>
                <span className="font-medium text-[#33691e] dark:text-white">{selectedTimes.ogle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">İkindi:</span>
                <span className="font-medium text-[#33691e] dark:text-white">{selectedTimes.ikindi}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Akşam:</span>
                <span className="font-medium text-[#33691e] dark:text-white">{selectedTimes.aksam}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Yatsı:</span>
                <span className="font-medium text-[#33691e] dark:text-white">{selectedTimes.yatsi}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 pt-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Seçilen tarih için namaz vakti bilgisi bulunamadı.
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CalendarView;
