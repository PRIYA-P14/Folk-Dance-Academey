import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 1rem;
    flex-wrap: wrap;
  }
`;

const Logo = styled.h1`
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    flex-basis: 100%;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  font-weight: 500;
  transition: color 0.3s;
  
  &:hover {
    color: var(--primary);
  }
`;

const Button = styled(Link)`
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
  
  &:hover {
    background-color: #d97706;
  }
`;

const LogoutButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  
  &:hover {
    background-color: #dc2626;
  }
`;

const UserName = styled.span`
  color: var(--primary);
  margin-right: 1rem;
  font-weight: bold;
`;

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser(null);
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <Nav>
            <Logo>Folk Dance</Logo>
            <MenuToggle onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? '✕' : '☰'}
            </MenuToggle>
            <NavLinks isOpen={menuOpen}>
                <StyledLink to="/" onClick={() => setMenuOpen(false)}>Home</StyledLink>
                <StyledLink to="/classes" onClick={() => setMenuOpen(false)}>Classes</StyledLink>
                <StyledLink to="/about" onClick={() => setMenuOpen(false)}>About</StyledLink>
                <StyledLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</StyledLink>
                {user && user.role === 'admin' && (
                    <StyledLink to="/admin" onClick={() => setMenuOpen(false)}>Admin Dashboard</StyledLink>
                )}
                {user && user.role === 'user' && (
                    <StyledLink to="/dashboard" onClick={() => setMenuOpen(false)}>User Dashboard</StyledLink>
                )}
            </NavLinks>
            <div>
                {user ? (
                    <>
                        <UserName>👋 {user.name}</UserName>
                        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                    </>
                ) : (
                    <>
                  <StyledLink to="/login" style={{ marginRight: '1rem' }}>Login</StyledLink>
                  <StyledLink to="/admin-login" style={{ marginRight: '1rem' }}>Admin Login</StyledLink>
                  <Button to="/register">Register</Button>
                    </>
                )}
            </div>
        </Nav>
    );
};

export default Navbar;
