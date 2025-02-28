
export interface PrayerTimeData {
  miladi_tarih: string;
  hicri_tarih: string;
  imsak: string;
  gunes: string;
  ogle: string;
  ikindi: string;
  aksam: string;
  yatsi: string;
}

export const fetchPrayerTimes = async (city: string): Promise<PrayerTimeData[]> => {
  try {
    // API endpoint doğrudan hard-coded şeklinde kullanılmış
    // API URL'i gerçek projenizde değiştirilmeli
    // const response = await fetch(`/index.php?city=${encodeURIComponent(city)}`);
    
    // Şimdilik bu API çalışmadığı için mock data kullanalım
    console.log(`API için ${city} şehir bilgisi gönderildi, ancak API çalışmadığı için mock data döndürülüyor`);
    return getMockPrayerTimes();
    
    /* Gerçek API çalıştığında bu kodu kullanın
    const response = await fetch(`https://api-domain.com/prayer-times?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching prayer times: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.status) {
      throw new Error(data.error || 'Error fetching prayer times');
    }
    
    return data.data;
    */
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    // For demo purposes, return mock data when API call fails
    return getMockPrayerTimes();
  }
};

// Mock data for testing when API is not available
const getMockPrayerTimes = (): PrayerTimeData[] => {
  const today = new Date();
  const result = [];
  
  // 7 günlük namaz vakti bilgisi oluşturalım
  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);
    
    // Tarihi Türkçe formatta oluştur (gün.ay.yıl)
    const formattedDate = `${day.getDate().toString().padStart(2, '0')}.${(day.getMonth() + 1).toString().padStart(2, '0')}.${day.getFullYear()}`;
    
    // Örnek hicri tarih - gerçek hesaplama gerektirir
    const hicriDay = i + 1;
    const hicriDate = `${hicriDay} Ramazan 1445`;
    
    // Sahte namaz vakti verileri - her gün biraz değişsin
    result.push({
      miladi_tarih: formattedDate,
      hicri_tarih: hicriDate,
      imsak: `0${4 + Math.floor(i/3)}:${30 - i}`,
      gunes: `0${6 + Math.floor(i/4)}:${15 - i}`,
      ogle: `${12}:${45 + Math.floor(i/2)}`,
      ikindi: `${16}:${10 + i}`,
      aksam: `${19}:${20 + i}`,
      yatsi: `${20}:${50 + i}`,
    });
  }
  
  return result;
};
