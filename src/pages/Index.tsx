
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Moon, Sun, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PrayerCard from "@/components/PrayerCard";
import { turkishCities } from "@/utils/cities";
import { formatDate } from "@/utils/dateUtils";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("istanbul");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would call an API
        // For now, we'll use mock data
        const mockData = {
          fajr: "05:30",
          sunrise: "07:15",
          dhuhr: "13:00",
          asr: "16:30",
          maghrib: "19:45", // Iftar time
          isha: "21:15",
          date: new Date().toISOString(),
        };
        
        setPrayerTimes(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setIsLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [selectedCity]);

  useEffect(() => {
    if (prayerTimes) {
      calculateTimeRemaining();
      const timer = setInterval(calculateTimeRemaining, 1000);
      return () => clearInterval(timer);
    }
  }, [prayerTimes, currentTime]);

  const calculateTimeRemaining = () => {
    if (!prayerTimes) return;

    const now = currentTime;
    const [hours, minutes] = prayerTimes.maghrib.split(":").map(Number);
    
    const iftarTime = new Date(now);
    iftarTime.setHours(hours, minutes, 0, 0);

    // If iftar time has passed for today, don't show countdown
    if (now > iftarTime) {
      setTimeRemaining(null);
      return;
    }

    const diff = iftarTime.getTime() - now.getTime();
    
    const hoursRemaining = Math.floor(diff / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeRemaining({
      hours: hoursRemaining,
      minutes: minutesRemaining,
      seconds: secondsRemaining
    });
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-light mb-4 text-gray-900 dark:text-white">
            İftar Saati
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {formatDate(currentTime)}
          </p>
          
          <div className="flex justify-center mb-8">
            <Select value={selectedCity} onValueChange={handleCityChange}>
              <SelectTrigger className="w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full">
                <SelectValue placeholder="Şehir seçiniz" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {turkishCities.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        ) : (
          <>
            <Card className="mb-8 p-6 md:p-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="text-center">
                <h2 className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center justify-center">
                  <Moon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
                  İftar Vakti
                </h2>
                <p className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-6">
                  {prayerTimes?.maghrib}
                </p>
                
                {timeRemaining && (
                  <div className="mt-8">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      İftara Kalan Süre
                    </h3>
                    <div className="flex justify-center gap-4">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-light text-gray-900 dark:text-white">
                          {String(timeRemaining.hours).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Saat</span>
                      </div>
                      <div className="text-3xl font-light text-gray-400">:</div>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-light text-gray-900 dark:text-white">
                          {String(timeRemaining.minutes).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Dakika</span>
                      </div>
                      <div className="text-3xl font-light text-gray-400">:</div>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-light text-gray-900 dark:text-white">
                          {String(timeRemaining.seconds).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Saniye</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <div className="prayer-time-card">
                <Card className="h-full p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center">
                    <Sun className="w-5 h-5 text-amber-500 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sabah</h3>
                      <p className="text-xl font-light text-gray-900 dark:text-white">{prayerTimes?.fajr}</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="prayer-time-card">
                <Card className="h-full p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center">
                    <Sun className="w-5 h-5 text-amber-500 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Güneş</h3>
                      <p className="text-xl font-light text-gray-900 dark:text-white">{prayerTimes?.sunrise}</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="prayer-time-card">
                <Card className="h-full p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center">
                    <Sun className="w-5 h-5 text-amber-500 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Öğle</h3>
                      <p className="text-xl font-light text-gray-900 dark:text-white">{prayerTimes?.dhuhr}</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="prayer-time-card">
                <Card className="h-full p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center">
                    <Sun className="w-5 h-5 text-amber-500 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">İkindi</h3>
                      <p className="text-xl font-light text-gray-900 dark:text-white">{prayerTimes?.asr}</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="prayer-time-card">
                <Card className="h-full p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center">
                    <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Akşam (İftar)</h3>
                      <p className="text-xl font-light text-gray-900 dark:text-white">{prayerTimes?.maghrib}</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="prayer-time-card">
                <Card className="h-full p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center">
                    <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Yatsı</h3>
                      <p className="text-xl font-light text-gray-900 dark:text-white">{prayerTimes?.isha}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <PrayerCard />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
