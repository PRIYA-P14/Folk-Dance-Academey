import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

const PasswordStrength = styled.div`
  margin-top: 8px;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  background: rgba(251, 146, 60, 0.1);
  color: #fbbf24;
`;

function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showPassword, setShowPassword] = useState(false);

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*]/.test(password)) strength++;
        
        return strength;
    };

    const passwordStrength = getPasswordStrength(formData.password);
    const strengthText = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][passwordStrength - 1] || '';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (!token) {
            setMessage({ type: 'error', text: 'Invalid or missing reset token. Please request a new password reset.' });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match!' });
            return;
        }

        if (formData.password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters long!' });
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
                token,
                password: formData.password
            });
            setMessage({ type: 'success', text: response.data.msg || 'Password reset successfully!' });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Failed to reset password. Link may have expired.';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <FormBox>
                <Title>Reset Password</Title>
                <Subtitle>Create a new strong password for your account</Subtitle>
                
                {message.text && (
                    <Message className={message.type}>{message.text}</Message>
                )}

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>New Password</Label>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter new password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {formData.password && (
                            <PasswordStrength>
                                Strength: <strong>{strengthText}</strong>
                            </PasswordStrength>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>Confirm Password</Label>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px', gap: '8px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                        />
                        <label style={{ color: '#cbd5e0', cursor: 'pointer', margin: 0 }}>Show Password</label>
                    </div>

                    <Button type="submit" disabled={loading || !token}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            </FormBox>
        </Container>
    );
}

export default ResetPassword;
