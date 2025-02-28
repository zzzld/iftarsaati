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
    const response = await fetch(`/api?city=${encodeURIComponent(city)}`);
    
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
    return [];
  }
};
