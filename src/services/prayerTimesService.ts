
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
    // Replace with your actual API endpoint
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
  const todayStr = today.toLocaleDateString('tr-TR');
  
  return [
    {
      miladi_tarih: todayStr,
      hicri_tarih: "1 Ramazan 1445",
      imsak: "05:30",
      gunes: "07:15",
      ogle: "13:00",
      ikindi: "16:30",
      aksam: "19:45",
      yatsi: "21:15"
    },
    {
      miladi_tarih: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('tr-TR'),
      hicri_tarih: "2 Ramazan 1445",
      imsak: "05:29",
      gunes: "07:14",
      ogle: "13:00",
      ikindi: "16:31",
      aksam: "19:46",
      yatsi: "21:16"
    },
    {
      miladi_tarih: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('tr-TR'),
      hicri_tarih: "3 Ramazan 1445",
      imsak: "05:28",
      gunes: "07:13",
      ogle: "13:00",
      ikindi: "16:32",
      aksam: "19:47",
      yatsi: "21:17"
    },
    {
      miladi_tarih: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('tr-TR'),
      hicri_tarih: "4 Ramazan 1445",
      imsak: "05:27",
      gunes: "07:12",
      ogle: "13:00",
      ikindi: "16:33",
      aksam: "19:48",
      yatsi: "21:18"
    },
    {
      miladi_tarih: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('tr-TR'),
      hicri_tarih: "5 Ramazan 1445",
      imsak: "05:26",
      gunes: "07:11",
      ogle: "13:00",
      ikindi: "16:34",
      aksam: "19:49",
      yatsi: "21:19"
    },
    {
      miladi_tarih: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('tr-TR'),
      hicri_tarih: "6 Ramazan 1445",
      imsak: "05:25",
      gunes: "07:10",
      ogle: "13:00",
      ikindi: "16:35",
      aksam: "19:50",
      yatsi: "21:20"
    },
    {
      miladi_tarih: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('tr-TR'),
      hicri_tarih: "7 Ramazan 1445",
      imsak: "05:24",
      gunes: "07:09",
      ogle: "13:00",
      ikindi: "16:36",
      aksam: "19:51",
      yatsi: "21:21"
    }
  ];
};
