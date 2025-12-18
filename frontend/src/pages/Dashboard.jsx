import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getUserEnrollments, createFeedback } from '../services/api';

const Container = styled.div`
  padding: 100px 5%;
`;

const Title = styled.h2`
  color: var(--primary);
`;

const Section = styled.div`
  background: #2d3748;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
`;

const Form = styled.form`
  display: grid;
  gap: 12px;
  margin-top: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #4b5563;
  background: #1f2937;
  color: white;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 90px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #4b5563;
  background: #1f2937;
  color: white;
  resize: vertical;
`;

const Button = styled.button`
  padding: 12px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  &:hover { background: #d97706; }
`;

const Notice = styled.div`
  padding: 10px 12px;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #34d399;
  font-weight: 600;
`;

const Card = styled.div`
  background: #1f2937;
  padding: 18px;
  border-radius: 10px;
  border: 1px solid #374151;
  display: grid;
  gap: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 12px;
`;

const Pill = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  background: ${props => props.variant === 'approved' ? '#10b981'
    : props.variant === 'rejected' ? '#ef4444'
    : '#f59e0b'};
`;

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState({ subject: '', message: '', rating: 5 });
    const [feedbackSent, setFeedbackSent] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (!token || !userData) {
          navigate('/login');
          return;
        }

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        const load = async () => {
          try {
            const res = await getUserEnrollments();
            setEnrollments(res.data || []);
          } catch (err) {
            setError(err.response?.data?.msg || 'Failed to load enrollments');
          } finally {
            setLoading(false);
          }
        };

        load();
      }, [navigate]);

      if (!user) return null;

    return (
        <Container>
            <Title>Dashboard</Title>
            <Section>
              <h3>Welcome, {user.name}</h3>
              <p>Role: {user.role}</p>
              <p>Your Enrollments: {enrollments.length}</p>
            </Section>

            <Section>
              <h3>Your Enrolled Classes</h3>
              {loading && <p>Loading enrollments...</p>}
              {error && <p style={{ color: '#f87171' }}>{error}</p>}
              {!loading && !error && enrollments.length === 0 && (
                <p>No enrollments yet. Browse classes and enroll!</p>
              )}
              {!loading && enrollments.length > 0 && (
                <Grid>
                  {enrollments.map((enroll) => (
                    <Card key={enroll._id}>
                      <strong>{enroll.danceClass?.className || enroll.danceClass?.danceType || 'Class (No details available)'}</strong>
                      <div>Instructor: {enroll.danceClass?.instructor || 'Not specified'}</div>
                      <div>Duration: {enroll.danceClass?.duration || 'Not specified'}</div>
                      <div>Fee: ₹{enroll.danceClass?.fees || 'Not specified'}</div>
                      <div>
                        Enrollment: <Pill variant={enroll.status}>{enroll.status}</Pill>
                      </div>
                      <div>
                        Payment: <Pill variant={enroll.paymentStatus === 'verified' ? 'approved' : enroll.paymentStatus === 'failed' ? 'rejected' : 'pending'}>
                          {enroll.paymentStatus}
                        </Pill>
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#cbd5e0' }}>
                        Enrolled: {new Date(enroll.enrolledAt).toLocaleDateString()}
                      </div>
                    </Card>
                  ))}
                </Grid>
              )}
            </Section>

            <Section>
              <h3>Share Your Feedback</h3>
              <p style={{ color: '#cbd5e0', marginTop: 6 }}>Tell us how your classes are going. Your feedback helps us improve!</p>
              {feedbackSent && <Notice>Thanks for your feedback!</Notice>}
              <Form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await createFeedback(feedback);
                  setFeedbackSent(true);
                  setFeedback({ subject: '', message: '', rating: 5 });
                  setTimeout(() => setFeedbackSent(false), 3000);
                } catch (err) {
                  alert(err.response?.data?.msg || 'Failed to submit feedback');
                }
              }}>
                <Input
                  placeholder="Subject (e.g., Instructor, Schedule, Experience)"
                  value={feedback.subject}
                  onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}
                  required
                />
                <TextArea
                  placeholder="Your feedback"
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                  required
                />
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={feedback.rating}
                  onChange={(e) => setFeedback({ ...feedback, rating: Number(e.target.value) })}
                  required
                />
                <Button type="submit">Submit Feedback</Button>
              </Form>
            </Section>
        </Container>
    );
};

export default Dashboard;
