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
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.iftarsaati.net/api.php?city=${encodeURIComponent(city)}`);    
    const data = await response.json();
    
	console.log(city, data)
    if (!data.status) {
      throw new Error(data.error || 'Error fetching prayer times');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return [];
  }
};
