
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
  // 2025 yılı için başlangıç tarihi oluştur
  const startDate = new Date(2025, 0, 1); // 1 Ocak 2025
  const result = [];
  
  // 7 günlük namaz vakti bilgisi oluşturalım - gerçekçi saatler ile
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    
    // Tarihi Türkçe formatta oluştur (gün.ay.yıl)
    const formattedDate = `${day.getDate().toString().padStart(2, '0')}.${(day.getMonth() + 1).toString().padStart(2, '0')}.${day.getFullYear()}`;
    
    // Örnek hicri tarih - gerçek hesaplama gerektirir
    const hicriDay = i + 1;
    const hicriDate = `${hicriDay} Muharrem 1446`; // 2025 yılının başında muhtemelen 1446 hicri yılı
    
    // İstanbul için gerçeğe yakın namaz vakitleri (Ocak 2025)
    result.push({
      miladi_tarih: formattedDate,
      hicri_tarih: hicriDate,
      imsak: `06:${(48 + i % 5).toString().padStart(2, '0')}`,
      gunes: `08:${(16 + i % 5).toString().padStart(2, '0')}`,
      ogle: `13:${(i % 5).toString().padStart(2, '0')}`,
      ikindi: `15:${(43 + i % 5).toString().padStart(2, '0')}`,
      aksam: `17:${(55 + i % 5).toString().padStart(2, '0')}`,
      yatsi: `19:${(27 + i % 5).toString().padStart(2, '0')}`,
    });
  }
  
  return result;
};
