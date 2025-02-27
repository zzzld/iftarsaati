
interface Prayer {
  title: string;
  content: string;
  source: string;
}

const prayers: Prayer[] = [
  {
    title: "İftar Duası",
    content: "Allahümme leke sumtü ve bike âmentü ve aleyke tevekkeltü ve alâ rızkıke eftartü ve savmel ğadin min şehri ramazâne neyvetü fağfirli mâ kaddemtü ve mâ ehhartü. Allah'ım! Senin için oruç tuttum, sana inandım, sana güvendim, senin verdiğin rızkla orucumu açtım. Ramazan ayının yarınki orucuna da niyet ettim. Benim geçmiş ve gelecek günahlarımı bağışla.",
    source: "Ebu Davud, Savm: 22"
  },
  {
    title: "Sahur Duası",
    content: "Niyet ettim Ya Rabbi senin rızan için Ramazan-ı Şerif orucunu tutmaya. Beni affeyle, beni bağışla, benim orucumu kabul eyle!",
    source: "Tirmizî, Daavat, 105"
  },
  {
    title: "Rahmet Duası",
    content: "Allahümmerhamna bil-Kur'an. Vec'alhü lena imamen ve nûren ve hüden ve rahmeh. Allahümmezekkirna minhü ma nesiyna ve 'allimna minhü ma cehilna verzugna tilâvetehü ânaelleyli ve atrafen-nehari vec'alhü lena hucceten ya Rabbel'âlemin. Allah'ım, bize Kur'an'la rahmet et. Onu bize önder, ışık, hidayet ve rahmet kıl. Allah'ım, ondan unuttuklarımızı bize hatırlat, ondan bilmediklerimizi bize öğret. Gece ve gündüzün belli vakitlerinde onu okumayı bize nasip et ve onu bizim lehimize bir delil kıl, Ey Âlemlerin Rabbi!",
    source: "Ahmed b. Hanbel, Müsned, c. 6, s. 188"
  },
  {
    title: "Teravih Duası",
    content: "Sübhaneke Allahumme ve bi hamdik. Ve tebarükesmük. Ve teala ceddük. Ve celle senaük. Ve la ilahe ğayrük. Allahım! Seni tüm eksikliklerden tenzih ederim. Sana hamd ederim. Senin ismin mübarektir. Senin şanın yücedir. Senin övgün yücedir. Senden başka ilah yoktur.",
    source: "Beyhaki, es-Sünenü'l-Kübra, 2/226"
  },
  {
    title: "Bereket Duası",
    content: "Ya münevvira külle şey'in bi nûrihi ve ya müdebbira külle şey'in bi emrihi ve ya mukaddira külle şey'in bi hikmetihi. Ey nuruyla her şeyi aydınlatan! Ey emriyle her şeyi çekip çeviren! Ey hikmetiyle her şeyi bir ölçüye göre takdir eden!",
    source: "Tirmizi, Daavat, 91"
  },
  {
    title: "Şükür Duası",
    content: "Allahümme salli ve sellim ve barik âlâ seyyidina Muhammedin ve âlâ âli seyyidina Muhammed. Allah'ım, Efendimiz Muhammed'e, Efendimiz Muhammed'in ailesine ve ashabına salât, selâm ve bereketler ihsan eyle.",
    source: "Buhari, Daavat, 31"
  },
  {
    title: "Kadir Gecesi Duası",
    content: "Allahümme inneke afüvvün tühibbül afve fa'fü anni. Allah'ım, şüphesiz sen affedicisin, affetmeyi seversin, beni de affet.",
    source: "Tirmizî, Daavat, 84"
  }
];

/**
 * Gets a daily prayer based on the day of the year
 */
export const getDailyPrayer = (): Prayer => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Use the day of year to cycle through the prayers
  const prayerIndex = dayOfYear % prayers.length;
  
  return prayers[prayerIndex];
};
