export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { pageId, permissions } = req.body;

  if (!pageId || !permissions) {
    return res.status(400).json({ message: 'Missing data' });
  }

  try {
    const response = await fetch('https://www.notion.so/api/v3/savePermissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token_v2=${process.env.NOTION_TOKEN}`
      },
      body: JSON.stringify({
        pageId,
        permissions
      })
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
