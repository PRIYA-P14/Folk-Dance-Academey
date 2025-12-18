import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('http://localhost:5000/public/images/back.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  
  @media (max-width: 968px) {
    flex-direction: column;
    justify-content: center;
    height: auto;
    min-height: 90vh;
    padding: 80px 5% 40px;
    text-align: center;
  }
`;

const Content = styled.div`
  max-width: 600px;
  color: white;
  
  @media (max-width: 968px) {
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
  
  span {
    color: var(--primary);
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const SubText = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: var(--primary);
  color: white;
  padding: 12px 30px;
  font-size: 1.2rem;
  border-radius: 30px;
  font-weight: bold;
  display: inline-block;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    background-color: #d97706;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 24px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

// Placeholder for hero images
const HeroImage = styled.div`
  width: 200px;
  height: 300px;
  background-color: #444;
  border-radius: 10px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border: 4px solid var(--primary);
  
  @media (max-width: 768px) {
    width: 150px;
    height: 225px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 250px;
    height: 300px;
  }
`;

const Home = () => {
    return (
        <HeroSection>
            <Content>
                <Heading>Experience the Magic of <span>Traditional Folk Dance</span></Heading>
                <SubText>
                    Immerse yourself in centuries-old Tamil folk traditions. Learn authentic moves from expert instructors and become part of a vibrant cultural community.
                </SubText>
                <PrimaryButton to="/classes">Start Your Journey</PrimaryButton>
            </Content>

            <ImageContainer>
                {/* Right side dancer images as per requirement */}
                <HeroImage src="http://localhost:5000/public/images/back1.jpg" />
                <HeroImage src="http://localhost:5000/public/images/back2.jpg" style={{ marginTop: '50px' }} />
            </ImageContainer>
        </HeroSection>
    );
};

export default Home;
