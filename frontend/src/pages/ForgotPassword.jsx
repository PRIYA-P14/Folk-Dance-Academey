import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1974') no-repeat center center/cover;
  padding: 20px;
`;

const FormBox = styled.div`
  background: rgba(0, 0, 0, 0.85);
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  color: white;
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  text-align: center;
  color: var(--primary);
  margin-bottom: 10px;
  font-size: 1.8rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #cbd5e0;
  margin-bottom: 25px;
  font-size: 0.95rem;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  color: #cbd5e0;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #444;
  background: #2d3748;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 8px rgba(251, 146, 60, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #d97706;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(251, 146, 60, 0.3);
  }

  &:disabled {
    background: #4a5568;
    cursor: not-allowed;
    transform: none;
  }
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #4a5568;
`;

const StyledLink = styled(Link)`
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
  
  &:hover {
    color: #fbbf24;
  }
`;

const Message = styled.div`
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 500;
  
  &.success {
    background: rgba(16, 185, 129, 0.2);
    color: #10b981;
    border: 1px solid #10b981;
  }
  
  &.error {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 1px solid #ef4444;
  }
  
  &.info {
    background: rgba(59, 130, 246, 0.2);
    color: #3b82f6;
    border: 1px solid #3b82f6;
  }
`;

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage({ type: 'success', text: response.data.msg || 'Password reset link sent to your email!' });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Failed to process request. Please try again.';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <FormBox>
                <Title>Forgot Password?</Title>
                <Subtitle>Enter your email to receive a password reset link</Subtitle>
                
                {message.text && (
                    <Message className={message.type}>{message.text}</Message>
                )}

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Email Address</Label>
                        <Input
                            type="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>

                <LinkContainer>
                    <p style={{ color: '#cbd5e0', marginBottom: '10px' }}>Remember your password?</p>
                    <StyledLink to="/login">Back to Login</StyledLink>
                    <span style={{ color: '#4a5568', margin: '0 10px' }}>|</span>
                    <StyledLink to="/register">Create New Account</StyledLink>
                </LinkContainer>
            </FormBox>
        </Container>
    );
}

export default ForgotPassword;
