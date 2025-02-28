
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
    // API endpoint
    const response = await fetch(`/index.php?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching prayer times: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.status) {
      throw new Error(data.error || 'Error fetching prayer times');
    }
    
    return data.data;
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
  
  // 7 günlük namaz vakti bilgisi oluşturalım - gerçekçi saatler ile
  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);
    
    // Tarihi Türkçe formatta oluştur (gün.ay.yıl)
    const formattedDate = `${day.getDate().toString().padStart(2, '0')}.${(day.getMonth() + 1).toString().padStart(2, '0')}.${day.getFullYear()}`;
    
    // Örnek hicri tarih - gerçek hesaplama gerektirir
    const hicriDay = i + 1;
    const hicriDate = `${hicriDay} Ramazan 1445`;
    
    // İstanbul için gerçeğe yakın namaz vakitleri (Mayıs 2024)
    result.push({
      miladi_tarih: formattedDate,
      hicri_tarih: hicriDate,
      imsak: `03:${48 + i % 5}`,
      gunes: `05:${36 + i % 5}`,
      ogle: `13:${(i % 5).toString().padStart(2, '0')}`,
      ikindi: `16:${53 + i % 5}`,
      aksam: `20:${15 + i % 5}`,
      yatsi: `21:${57 + i % 5}`,
    });
  }
  
  return result;
};
