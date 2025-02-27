
import { useState } from "react";
import { Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SpecialDay {
  date: string;
  hijriDate: string;
  title: string;
  description: string;
  isToday: boolean;
}

const RamadanSpecialDays = () => {
  // Örnek özel günler (gerçek uygulamada bu veriler API'den alınabilir)
  const specialDays: SpecialDay[] = [
    {
      date: "11 Mart 2024",
      hijriDate: "1 Ramazan 1445",
      title: "Ramazan Başlangıcı",
      description: "Ramazan ayının ilk günü. İlk oruç günü.",
      isToday: false,
    },
    {
      date: "17 Mart 2024",
      hijriDate: "7 Ramazan 1445",
      title: "Regaib Kandili",
      description: "Ramazan'ın ilk cuma gecesi, Regaib Kandili olarak kutlanır.",
      isToday: false,
    },
    {
      date: "23 Mart 2024",
      hijriDate: "13 Ramazan 1445",
      title: "Berat Kandili",
      description: "Günahlardan arınma ve af dilenme gecesi olarak bilinir.",
      isToday: true,
    },
    {
      date: "3 Nisan 2024",
      hijriDate: "24 Ramazan 1445",
      title: "Kadir Gecesi",
      description: "Bin aydan daha hayırlı olduğu belirtilen mübarek gece.",
      isToday: false,
    },
    {
      date: "9 Nisan 2024",
      hijriDate: "30 Ramazan 1445",
      title: "Ramazan Bayramı Arifesi",
      description: "Ramazan Bayramı'ndan önceki gün.",
      isToday: false,
    },
    {
      date: "10 Nisan 2024",
      hijriDate: "1 Şevval 1445",
      title: "Ramazan Bayramı (1. Gün)",
      description: "Ramazan Bayramı'nın ilk günü.",
      isToday: false,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 dark:bg-[#2e463b]/80 border-green-200 dark:border-green-900"
          aria-label="Ramazan Özel Günleri"
        >
          <Calendar className="h-5 w-5 text-[#33691e] dark:text-[#aed581]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-[#1e3a2a] border-green-200 dark:border-green-900 max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#33691e] dark:text-[#aed581] text-xl">
            Ramazan Özel Günleri
          </DialogTitle>
          <DialogDescription>
            1445 Hicri yılı Ramazan ayının özel günleri
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {specialDays.map((day, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${
                day.isToday
                  ? "border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20"
                  : "border-green-200 dark:border-green-800"
              }`}
            >
              <div className="flex items-start gap-3">
                {day.isToday && (
                  <Star className="h-5 w-5 text-amber-500 mt-0.5" fill="currentColor" />
                )}
                <div>
                  <h3 className="font-medium text-[#33691e] dark:text-[#aed581]">
                    {day.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>{day.date}</span>
                    <span className="mx-2">•</span>
                    <span>{day.hijriDate}</span>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                    {day.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RamadanSpecialDays;
