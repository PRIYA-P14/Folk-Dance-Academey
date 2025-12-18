import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { resolveUrl, getFallbackByName } from '../utils/imageUtils';

const Card = styled.div`
  background: #2d3748;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  color: var(--primary);
  font-size: 1.3rem;
`;

const Type = styled.p`
  margin: 5px 0;
  color: #10b981;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Info = styled.p`
  margin: 5px 0;
  color: #a0aec0;
  font-size: 0.9rem;
`;

const Description = styled.p`
  margin: 10px 0;
  color: #cbd5e0;
  font-size: 0.85rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const FeeInfo = styled.p`
  margin: 10px 0;
  color: var(--primary);
  font-weight: bold;
  font-size: 1.1rem;
`;

const ViewButton = styled(Link)`
  display: block;
  text-align: center;
  background: var(--primary);
  color: white;
  padding: 10px;
  margin-top: 15px;
  border-radius: 5px;
  font-weight: bold;
  
  &:hover {
    background: #d97706;
  }
`;

const ClassCard = ({ danceClass }) => {
  const PLACEHOLDER = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80';

  const getFallbackByName = (cls) => {
    const name = (cls?.className || '').toLowerCase();
    const type = (cls?.danceType || '').toLowerCase();
    const pick = (url) => url || PLACEHOLDER;
    if (name.includes('theru') || type.includes('theru')) return pick('https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=800&q=80');
    if (name.includes('mayil') || type.includes('mayil')) return pick('https://www.nruthyashakti.com/images/nsda-folk-dance-Mayilattam.jpg');
    if (name.includes('poi') || type.includes('poi')) return pick('https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&w=800&q=80');
    if (name.includes('kummi') || type.includes('kummi')) return pick('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3DvQNQIUqPbLuOY2Y5U5XrHwY7GLRNqpCVA&s');
    if (name.includes('oyi') || type.includes('oyi')) return pick('https://www.dakshinachitra.net/images/cer01.jpg');
    if (name.includes('karag') || type.includes('karag')) return pick('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhWSBJhPWlFo3mkC4LFWwMy-1nUt1aBBREaQ&s');
    return PLACEHOLDER;
  };

  const resolveUrl = (url) => {
    if (!url || !url.trim()) return PLACEHOLDER;
    let trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    const base = 'http://localhost:5000';
    // Normalize common relative inputs
    let path = trimmed;
    // If a Windows path was pasted (e.g., C:\\images\\pic.jpg), use just the filename
    if (/^[a-zA-Z]:\\/.test(path) || path.includes('\\')) {
      const parts = path.split('\\');
      path = parts[parts.length - 1];
    }
    if (path.startsWith('public/')) path = '/' + path; // -> /public/...
    if (!path.startsWith('/')) {
      // Assume files are served from /public when a bare filename is given
      path = `/public/${path}`;
    }
    // Encode path segments to handle spaces and unicode
    const encoded = path
      .split('/')
      .map((seg, idx) => (idx === 0 && seg === '' ? '' : encodeURIComponent(seg)))
      .join('/');
    return `${base}${encoded}`;
  };

  const base = 'http://localhost:5000';
  const initialSrc = useMemo(() => resolveUrl(danceClass.image), [danceClass.image]);
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [triedAltPath, setTriedAltPath] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  return (
    <Card>
      <Image
        src={imgSrc}
        alt={danceClass.className}
        onError={() => {
          if (imgSrc !== PLACEHOLDER) {
            // Try alternative '/public/images/...' layout once before placeholder
            try {
              const url = new URL(imgSrc);
              if (!triedAltPath && url.origin === base && url.pathname.startsWith('/public/') && !url.pathname.startsWith('/public/images/')) {
                const alt = `${base}/public/images/${url.pathname.replace('/public/','')}`;
                console.warn('Retrying image with /public/images path:', alt);
                setTriedAltPath(true);
                setImgSrc(alt);
                return;
              }
            } catch {}
            if (!usedFallback) {
              const fb = getFallbackByName(danceClass);
              setUsedFallback(true);
              console.warn('Image failed; applying dance fallback:', fb);
              setImgSrc(fb);
              return;
            }
            console.warn('Image failed to load, falling back placeholder:', imgSrc);
            setImgSrc(PLACEHOLDER);
          }
        }}
      />
            <Content>
                <Title>{danceClass.className}</Title>
                <Type>📍 {danceClass.danceType}</Type>
                <Info>👨‍🏫 Instructor: {danceClass.instructor}</Info>
                <Info>⏱️ Duration: {danceClass.duration}</Info>
                <Description>{danceClass.description}</Description>
                <FeeInfo>💰 ₹{danceClass.fees}</FeeInfo>
                <ViewButton to={`/classes/${danceClass._id}`}>View Full Details</ViewButton>
            </Content>
        </Card>
    );
};

export default ClassCard;
