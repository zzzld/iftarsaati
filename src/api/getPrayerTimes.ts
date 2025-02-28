import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  const { city } = req.query;

  try {
    const response = await fetch(`https://www.iftarsaati.net/api.php?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (!data.status) {
      return res.status(400).json({ error: data.error || 'Error fetching prayer times' });
    }

    return res.status(200).json(data.data);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching prayer times', details: error.message });
  }
};
