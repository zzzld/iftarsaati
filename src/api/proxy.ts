export default async function handler(req, res) {
  const { city } = req.query;

  try {
    const response = await fetch(`https://www.iftarsaati.net/api.php?city=${city}`);
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'API request failed' });
  }
}

