import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1920') no-repeat center center/cover;
`;

const FormBox = styled.div`
  background: rgba(0, 0, 0, 0.88);
  padding: 40px;
  border-radius: 12px;
  width: 420px;
  color: white;
  backdrop-filter: blur(6px);
  box-shadow: 0 10px 35px rgba(0,0,0,0.45);
`;

const Title = styled.h2`
  text-align: center;
  color: var(--primary);
  margin-bottom: 10px;
`;

const Sub = styled.p`
  text-align: center;
  color: #cbd5e0;
  margin-bottom: 20px;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 6px;
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
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 18px;
  cursor: pointer;
  
  &:hover {
    background: #d97706;
  }
`;

const Error = styled.p`
  color: #f87171;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.4);
  padding: 10px 12px;
  border-radius: 6px;
  margin-bottom: 12px;
`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser(formData);
      if (res.data.user.role !== 'admin') {
        setError('This portal is for admins only.');
        return;
      }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Welcome, Admin');
      navigate('/admin');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <Container>
      <FormBox>
        <Title>Admin Login</Title>
        <Sub>Access the admin panel to manage classes, enrollments, and payments.</Sub>
        {error && <Error>{error}</Error>}
        <form onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="Admin email" onChange={handleChange} required />
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <Button type="submit">Login as Admin</Button>
        </form>
      </FormBox>
    </Container>
  );
};

export default AdminLogin;
