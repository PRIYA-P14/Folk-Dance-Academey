import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClassCard from '../components/ClassCard';
import { getClasses } from '../services/api';

const Container = styled.div`
  padding: 80px 5%;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h2`
  color: var(--primary);
  font-size: 3rem;
  margin-bottom: 15px;
`;

const Subtitle = styled.p`
  color: #a0aec0;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #a0aec0;
  font-size: 1.2rem;
  margin-top: 50px;
`;

const NoClassesMessage = styled.div`
  text-align: center;
  color: #a0aec0;
  font-size: 1.1rem;
  margin-top: 50px;
  padding: 40px;
  background: #2d3748;
  border-radius: 10px;
`;

const DanceClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getClasses()
            .then(res => {
                setClasses(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <Header>
                <Title>Our Folk Dance Classes</Title>
                <Subtitle>
                    🎭 Discover the rich heritage of Tamil folk dances. Choose from our diverse 
                    collection of traditional dance forms taught by expert instructors. 
                    Each class offers hands-on training and cultural immersion.
                </Subtitle>
            </Header>
            
            {loading ? (
                <LoadingMessage>Loading classes...</LoadingMessage>
            ) : classes.length === 0 ? (
                <NoClassesMessage>
                    No dance classes available at the moment. Please check back later!
                </NoClassesMessage>
            ) : (
                <Grid>
                    {classes.map(cls => (
                        <ClassCard key={cls._id} danceClass={cls} />
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default DanceClasses;
