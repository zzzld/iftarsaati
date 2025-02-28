
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Moon, Sun, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PrayerCard from "@/components/PrayerCard";
import { turkishCities } from "@/utils/cities";
import { formatDate, getHijriDate } from "@/utils/dateUtils";
import { fetchPrayerTimes, PrayerTimeData } from "@/services/prayerTimesService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import ThemeToggle from "@/components/ThemeToggle";
import CitySelector from "@/components/CitySelector";
import ReminderSettings from "@/components/ReminderSettings";
import CalendarView from "@/components/CalendarView";
import SocialShare from "@/components/SocialShare";
import LanguageSelector from "@/components/LanguageSelector";
import RamadanSpecialDays from "@/components/RamadanSpecialDays";
import { Helmet } from "react-helmet";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("ISTANBUL");
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeData[]>([]);
  const [todayTimes, setTodayTimes] = useState<PrayerTimeData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const { toast } = useToast();
  
  // URL'den şehir parametresini al
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    if (cityParam && turkishCities.some(city => city.value === cityParam)) {
      setSelectedCity(cityParam);
    }
  }, []);

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // API'ye istek at
        const data = await fetchPrayerTimes(selectedCity);
        
        if (!data || data.length === 0) {
          throw new Error("Namaz vakitleri alınamadı, veri bulunamadı.");
        }
        
        setPrayerTimes(data);
        
        if (data && data.length > 0) {
          setTodayTimes(data[0]);
        }
        
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        
        // Hata bildirimini göster
        toast({
          title: "API Bağlantı Hatası",
          description: "Şu anda gerçek veriler alınamıyor. Geçici olarak örnek veriler kullanılıyor.",
          variant: "destructive",
          duration: 5000,
        });
        
        // Mock veriler yüklenmiş olabilir, onu kontrol et
        if (prayerTimes.length > 0) {
          setTodayTimes(prayerTimes[0]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // Şehir değiştiğinde URL'yi güncelle (history API ile)
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('city', selectedCity);
    window.history.pushState({}, '', newUrl.toString());
    
  }, [selectedCity, toast]);

  useEffect(() => {
    if (todayTimes) {
      calculateTimeRemaining();
      const timer = setInterval(calculateTimeRemaining, 1000);
      return () => clearInterval(timer);
    }
  }, [todayTimes, currentTime]);

  const calculateTimeRemaining = () => {
    if (!todayTimes) return;

    const now = currentTime;
    const [hours, minutes] = todayTimes.aksam.split(":").map(Number);
    
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

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  // SEO için meta bilgileri
  const selectedCityObj = turkishCities.find(city => city.value === selectedCity);
  const cityLabel = selectedCityObj?.label || "Türkiye";
  const pageTitle = `${cityLabel} İftar Saati 2024 - ${cityLabel} İftar ve Sahur Vakitleri`;
  const pageDescription = `${cityLabel} için 2024 Ramazan ayı iftar ve sahur vakitleri, imsakiye, namaz saatleri. ${cityLabel} iftar saati: ${todayTimes?.aksam || "yükleniyor"}, imsak: ${todayTimes?.imsak || "yükleniyor"}.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://iftarsaati.net/?city=${selectedCity}`} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        {/* Schema.org structurated data for each city */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Ana Sayfa",
                "item": "https://iftarsaati.net/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "${cityLabel} İftar Vakitleri",
                "item": "https://iftarsaati.net/?city=${selectedCity}"
              }
            ]
          }
        `}</script>
        
        {todayTimes && (
          <script type="application/ld+json">{`
            {
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "${cityLabel} İftar Vakti",
              "startDate": "${new Date().toISOString().split('T')[0]}T${todayTimes.aksam}:00",
              "endDate": "${new Date().toISOString().split('T')[0]}T${todayTimes.aksam}:00",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": "${cityLabel}, Türkiye",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "${cityLabel}",
                  "addressCountry": "TR"
                }
              },
              "description": "${cityLabel} için bugün (${formatDate(new Date())}) iftar vakti: ${todayTimes.aksam}, imsak vakti: ${todayTimes.imsak}",
              "organizer": {
                "@type": "Organization",
                "name": "İftarsaati.net",
                "url": "https://iftarsaati.net"
              }
            }
          `}</script>
        )}
        
        {/* FAQs Schema */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "${cityLabel} iftar saati kaçta?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "${cityLabel} için bugün iftar saati ${todayTimes?.aksam || 'yükleniyor...'}"
                }
              },
              {
                "@type": "Question",
                "name": "${cityLabel} imsak saati kaçta?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "${cityLabel} için bugün imsak saati ${todayTimes?.imsak || 'yükleniyor...'}"
                }
              },
              {
                "@type": "Question",
                "name": "${cityLabel} için iftar ve sahur vakitleri nasıl hesaplanır?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "İftar ve sahur vakitleri, güneşin doğuş ve batış zamanlarına göre hesaplanır. İftar vakti güneşin batışı, imsak (sahur) vakti ise fecr-i sadığın (gerçek fecrin) başlangıcıdır. Bu hesaplamalar Diyanet İşleri Başkanlığı tarafından yapılmaktadır."
                }
              }
            ]
          }
        `}</script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9] dark:from-[#1a3b2e] dark:to-[#102720] transition-colors duration-500">
        <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
          {/* Header with theme toggle and language selector */}
          <div className="flex justify-end gap-2 mb-4">
            <ThemeToggle />
            <LanguageSelector />
          </div>
          
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <img 
                src="/lovable-uploads/bb62668f-01fa-4c5d-bda8-0b8800979b55.png" 
                alt="İftar Saati Logo" 
                className="h-16 md:h-20"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(currentTime)}</span>
              </div>
              <div className="hidden md:block text-gray-400">•</div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Moon className="w-5 h-5 mr-2" />
                <span>{todayTimes?.hicri_tarih || getHijriDate()}</span>
              </div>
            </div>
            
            <div className="mb-8">
              <CitySelector
                selectedCity={selectedCity}
                onCityChange={handleCityChange}
              />
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-center flex-wrap gap-2 mb-8">
              <ReminderSettings todayTimes={todayTimes} city={selectedCity} />
              <CalendarView prayerTimes={prayerTimes} />
              <SocialShare
                city={turkishCities.find(c => c.value === selectedCity)?.label || selectedCity}
                todayTimes={todayTimes ? { imsak: todayTimes.imsak, aksam: todayTimes.aksam } : null}
              />
              <RamadanSpecialDays />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800 dark:border-green-400"></div>
            </div>
          ) : (
            <>
              <Card className="mb-8 p-6 md:p-10 bg-white/80 dark:bg-[#2e463b]/80 backdrop-blur-md border border-green-200 dark:border-green-900 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="text-center">
                  <h2 className="text-xl font-medium text-[#558b2f] dark:text-[#aed581] mb-2 flex items-center justify-center">
                    <Moon className="w-5 h-5 mr-2 text-[#558b2f] dark:text-[#aed581]" />
                    İftar Vakti
                  </h2>
                  <p className="text-4xl md:text-6xl font-bold text-[#33691e] dark:text-white mb-6 pulse-iftar">
                    {todayTimes?.aksam || "Yükleniyor..."}
                  </p>
                  
                  {timeRemaining && (
                    <div className="mt-8">
                      <h3 className="text-sm font-medium text-[#558b2f] dark:text-[#aed581] mb-3">
                        İftara Kalan Süre
                      </h3>
                      <div className="flex justify-center gap-4">
                        <div className="flex flex-col items-center">
                          <span className="text-3xl font-bold text-[#33691e] dark:text-white">
                            {String(timeRemaining.hours).padStart(2, '0')}
                          </span>
                          <span className="text-xs text-[#558b2f] dark:text-[#aed581]">Saat</span>
                        </div>
                        <div className="text-3xl font-bold text-[#33691e] dark:text-white">:</div>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl font-bold text-[#33691e] dark:text-white">
                            {String(timeRemaining.minutes).padStart(2, '0')}
                          </span>
                          <span className="text-xs text-[#558b2f] dark:text-[#aed581]">Dakika</span>
                        </div>
                        <div className="text-3xl font-bold text-[#33691e] dark:text-white">:</div>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl font-bold text-[#33691e] dark:text-white">
                            {String(timeRemaining.seconds).padStart(2, '0')}
                          </span>
                          <span className="text-xs text-[#558b2f] dark:text-[#aed581]">Saniye</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Tabs defaultValue="today" className="mb-12">
                <TabsList className="w-full grid grid-cols-2 bg-white/70 dark:bg-[#2e463b]/70 border border-green-200 dark:border-green-900 rounded-xl mb-4">
                  <TabsTrigger value="today" className="text-[#558b2f] dark:text-[#aed581]">Bugün</TabsTrigger>
                  <TabsTrigger value="week" className="text-[#558b2f] dark:text-[#aed581]">Haftalık</TabsTrigger>
                </TabsList>
                
                <TabsContent value="today">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="prayer-time-card">
                      <Card className="h-full p-4 bg-white/70 dark:bg-[#2e463b]/70 backdrop-blur-sm border border-green-200 dark:border-green-900 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center">
                          <Sun className="w-5 h-5 text-amber-500 mr-3" />
                          <div>
                            <h3 className="text-sm font-medium text-[#558b2f] dark:text-[#aed581]">İmsak</h3>
                            <p className="text-xl font-bold text-[#33691e] dark:text-white">{todayTimes?.imsak}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="prayer-time-card">
                      <Card className="h-full p-4 bg-white/70 dark:bg-[#2e463b]/70 backdrop-blur-sm border border-green-200 dark:border-green-900 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center">
                          <Sun className="w-5 h-5 text-amber-500 mr-3" />
                          <div>
                            <h3 className="text-sm font-medium text-[#558b2f] dark:text-[#aed581]">Güneş</h3>
                            <p className="text-xl font-bold text-[#33691e] dark:text-white">{todayTimes?.gunes}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="prayer-time-card">
                      <Card className="h-full p-4 bg-white/70 dark:bg-[#2e463b]/70 backdrop-blur-sm border border-green-200 dark:border-green-900 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center">
                          <Sun className="w-5 h-5 text-amber-500 mr-3" />
                          <div>
                            <h3 className="text-sm font-medium text-[#558b2f] dark:text-[#aed581]">Öğle</h3>
                            <p className="text-xl font-bold text-[#33691e] dark:text-white">{todayTimes?.ogle}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="prayer-time-card">
                      <Card className="h-full p-4 bg-white/70 dark:bg-[#2e463b]/70 backdrop-blur-sm border border-green-200 dark:border-green-900 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center">
                          <Sun className="w-5 h-5 text-amber-500 mr-3" />
                          <div>
                            <h3 className="text-sm font-medium text-[#558b2f] dark:text-[#aed581]">İkindi</h3>
                            <p className="text-xl font-bold text-[#33691e] dark:text-white">{todayTimes?.ikindi}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="prayer-time-card">
                      <Card className="h-full p-4 bg-white/70 dark:bg-[#2e463b]/70 backdrop-blur-sm border border-green-200 dark:border-green-900 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center">
                          <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 mr-3" />
                          <div>
                            <h3 className="text-sm font-medium text-[#558b2f] dark:text-[#aed581]">Akşam (İftar)</h3>
                            <p className="text-xl font-bold text-[#33691e] dark:text-white">{todayTimes?.aksam}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="prayer-time-card">
                      <Card className="h-full p-4 bg-white/70 dark:bg-[#2e463b]/70 backdrop-blur-sm border border-green-200 dark:border-green-900 rounded-xl shadow transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center">
                          <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 mr-3" />
                          <div>
                            <h3 className="text-sm font-medium text-[#558b2f] dark:text-[#aed581]">Yatsı</h3>
                            <p className="text-xl font-bold text-[#33691e] dark:text-white">{todayTimes?.yatsi}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="week">
                  <div className="bg-white/70 dark:bg-[#2e463b]/70 backdrop-blur-sm border border-green-200 dark:border-green-900 rounded-xl p-4 overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className="border-b border-green-200 dark:border-green-900">
                          <th className="p-2 text-left text-[#558b2f] dark:text-[#aed581]">Tarih</th>
                          <th className="p-2 text-center text-[#558b2f] dark:text-[#aed581]">İmsak</th>
                          <th className="p-2 text-center text-[#558b2f] dark:text-[#aed581]">Güneş</th>
                          <th className="p-2 text-center text-[#558b2f] dark:text-[#aed581]">Öğle</th>
                          <th className="p-2 text-center text-[#558b2f] dark:text-[#aed581]">İkindi</th>
                          <th className="p-2 text-center text-[#558b2f] dark:text-[#aed581]">Akşam</th>
                          <th className="p-2 text-center text-[#558b2f] dark:text-[#aed581]">Yatsı</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prayerTimes.map((time, index) => (
                          <tr key={index} className="border-b border-green-100 dark:border-green-800">
                            <td className="p-2 text-left">
                              <div className="font-medium text-[#33691e] dark:text-white">{time.miladi_tarih}</div>
                              <div className="text-xs text-[#558b2f] dark:text-[#aed581]">{time.hicri_tarih}</div>
                            </td>
                            <td className="p-2 text-center text-[#33691e] dark:text-white">{time.imsak}</td>
                            <td className="p-2 text-center text-[#33691e] dark:text-white">{time.gunes}</td>
                            <td className="p-2 text-center text-[#33691e] dark:text-white">{time.ogle}</td>
                            <td className="p-2 text-center text-[#33691e] dark:text-white">{time.ikindi}</td>
                            <td className="p-2 text-center font-bold text-[#33691e] dark:text-white">{time.aksam}</td>
                            <td className="p-2 text-center text-[#33691e] dark:text-white">{time.yatsi}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>

              <PrayerCard />
              
              {/* SEO için görünmeyen şehir içerik bağlantıları */}
              <div className="hidden">
                <h2>{cityLabel} İftar Saati</h2>
                <p>{cityLabel} için iftar saati: {todayTimes?.aksam}, imsak saati: {todayTimes?.imsak}</p>
                <p>{cityLabel} Ramazan İmsakiyesi 2024 - {formatDate(currentTime)} {todayTimes?.hicri_tarih}</p>
              </div>
              
              {/* İlgili şehirler (SEO için) - 81 il hepsi */}
              <div className="mt-16">
                <h2 className="text-xl text-[#33691e] dark:text-[#aed581] mb-4 text-center">Diğer Şehirler İçin İftar Vakitleri</h2>
                <div className="flex flex-wrap justify-center gap-2">
                  {turkishCities.map((city) => (
                    <Button
                      key={city.value}
                      variant="outline"
                      size="sm"
                      className="text-[#558b2f] dark:text-[#aed581] border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900"
                      onClick={() => handleCityChange(city.value)}
                    >
                      {city.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Footer için SEO içeriği */}
              <footer className="mt-16 text-center text-sm text-gray-600 dark:text-gray-400">
                <p>İftarsaati.net - Türkiye'nin en güncel iftar ve sahur vakitleri</p>
                <p className="mt-1">
                  &copy; {new Date().getFullYear()} İftarsaati.net - Tüm hakları saklıdır
                </p>
              </footer>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
