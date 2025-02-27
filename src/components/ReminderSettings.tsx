
import { useState, useEffect } from "react";
import { Bell, Check, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { PrayerTimeData } from "@/services/prayerTimesService";

interface ReminderSettingsProps {
  todayTimes: PrayerTimeData | null;
  city: string;
}

const ReminderSettings = ({ todayTimes, city }: ReminderSettingsProps) => {
  const [reminders, setReminders] = useState({
    imsak: false,
    sabah: false,
    ogle: false,
    ikindi: false,
    aksam: false,
    yatsi: false,
  });
  const [minutesBefore, setMinutesBefore] = useState(15);

  useEffect(() => {
    // Ayarları local storage'dan al
    const storedReminders = localStorage.getItem("prayerReminders");
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
    
    const storedMinutes = localStorage.getItem("reminderMinutesBefore");
    if (storedMinutes) {
      setMinutesBefore(parseInt(storedMinutes, 10));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem("prayerReminders", JSON.stringify(reminders));
    localStorage.setItem("reminderMinutesBefore", minutesBefore.toString());
    
    // Kullanıcıya bildirim izni iste
    if (Object.values(reminders).some(value => value) && Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          toast({
            title: "Bildirim izni alındı",
            description: "Artık namaz vakitleri için hatırlatma alabilirsiniz.",
          });
        } else {
          toast({
            title: "Bildirim izni reddedildi",
            description: "Hatırlatıcılar için bildirim izni gerekiyor.",
            variant: "destructive",
          });
        }
      });
    }
    
    toast({
      title: "Ayarlar kaydedildi",
      description: "Namaz vakti hatırlatıcıları güncellendi.",
    });
  };

  // Hatırlatıcı demosu
  const showReminderDemo = () => {
    if (Notification.permission === "granted") {
      const notification = new Notification("İftar Vakti Hatırlatıcı", {
        body: `İftar vaktine ${minutesBefore} dakika kaldı.`,
        icon: "/favicon.ico"
      });
      
      setTimeout(() => {
        notification.close();
      }, 5000);
    } else {
      toast({
        title: "Bildirim izni gerekiyor",
        description: "Hatırlatıcılar için tarayıcı bildirim iznini onaylayın.",
        variant: "destructive",
      });
    }
  };

  const toggleReminder = (type: keyof typeof reminders) => {
    setReminders(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 dark:bg-[#2e463b]/80 border-green-200 dark:border-green-900"
          aria-label="Hatırlatıcı ayarları"
        >
          <Bell className="h-5 w-5 text-[#33691e] dark:text-[#aed581]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-[#1e3a2a] border-green-200 dark:border-green-900">
        <DialogHeader>
          <DialogTitle className="text-[#33691e] dark:text-[#aed581]">Namaz Vakti Hatırlatıcıları</DialogTitle>
          <DialogDescription>
            Hatırlatmak istediğiniz namaz vakitlerini seçin.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="imsak" className="text-[#33691e] dark:text-[#aed581] flex items-center gap-2">
              <span>İmsak</span>
              {todayTimes && <span className="text-xs text-gray-500">({todayTimes.imsak})</span>}
            </Label>
            <Switch
              id="imsak"
              checked={reminders.imsak}
              onCheckedChange={() => toggleReminder("imsak")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sabah" className="text-[#33691e] dark:text-[#aed581] flex items-center gap-2">
              <span>Sabah</span>
              {todayTimes && <span className="text-xs text-gray-500">({todayTimes.gunes})</span>}
            </Label>
            <Switch
              id="sabah"
              checked={reminders.sabah}
              onCheckedChange={() => toggleReminder("sabah")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="ogle" className="text-[#33691e] dark:text-[#aed581] flex items-center gap-2">
              <span>Öğle</span>
              {todayTimes && <span className="text-xs text-gray-500">({todayTimes.ogle})</span>}
            </Label>
            <Switch
              id="ogle"
              checked={reminders.ogle}
              onCheckedChange={() => toggleReminder("ogle")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="ikindi" className="text-[#33691e] dark:text-[#aed581] flex items-center gap-2">
              <span>İkindi</span>
              {todayTimes && <span className="text-xs text-gray-500">({todayTimes.ikindi})</span>}
            </Label>
            <Switch
              id="ikindi"
              checked={reminders.ikindi}
              onCheckedChange={() => toggleReminder("ikindi")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="aksam" className="text-[#33691e] dark:text-[#aed581] flex items-center gap-2">
              <span>Akşam (İftar)</span>
              {todayTimes && <span className="text-xs text-gray-500">({todayTimes.aksam})</span>}
            </Label>
            <Switch
              id="aksam"
              checked={reminders.aksam}
              onCheckedChange={() => toggleReminder("aksam")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="yatsi" className="text-[#33691e] dark:text-[#aed581] flex items-center gap-2">
              <span>Yatsı</span>
              {todayTimes && <span className="text-xs text-gray-500">({todayTimes.yatsi})</span>}
            </Label>
            <Switch
              id="yatsi"
              checked={reminders.yatsi}
              onCheckedChange={() => toggleReminder("yatsi")}
            />
          </div>
          <div className="mt-4 border-t pt-4 border-green-100 dark:border-green-800">
            <Label className="text-[#33691e] dark:text-[#aed581] mb-2 block">
              Namaz vaktinden kaç dakika önce hatırlat?
            </Label>
            <div className="flex gap-2">
              {[5, 10, 15, 30, 60].map((minute) => (
                <Button
                  key={minute}
                  variant={minutesBefore === minute ? "default" : "outline"}
                  className={`flex-1 ${
                    minutesBefore === minute
                      ? "bg-[#33691e] dark:bg-[#558b2f] text-white"
                      : "border-green-200 dark:border-green-900 text-[#33691e] dark:text-[#aed581]"
                  }`}
                  onClick={() => setMinutesBefore(minute)}
                >
                  {minute}
                  <span className="ml-1 text-xs">dk</span>
                </Button>
              ))}
            </div>
          </div>
          <Button
            className="mt-2 bg-amber-500 hover:bg-amber-600 text-white"
            onClick={showReminderDemo}
          >
            Hatırlatıcı Dene
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={saveSettings} className="bg-[#33691e] hover:bg-[#558b2f] text-white">
              <Check className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderSettings;
