import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1974') no-repeat center center/cover;
`;

const FormBox = styled.div`
  background: rgba(0, 0, 0, 0.85);
  padding: 40px;
  border-radius: 10px;
  width: 400px;
  color: white;
  backdrop-filter: blur(5px);
`;

const Title = styled.h2`
  text-align: center;
  color: var(--primary);
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #444;
  background: #2d3748;
  color: white;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
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
  
  &:hover {
    background: #d97706;
  }
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 15px;
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

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            alert('Login Successful');
            
            // Redirect based on role
            if (res.data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
            window.location.reload();
        } catch (err) {
            alert(err.response?.data?.msg || 'Login Failed');
        }
    };

    return (
        <Container>
            <FormBox>
                <Title>Login</Title>
                <form onSubmit={handleSubmit}>
                    <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <Button type="submit">Login</Button>
                </form>
                
                <LinkContainer>
                    <StyledLink to="/forgot-password">Forgot Password?</StyledLink>
                </LinkContainer>
            </FormBox>
        </Container>
    );
};

export default Login;
