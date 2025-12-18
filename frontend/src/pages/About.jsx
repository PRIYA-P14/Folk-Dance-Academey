import styled from 'styled-components';

const Container = styled.div`
  padding: 100px 5%;
  min-height: 100vh;
  background: #1a202c;
  color: white;
`;

const Section = styled.div`
  max-width: 1200px;
  margin: 0 auto 60px;
`;

const Title = styled.h1`
  color: var(--primary);
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
`;

const Subtitle = styled.h2`
  color: var(--primary);
  font-size: 1.8rem;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #cbd5e0;
  margin-bottom: 15px;
  text-align: justify;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const Card = styled.div`
  background: #2d3748;
  padding: 30px;
  border-radius: 10px;
  border-left: 4px solid var(--primary);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  color: var(--primary);
  font-size: 1.4rem;
  margin-bottom: 15px;
`;

const CardText = styled.p`
  color: #cbd5e0;
  line-height: 1.6;
`;

const HighlightBox = styled.div`
  background: rgba(245, 158, 11, 0.1);
  border-left: 4px solid var(--primary);
  padding: 20px;
  margin: 20px 0;
  border-radius: 5px;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const TeamMember = styled.div`
  text-align: center;
  background: #2d3748;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const MemberName = styled.h4`
  color: var(--primary);
  font-size: 1.3rem;
  margin: 15px 0 5px;
`;

const MemberRole = styled.p`
  color: #cbd5e0;
  margin-bottom: 10px;
`;

const MemberBio = styled.p`
  color: #a0aec0;
  font-size: 0.95rem;
  line-height: 1.6;
`;

function About() {
  return (
    <Container>
      <Section>
        <Title>About Folk Dance Classes</Title>
        <Text style={{ textAlign: 'center', fontSize: '1.2rem' }}>
          Preserving Cultural Heritage Through Traditional Dance
        </Text>
      </Section>

      <Section>
        <Subtitle>Our Mission</Subtitle>
        <Text>
          At Folk Dance Classes, we are dedicated to preserving and promoting the rich heritage of traditional 
          folk dances from various cultures. Our mission is to provide accessible, high-quality dance education 
          that connects students with their cultural roots while fostering creativity, discipline, and community spirit.
        </Text>
        <Text>
          We believe that dance is a universal language that transcends boundaries and brings people together. 
          Through our expertly-led classes, we aim to inspire the next generation of dancers and cultural ambassadors.
        </Text>
      </Section>

      <Section>
        <Subtitle>Our Vision</Subtitle>
        <HighlightBox>
          <Text style={{ marginBottom: 0 }}>
            To become the leading platform for folk dance education, where students not only learn traditional dance forms 
            but also develop a deep appreciation for diverse cultural traditions and create lasting connections with their heritage.
          </Text>
        </HighlightBox>
      </Section>

      <Section>
        <Subtitle>Why Choose Us?</Subtitle>
        <Grid>
          <Card>
            <CardTitle>🎓 Expert Instructors</CardTitle>
            <CardText>
              Our instructors are highly trained professionals with years of experience in traditional dance forms. 
              They bring authentic techniques and cultural knowledge to every class.
            </CardText>
          </Card>
          <Card>
            <CardTitle>📚 Comprehensive Curriculum</CardTitle>
            <CardText>
              From beginner to advanced levels, our structured courses cover various folk dance styles including 
              Theru Koothu, Mayil Attam, Poi Kal Kudhirai, and more.
            </CardText>
          </Card>
          <Card>
            <CardTitle>🤝 Community Focus</CardTitle>
            <CardText>
              We foster a supportive learning environment where students build friendships, share experiences, 
              and grow together as a cultural community.
            </CardText>
          </Card>
          <Card>
            <CardTitle>🎭 Cultural Preservation</CardTitle>
            <CardText>
              Our classes focus on maintaining the authenticity and integrity of traditional dance forms while 
              making them accessible to modern learners.
            </CardText>
          </Card>
          <Card>
            <CardTitle>💪 Holistic Development</CardTitle>
            <CardText>
              Beyond dance skills, students develop physical fitness, mental discipline, confidence, and 
              emotional expression through our programs.
            </CardText>
          </Card>
          <Card>
            <CardTitle>🏆 Performance Opportunities</CardTitle>
            <CardText>
              Students get opportunities to perform at cultural events, festivals, and showcases, gaining real-world 
              stage experience and confidence.
            </CardText>
          </Card>
        </Grid>
      </Section>

      <Section>
        <Subtitle>Our Story</Subtitle>
        <Text>
          Founded in 2015, Folk Dance Classes began as a small initiative by a group of passionate dance enthusiasts 
          who wanted to preserve the traditional dance forms they grew up with. What started as weekend classes in 
          a small community center has grown into a thriving academy with hundreds of students.
        </Text>
        <Text>
          Over the years, we've trained dancers of all ages and backgrounds, organized major cultural events, and 
          collaborated with renowned dance institutions. Our journey reflects our commitment to excellence, authenticity, 
          and community engagement.
        </Text>
        <Text>
          Today, we continue our mission with renewed vigor, reaching more students and spreading awareness about 
          the beauty and significance of traditional folk dances.
        </Text>
      </Section>

      <Section>
        <Subtitle>Our Values</Subtitle>
        <Grid>
          <Card>
            <CardTitle>🎨 Authenticity</CardTitle>
            <CardText>
              We maintain the true essence and techniques of traditional dance forms while adapting to modern learning methods.
            </CardText>
          </Card>
          <Card>
            <CardTitle>📖 Knowledge Sharing</CardTitle>
            <CardText>
              We believe in open knowledge sharing and making quality dance education accessible to everyone regardless of background.
            </CardText>
          </Card>
          <Card>
            <CardTitle>🌟 Excellence</CardTitle>
            <CardText>
              We strive for excellence in everything we do, from instruction quality to student experiences and event organization.
            </CardText>
          </Card>
        </Grid>
      </Section>

      <Section>
        <Subtitle>Our Instructors</Subtitle>
        <TeamGrid>
          <TeamMember>
            <MemberName>Master Ravi Kumar</MemberName>
            <MemberRole>Lead Instructor - Theru Koothu</MemberRole>
            <MemberBio>
              With 25+ years of experience in Theru Koothu, Master Ravi brings authentic techniques and deep cultural knowledge to every class.
            </MemberBio>
          </TeamMember>
          <TeamMember>
            <MemberName>Ms. Geetha Lakshmi</MemberName>
            <MemberRole>Instructor - Mayil Attam & Poi Kal Kudhirai</MemberRole>
            <MemberBio>
              Geetha is a certified instructor with expertise in peacock dance and has trained hundreds of students in traditional forms.
            </MemberBio>
          </TeamMember>
          <TeamMember>
            <MemberName>Mr. Selvam Murugan</MemberName>
            <MemberRole>Instructor - Poi Kal Kudhirai & Traditional Folk</MemberRole>
            <MemberBio>
              Selvam brings an innovative teaching approach while maintaining traditional values, making dance accessible to all age groups.
            </MemberBio>
          </TeamMember>
        </TeamGrid>
      </Section>

      <Section>
        <Subtitle>What Our Students Say</Subtitle>
        <Grid>
          <Card>
            <CardText style={{ fontStyle: 'italic' }}>
              "The classes here are amazing! I've learned so much about my cultural heritage and made wonderful friends. 
              The instructors are patient and inspiring."
            </CardText>
            <CardText style={{ marginTop: '15px', color: 'var(--primary)', fontWeight: 'bold' }}>
              - Priya S., Student
            </CardText>
          </Card>
          <Card>
            <CardText style={{ fontStyle: 'italic' }}>
              "I joined as a complete beginner and now I'm confident performing on stage. This academy truly transforms lives 
              through dance."
            </CardText>
            <CardText style={{ marginTop: '15px', color: 'var(--primary)', fontWeight: 'bold' }}>
              - Arjun K., Student
            </CardText>
          </Card>
          <Card>
            <CardText style={{ fontStyle: 'italic' }}>
              "What I appreciate most is the blend of traditional values with modern teaching methods. My daughter loves every class!"
            </CardText>
            <CardText style={{ marginTop: '15px', color: 'var(--primary)', fontWeight: 'bold' }}>
              - Meera Sharma, Parent
            </CardText>
          </Card>
        </Grid>
      </Section>
    </Container>
  );
}

export default About;
