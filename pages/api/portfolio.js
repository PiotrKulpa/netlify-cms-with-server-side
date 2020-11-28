var Airtable = require('airtable');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base('apppv5xeZ1bAJdvLy');

export default async function handler(req, res) {
  const result = await base('Portfolio Gallery').select({
    view: 'Grid view',
  }).firstPage();
  const data = result.map((record) => {
    return {
      name: record.get('name'),
      alt: record.get('alt'),
      attachments: record.get('attachments'),
      description: record.get('description'),
      link: record.get('link')
    }
  });
  res.json(data)
}