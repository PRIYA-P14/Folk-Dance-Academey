const PLACEHOLDER = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=90';

export const getFallbackByName = (cls) => {
  const name = (cls?.className || '').toLowerCase();
  const type = (cls?.danceType || '').toLowerCase();
  const pick = (url) => url || PLACEHOLDER;
  if (name.includes('theru') || type.includes('theru')) return pick('https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=1000&q=80');
  if (name.includes('mayil') || type.includes('mayil')) return pick('https://www.nruthyashakti.com/images/nsda-folk-dance-Mayilattam.jpg');
  if (name.includes('poi') || type.includes('poi')) return pick('https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&w=1000&q=80');
  if (name.includes('kummi') || type.includes('kummi')) return pick('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3DvQNQIUqPbLuOY2Y5U5XrHwY7GLRNqpCVA&s');
  if (name.includes('oyi') || type.includes('oyi')) return pick('https://www.dakshinachitra.net/images/cer01.jpg');
  if (name.includes('karag') || type.includes('karag')) return pick('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhWSBJhPWlFo3mkC4LFWwMy-1nUt1aBBREaQ&s');
  return PLACEHOLDER;
};

export const resolveUrl = (url) => {
  if (!url || !String(url).trim()) return PLACEHOLDER;
  let trimmed = String(url).trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const base = 'http://localhost:5000';
  // If Windows path pasted (e.g., C:\\pics\\img.jpg), keep only the filename
  if (/^[a-zA-Z]:\\/.test(trimmed) || trimmed.includes('\\')) {
    const parts = trimmed.split('\\');
    trimmed = parts[parts.length - 1];
  }
  // Normalize relative inputs
  if (trimmed.startsWith('public/')) trimmed = '/' + trimmed; // -> /public/...
  if (!trimmed.startsWith('/')) trimmed = `/public/${trimmed}`;
  const encoded = trimmed
    .split('/')
    .map((seg, idx) => (idx === 0 && seg === '' ? '' : encodeURIComponent(seg)))
    .join('/');
  return `${base}${encoded}`;
};
