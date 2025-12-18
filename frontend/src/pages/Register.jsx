import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1516475429286-465d815a0df4?q=80&w=1780') no-repeat center center/cover;
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

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser(formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            alert('Registration Successful');
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.msg || 'Registration Failed');
        }
    };

    return (
        <Container>
            <FormBox>
                <Title>Register</Title>
                <form onSubmit={handleSubmit}>
                    <Input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                    <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <Button type="submit">Register</Button>
                </form>
            </FormBox>
        </Container>
    );
};

export default Register;
