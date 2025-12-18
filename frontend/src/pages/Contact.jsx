import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { createContact } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 100px 5%;
  min-height: 100vh;
  background: #1a202c;
  color: white;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--primary);
  font-size: 2.5rem;
  margin-bottom: 15px;
  text-align: center;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #cbd5e0;
  font-size: 1.1rem;
  margin-bottom: 50px;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Form = styled.form`
  background: #2d3748;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: var(--primary);
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: #1a202c;
  border: 2px solid #4a5568;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  background: #1a202c;
  border: 2px solid #4a5568;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 12px 30px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: #f59e0b;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  }
  &:disabled {
    background: #4a5568;
    cursor: not-allowed;
    transform: none;
  }
`;
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const InfoCard = styled.div`
  background: #2d3748;
  padding: 30px;
  border-radius: 10px;
  border-left: 4px solid var(--primary);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;
const InfoTitle = styled.h3`
  color: var(--primary);
  font-size: 1.3rem;
  margin-bottom: 10px;
`;
const InfoText = styled.p`
  color: #cbd5e0;
  font-size: 1rem;
  line-height: 1.6;
`;
const InfoLink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
  &:hover {
    color: #f59e0b;
  }
`;
const SuccessMessage = styled.div`
  background: #10b981;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;
const ErrorMessage = styled.div`
  background: #ef4444;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;
const AdminMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid #ef4444;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  color: #ef4444;
  margin-top: 20px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  p {
    color: #cbd5e0;
    line-height: 1.6;
    margin-bottom: 10px;
  }

  button {
    margin-top: 20px;
    padding: 12px 30px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #d97706;
      transform: translateY(-2px);
    }
  }
`;

function Contact() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is admin
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setError('Please fill in all fields');
      return;
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      // Send data to backend
      await createContact(formData);
      setSubmitted(true);
      setError('');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send message. Please try again.');
      console.error('Contact form error:', err);
    }
  };

  return (
    <Container>
      <Content>
        <Title>Contact Us</Title>
        <Subtitle>
          Have questions? We'd love to hear from you. Get in touch with our team today!
        </Subtitle>

        {isAdmin && (
          <AdminMessage>
            <h3>⚠️ Admin Access Restricted</h3>
            <p>
              You are logged in as an administrator. Admins cannot submit contact forms.
            </p>
            <p>
              To view contact messages from users, please go to your Admin Dashboard.
            </p>
            <button onClick={() => navigate('/admin')}>Go to Admin Dashboard</button>
          </AdminMessage>
        )}

        {!isAdmin && (
        <MainGrid>
          {/* Contact Form */}
          <Form onSubmit={handleSubmit}>
            {submitted && <SuccessMessage>✅ Message sent successfully! We'll get back to you soon.</SuccessMessage>}
            {error && <ErrorMessage>❌ {error}</ErrorMessage>}
            
            <FormGroup>
              <Label>Full Name *</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </FormGroup>
            <FormGroup>
              <Label>Email Address *</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number *</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
              />
            </FormGroup>
            <FormGroup>
              <Label>Subject *</Label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
              />
            </FormGroup>
            <FormGroup>
              <Label>Message *</Label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
              />
            </FormGroup>

            <Button type="submit">Send Message</Button>
          </Form>
          {/* Contact Information */}
          <ContactInfo>
            <InfoCard>
              <InfoTitle>📍 Visit Us</InfoTitle>
              <InfoText>
                Folk Dance Academy<br />
                123 Cultural Street<br />
                Chennai, Tamil Nadu 600001<br />
                India
              </InfoText>
            </InfoCard>

            <InfoCard>
              <InfoTitle>📞 Call Us</InfoTitle>
              <InfoText>
                Main Office: <InfoLink href="tel:+918123456789">+91 8123 456 789</InfoLink><br />
                Email: <InfoLink href="mailto:info@folkdance.com">info@folkdance.com</InfoLink><br />
                Support: <InfoLink href="tel:+919876543210">+91 9876 543 210</InfoLink>
              </InfoText>
            </InfoCard>

            <InfoCard>
              <InfoTitle>🕐 Office Hours</InfoTitle>
              <InfoText>
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed<br />
                <br />
                Holidays: Closed
              </InfoText>
            </InfoCard>

            <InfoCard>
              <InfoTitle>🌐 Follow Us</InfoTitle>
              <InfoText>
                <InfoLink href="https://facebook.com" target="_blank">Facebook</InfoLink> | 
                <InfoLink href="https://instagram.com" target="_blank"> Instagram</InfoLink> | 
                <InfoLink href="https://twitter.com" target="_blank"> Twitter</InfoLink> | 
                <InfoLink href="https://youtube.com" target="_blank"> YouTube</InfoLink>
              </InfoText>
            </InfoCard>
          </ContactInfo>
        </MainGrid>
        )}

        {/* FAQs Section - Visible to everyone */}
        <InfoCard id="faq" style={{ marginTop: '50px' }}>
          <InfoTitle style={{ fontSize: '1.5rem', marginBottom: '20px' }}>❓ Frequently Asked Questions</InfoTitle>
          <div style={{ marginBottom: '20px' }}>
            <InfoTitle style={{ fontSize: '1.1rem', color: '#cbd5e0', marginBottom: '10px' }}>
              What age groups do you teach?
            </InfoTitle>
            <InfoText>
              We offer classes for children (5+), teens, adults, and seniors. Each age group has specialized instruction tailored to their needs.
            </InfoText>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InfoTitle style={{ fontSize: '1.1rem', color: '#cbd5e0', marginBottom: '10px' }}>
              Do I need prior dance experience?
            </InfoTitle>
            <InfoText>
              No prior experience is required! Our beginner classes start from the basics. We welcome students of all levels.
            </InfoText>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <InfoTitle style={{ fontSize: '1.1rem', color: '#cbd5e0', marginBottom: '10px' }}>
              What if I want to schedule a private class?
            </InfoTitle>
            <InfoText>
              Yes, we offer private sessions! Please contact us directly to discuss your requirements and schedule.
            </InfoText>
          </div>

          <div>
            <InfoTitle style={{ fontSize: '1.1rem', color: '#cbd5e0', marginBottom: '10px' }}>
              Do you offer trial classes?
            </InfoTitle>
            <InfoText>
              Absolutely! We offer a free trial class. Visit us or contact our office to book your trial session.
            </InfoText>
          </div>
        </InfoCard>
      </Content>
    </Container>
  );
}

export default Contact;
