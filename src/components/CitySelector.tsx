
import { useState, useEffect } from "react";
import { Check, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { turkishCities } from "@/utils/cities";
import { toast } from "@/components/ui/use-toast";

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CitySelector = ({ selectedCity, onCityChange }: CitySelectorProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    // Favorileri local storage'dan al
    const storedFavorites = localStorage.getItem("favoriteCities");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = () => {
    const newFavorites = [...favorites];
    const index = newFavorites.indexOf(selectedCity);
    
    if (index === -1) {
      newFavorites.push(selectedCity);
      toast({
        title: "Favori eklendi",
        description: `${turkishCities.find(c => c.value === selectedCity)?.label} favorilere eklendi.`,
      });
    } else {
      newFavorites.splice(index, 1);
      toast({
        title: "Favori kaldırıldı",
        description: `${turkishCities.find(c => c.value === selectedCity)?.label} favorilerden kaldırıldı.`,
      });
    }
    
    setFavorites(newFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(newFavorites));
  };

  const getClosestCity = (lat: number, lon: number) => {
    // Gerçek uygulamada, en yakın şehri belirleme için daha karmaşık bir algoritma kullanılabilir
    // Bu basit bir örnek olarak ISTANBUL'u döndüreceğiz
    return "ISTANBUL";
  };

  const detectLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Hata",
        description: "Tarayıcınız konum özelliğini desteklemiyor.",
        variant: "destructive",
      });
      setIsGettingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const closestCity = getClosestCity(latitude, longitude);
        onCityChange(closestCity);
        toast({
          title: "Konum algılandı",
          description: `Konumunuza en yakın şehir seçildi: ${turkishCities.find(c => c.value === closestCity)?.label}`,
        });
        setIsGettingLocation(false);
      },
      (error) => {
        toast({
          title: "Konum hatası",
          description: "Konumunuz alınamadı. Lütfen manuel olarak şehir seçin.",
          variant: "destructive",
        });
        setIsGettingLocation(false);
      }
    );
  };

  const isFavorite = favorites.includes(selectedCity);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="w-64 bg-white/90 dark:bg-[#2e463b]/90 backdrop-blur-sm border border-green-200 dark:border-green-900 rounded-full">
            <SelectValue placeholder="Şehir seçiniz" />
          </SelectTrigger>
          <SelectContent className="max-h-80 bg-white dark:bg-[#2e463b] border-green-200 dark:border-green-900">
            {favorites.length > 0 && (
              <>
                <div className="px-2 py-1.5 text-sm font-medium text-[#33691e] dark:text-[#aed581]">
                  Favoriler
                </div>
                {favorites.map((cityValue) => {
                  const city = turkishCities.find((c) => c.value === cityValue);
                  return (
                    <SelectItem 
                      key={`fav-${cityValue}`} 
                      value={cityValue}
                      className="flex items-center"
                    >
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 mr-2 text-amber-500" fill="currentColor" />
                        {city?.label}
                      </div>
                    </SelectItem>
                  );
                })}
                <div className="h-px bg-green-100 dark:bg-green-800 my-1" />
                <div className="px-2 py-1.5 text-sm font-medium text-[#33691e] dark:text-[#aed581]">
                  Tüm Şehirler
                </div>
              </>
            )}
            {turkishCities.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full 
            ${
              isFavorite
                ? "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700"
                : "bg-white/80 dark:bg-[#2e463b]/80 border-green-200 dark:border-green-900"
            }`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Favorilerden kaldır" : "Favorilere ekle"}
        >
          <Star
            className={`h-5 w-5 ${
              isFavorite
                ? "text-amber-500"
                : "text-gray-400 dark:text-gray-500"
            }`}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 dark:bg-[#2e463b]/80 border-green-200 dark:border-green-900"
          onClick={detectLocation}
          disabled={isGettingLocation}
          aria-label="Konumumu bul"
        >
          {isGettingLocation ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          ) : (
            <MapPin className="h-5 w-5 text-[#33691e] dark:text-[#aed581]" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CitySelector;
