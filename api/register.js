export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const scriptUrl = process.env.VITE_APPS_SCRIPT_URL;
  
  if (!scriptUrl) {
    console.error("Configuration error: VITE_APPS_SCRIPT_URL is undefined");
    return res.status(500).json({ message: 'Configuration error: VITE_APPS_SCRIPT_URL is undefined' });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ message: 'Proxy error', error: error.message });
  }
}
