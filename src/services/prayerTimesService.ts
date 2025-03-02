
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

// Fallback data for 2025 (January)
const fallbackData: Record<string, PrayerTimeData[]> = {
  "ISTANBUL": [
    {
      miladi_tarih: "01.01.2025",
      hicri_tarih: "30.06.1446",
      imsak: "06:35",
      gunes: "08:07",
      ogle: "13:03",
      ikindi: "15:23",
      aksam: "17:44",
      yatsi: "19:09"
    },
    {
      miladi_tarih: "02.01.2025",
      hicri_tarih: "01.07.1446",
      imsak: "06:35",
      gunes: "08:07",
      ogle: "13:03",
      ikindi: "15:24",
      aksam: "17:45",
      yatsi: "19:09"
    },
    {
      miladi_tarih: "03.01.2025",
      hicri_tarih: "02.07.1446",
      imsak: "06:36",
      gunes: "08:07",
      ogle: "13:04",
      ikindi: "15:24",
      aksam: "17:46",
      yatsi: "19:10"
    },
    {
      miladi_tarih: "04.01.2025",
      hicri_tarih: "03.07.1446",
      imsak: "06:36",
      gunes: "08:07",
      ogle: "13:04",
      ikindi: "15:25",
      aksam: "17:47",
      yatsi: "19:11"
    },
    {
      miladi_tarih: "05.01.2025",
      hicri_tarih: "04.07.1446",
      imsak: "06:36",
      gunes: "08:07",
      ogle: "13:05",
      ikindi: "15:26",
      aksam: "17:48",
      yatsi: "19:12"
    },
    {
      miladi_tarih: "06.01.2025",
      hicri_tarih: "05.07.1446",
      imsak: "06:36",
      gunes: "08:07",
      ogle: "13:05",
      ikindi: "15:27",
      aksam: "17:49",
      yatsi: "19:13"
    },
    {
      miladi_tarih: "07.01.2025",
      hicri_tarih: "06.07.1446",
      imsak: "06:36",
      gunes: "08:07",
      ogle: "13:06",
      ikindi: "15:28",
      aksam: "17:50",
      yatsi: "19:14"
    }
  ],
  "ANKARA": [
    {
      miladi_tarih: "01.01.2025",
      hicri_tarih: "30.06.1446",
      imsak: "06:29",
      gunes: "07:59",
      ogle: "12:54",
      ikindi: "15:13",
      aksam: "17:34",
      yatsi: "18:59"
    },
    {
      miladi_tarih: "02.01.2025",
      hicri_tarih: "01.07.1446",
      imsak: "06:29",
      gunes: "07:59",
      ogle: "12:55",
      ikindi: "15:14",
      aksam: "17:35",
      yatsi: "19:00"
    },
    {
      miladi_tarih: "03.01.2025",
      hicri_tarih: "02.07.1446",
      imsak: "06:29",
      gunes: "07:59",
      ogle: "12:55",
      ikindi: "15:15",
      aksam: "17:36",
      yatsi: "19:00"
    },
    {
      miladi_tarih: "04.01.2025",
      hicri_tarih: "03.07.1446",
      imsak: "06:29",
      gunes: "07:59",
      ogle: "12:56",
      ikindi: "15:16",
      aksam: "17:37",
      yatsi: "19:01"
    },
    {
      miladi_tarih: "05.01.2025",
      hicri_tarih: "04.07.1446",
      imsak: "06:29",
      gunes: "07:59",
      ogle: "12:56",
      ikindi: "15:17",
      aksam: "17:38",
      yatsi: "19:02"
    },
    {
      miladi_tarih: "06.01.2025",
      hicri_tarih: "05.07.1446",
      imsak: "06:29",
      gunes: "07:58",
      ogle: "12:57",
      ikindi: "15:18",
      aksam: "17:39",
      yatsi: "19:03"
    },
    {
      miladi_tarih: "07.01.2025",
      hicri_tarih: "06.07.1446",
      imsak: "06:29",
      gunes: "07:58",
      ogle: "12:57",
      ikindi: "15:19",
      aksam: "17:40",
      yatsi: "19:04"
    }
  ],
  "IZMIR": [
    {
      miladi_tarih: "01.01.2025",
      hicri_tarih: "30.06.1446",
      imsak: "06:48",
      gunes: "08:17",
      ogle: "13:15",
      ikindi: "15:38",
      aksam: "17:57",
      yatsi: "19:21"
    },
    {
      miladi_tarih: "02.01.2025",
      hicri_tarih: "01.07.1446",
      imsak: "06:48",
      gunes: "08:17",
      ogle: "13:16",
      ikindi: "15:39",
      aksam: "17:58",
      yatsi: "19:22"
    },
    {
      miladi_tarih: "03.01.2025",
      hicri_tarih: "02.07.1446",
      imsak: "06:48",
      gunes: "08:17",
      ogle: "13:16",
      ikindi: "15:40",
      aksam: "17:59",
      yatsi: "19:23"
    },
    {
      miladi_tarih: "04.01.2025",
      hicri_tarih: "03.07.1446",
      imsak: "06:48",
      gunes: "08:17",
      ogle: "13:17",
      ikindi: "15:40",
      aksam: "18:00",
      yatsi: "19:23"
    },
    {
      miladi_tarih: "05.01.2025",
      hicri_tarih: "04.07.1446",
      imsak: "06:49",
      gunes: "08:17",
      ogle: "13:17",
      ikindi: "15:41",
      aksam: "18:01",
      yatsi: "19:24"
    },
    {
      miladi_tarih: "06.01.2025",
      hicri_tarih: "05.07.1446",
      imsak: "06:49",
      gunes: "08:17",
      ogle: "13:18",
      ikindi: "15:42",
      aksam: "18:02",
      yatsi: "19:25"
    },
    {
      miladi_tarih: "07.01.2025",
      hicri_tarih: "06.07.1446",
      imsak: "06:49",
      gunes: "08:17",
      ogle: "13:18",
      ikindi: "15:43",
      aksam: "18:03",
      yatsi: "19:26"
    }
  ]
};

// Add more cities as needed to fallbackData

export const fetchPrayerTimes = async (city: string): Promise<PrayerTimeData[]> => {
  try {
    // First try using the original API endpoint
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/api.awoken.com.tr/diyanet.php?city=${encodeURIComponent(city)}`);
      const data = await response.json();
      
      console.log(city, data);
      
      if (data.status) {
        return data.data;
      }
      // If the API returns false status, proceed to fallback
    } catch (error) {
      console.error("Primary API failed:", error);
      // Proceed to fallback
    }
    
    // Fallback to local data
    console.log(`Using fallback data for ${city}`);
    const cityUppercase = city.toUpperCase();
    
    if (fallbackData[cityUppercase]) {
      return fallbackData[cityUppercase];
    } else {
      // If the requested city is not in our fallback data, return Istanbul data
      console.log(`No fallback data for ${city}, using Istanbul data instead`);
      return fallbackData["ISTANBUL"];
    }
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return [];
  }
};
