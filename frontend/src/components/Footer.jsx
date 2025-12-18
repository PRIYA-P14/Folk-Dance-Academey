import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #111827 0%, #0b1220 100%);
  color: #f8fafc;
  padding: 60px 5%;
  margin-top: 80px;

  @media (max-width: 768px) {
    padding: 40px 5%;
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Logo = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Tagline = styled.p`
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(251, 146, 60, 0.2);
  border: 2px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s;

  &:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-3px);
  }
`;

const SectionTitle = styled.h4`
  font-size: 1.2rem;
  color: var(--primary);
  margin-bottom: 5px;
  font-weight: 700;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLink = styled(Link)`
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;

  &:hover {
    color: var(--primary);
  }
`;

const ExternalLink = styled.a`
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;

  &:hover {
    color: var(--primary);
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #d1d5db;
  font-size: 0.95rem;
  line-height: 1.5;

  span {
    font-size: 1.3rem;
    color: var(--primary);
    flex-shrink: 0;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(148, 163, 184, 0.3);
  margin: 30px 0;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #cbd5e1;
  font-size: 0.9rem;
`;

const MadeWith = styled.p`
  color: #cbd5e1;
  font-size: 0.9rem;

  span {
    color: #ef4444;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Brand Section */}
        <Section>
          <Logo>🎵 Folk Dance Academy</Logo>
          <Tagline>
            Preserving and celebrating the rich heritage of Tamil folk dances through authentic learning experiences.
          </Tagline>
          <SocialLinks>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              f
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              📷
            </SocialIcon>
            <SocialIcon href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              ▶️
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              𝕏
            </SocialIcon>
          </SocialLinks>
        </Section>

        {/* Quick Links */}
        <Section>
          <SectionTitle>Quick Links</SectionTitle>
          <LinkList>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/classes">Classes</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </LinkList>
        </Section>

        {/* Legal */}
        <Section>
          <SectionTitle>Legal</SectionTitle>
          <LinkList>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms & Conditions</FooterLink>
            <FooterLink to="/terms#refund">Refund Policy</FooterLink>
            <FooterLink to="/contact#faq">FAQ</FooterLink>
          </LinkList>
        </Section>

        {/* Contact Info */}
        <Section>
          <SectionTitle>Contact Info</SectionTitle>
          <ContactItem>
            <span>📍</span>
            <div>123 Cultural Street, Chennai, Tamil Nadu 600001</div>
          </ContactItem>
          <ContactItem>
            <span>📞</span>
            <ExternalLink href="tel:+918976543210">+91 98765 43210</ExternalLink>
          </ContactItem>
          <ContactItem>
            <span>✉️</span>
            <ExternalLink href="mailto:info@folkdanceacademy.com">info@folkdanceacademy.com</ExternalLink>
          </ContactItem>
        </Section>
      </FooterContent>

      <Divider />

      <FooterBottom>
        <Copyright>© 2024 Folk Dance Academy. All rights reserved.</Copyright>
        <MadeWith>
          Made with <span>❤️</span> for preserving cultural heritage
        </MadeWith>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
