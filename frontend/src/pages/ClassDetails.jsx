import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getClass } from '../services/api';
import EnrollmentForm from '../components/EnrollmentForm';
import { resolveUrl, getFallbackByName } from '../utils/imageUtils';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80';

const Container = styled.div`
  padding: 100px 5%;
  max-width: 1400px;
  margin: 0 auto;
  color: white;
`;

const ClassInfoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;
`;

const ImageContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
  border: 4px solid var(--primary);
`;

const InfoContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Title = styled.h1`
  color: var(--primary);
  font-size: 2.5rem;
  margin-top: 0;
`;

const Detail = styled.p`
  font-size: 1.1rem;
  margin: 10px 0;
  
  strong {
    color: #ccc;
  }
`;

const Fees = styled.p`
  font-size: 1.5rem;
  color: #10b981;
  font-weight: bold;
  margin: 20px 0;
`;

const EnrollButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  
  &:hover {
    background: #d97706;
  }
  
  &:disabled {
    background: #4a5568;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: #6b7280;
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 10px;
  
  &:hover {
    background: #4b5563;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ClassDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [danceClass, setDanceClass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
    const [user, setUser] = useState(null);
  const base = 'http://localhost:5000';
  const [imageSrc, setImageSrc] = useState('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80');
  const [triedAltPath, setTriedAltPath] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        getClass(id)
            .then(res => {
                setDanceClass(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
      if (danceClass) {
        setImageSrc(resolveUrl(danceClass.image));
      }
    }, [danceClass, resolveUrl]);

    const handleEnroll = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to enroll');
            navigate('/login');
            return;
        }
        setShowEnrollmentForm(true);
    };

    const handleEnrollmentSuccess = (data) => {
        alert('Enrollment successful! Check your dashboard for status.');
        navigate('/dashboard');
    };

    if (loading) return <p style={{ marginTop: '100px', textAlign: 'center' }}>Loading...</p>;
    if (!danceClass) return <p style={{ marginTop: '100px', textAlign: 'center' }}>Class not found</p>;

    return (
        <Container>
            <ClassInfoSection>
                <ImageContainer>
                    <Image
                      src={imageSrc}
                      alt={danceClass.className}
                      onError={() => {
                        if (imageSrc !== PLACEHOLDER) {
                          // Try alternative '/public/images/...' layout once before placeholder
                          try {
                            const url = new URL(imageSrc);
                            if (!triedAltPath && url.origin === base && url.pathname.startsWith('/public/') && !url.pathname.startsWith('/public/images/')) {
                              const alt = `${base}/public/images/${url.pathname.replace('/public/','')}`;
                              console.warn('Retrying detail image with /public/images path:', alt);
                              setTriedAltPath(true);
                              setImageSrc(alt);
                              return;
                            }
                          } catch {}
                          if (!usedFallback) {
                            const fb = getFallbackByName(danceClass);
                            setUsedFallback(true);
                            console.warn('Detail image failed; applying dance fallback:', fb);
                            setImageSrc(fb);
                            return;
                          }
                          console.warn('Detail image failed to load, fallback placeholder:', imageSrc);
                          setImageSrc(PLACEHOLDER);
                        }
                      }}
                    />
                </ImageContainer>
                <InfoContainer>
                    <Title>{danceClass.className}</Title>
                    <Detail><strong>Type:</strong> {danceClass.danceType}</Detail>
                    <Detail><strong>Instructor:</strong> {danceClass.instructor}</Detail>
                    <Detail><strong>Duration:</strong> {danceClass.duration}</Detail>
                    <Detail><strong>Slots Available:</strong> {danceClass.slots}</Detail>
                    <Detail><strong>Description:</strong> {danceClass.description}</Detail>

                    <Fees>Fee: ₹{danceClass.fees}</Fees>

                    {!showEnrollmentForm && user && user.role !== 'admin' && (
                        <ButtonGroup>
                            <EnrollButton 
                                onClick={handleEnroll}
                                disabled={danceClass.slots <= 0}
                            >
                                {danceClass.slots <= 0 ? 'Slots Full' : 'Enroll Now'}
                            </EnrollButton>
                        </ButtonGroup>
                    )}
                    
                    {user && user.role === 'admin' && (
                        <Detail style={{ color: '#f59e0b', fontWeight: 'bold', marginTop: '20px' }}>
                            ⚠️ Admins cannot enroll in classes
                        </Detail>
                    )}
                </InfoContainer>
            </ClassInfoSection>

            {showEnrollmentForm && (
                <>
                    <EnrollmentForm 
                        danceClass={danceClass} 
                        onSuccess={handleEnrollmentSuccess}
                    />
                    <ButtonGroup style={{ marginTop: '20px' }}>
                        <CancelButton onClick={() => setShowEnrollmentForm(false)}>
                            Cancel
                        </CancelButton>
                    </ButtonGroup>
                </>
            )}
        </Container>
    );
};

export default ClassDetails;
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { getClass } from '../services/api';
// import EnrollmentForm from '../components/EnrollmentForm';

// const BASE_URL = "http://localhost:5000";

// /* ---------------- styled components ---------------- */

// const Container = styled.div`
//   padding: 100px 5%;
//   max-width: 1400px;
//   margin: 0 auto;
//   color: white;
// `;

// const ClassInfoSection = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 40px;
//   margin-bottom: 40px;
// `;

// const ImageContainer = styled.div`
//   flex: 1;
//   min-width: 300px;
// `;

// const Image = styled.img`
//   width: 100%;
//   border-radius: 10px;
//   border: 4px solid var(--primary);
// `;

// const InfoContainer = styled.div`
//   flex: 1;
//   min-width: 300px;
// `;

// const Title = styled.h1`
//   color: var(--primary);
//   font-size: 2.5rem;
//   margin-top: 0;
// `;

// const Detail = styled.p`
//   font-size: 1.1rem;
//   margin: 10px 0;

//   strong {
//     color: #ccc;
//   }
// `;

// const Fees = styled.p`
//   font-size: 1.5rem;
//   color: #10b981;
//   font-weight: bold;
//   margin: 20px 0;
// `;

// const EnrollButton = styled.button`
//   background: var(--primary);
//   color: white;
//   border: none;
//   padding: 15px 40px;
//   font-size: 1.2rem;
//   border-radius: 5px;
//   cursor: pointer;
//   font-weight: bold;

//   &:hover {
//     background: #d97706;
//   }

//   &:disabled {
//     background: #4a5568;
//     cursor: not-allowed;
//   }
// `;

// const CancelButton = styled.button`
//   background: #6b7280;
//   color: white;
//   border: none;
//   padding: 15px 40px;
//   font-size: 1.2rem;
//   border-radius: 5px;
//   cursor: pointer;
//   font-weight: bold;

//   &:hover {
//     background: #4b5563;
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 20px;
// `;

// /* ---------------- component ---------------- */

// const ClassDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [danceClass, setDanceClass] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   useEffect(() => {
//     getClass(id)
//       .then(res => {
//         setDanceClass(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleEnroll = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please login to enroll");
//       navigate("/login");
//       return;
//     }
//     setShowEnrollmentForm(true);
//   };

//   const handleEnrollmentSuccess = () => {
//     alert("Enrollment successful! Check your dashboard for status.");
//     navigate("/dashboard");
//   };

//   if (loading) {
//     return <p style={{ marginTop: "100px", textAlign: "center" }}>Loading...</p>;
//   }

//   if (!danceClass) {
//     return <p style={{ marginTop: "100px", textAlign: "center" }}>Class not found</p>;
//   }

//   return (
//     <Container>
//       <ClassInfoSection>
//         <ImageContainer>
//           <Image
//             src={`${BASE_URL}/images/${danceClass.image}`}
//             alt={danceClass.className}
//             onError={(e) => {
//               e.target.src = `${BASE_URL}/images/background.jpg`;
//             }}
//           />
//         </ImageContainer>

//         <InfoContainer>
//           <Title>{danceClass.className}</Title>
//           <Detail><strong>Type:</strong> {danceClass.danceType}</Detail>
//           <Detail><strong>Instructor:</strong> {danceClass.instructor}</Detail>
//           <Detail><strong>Duration:</strong> {danceClass.duration}</Detail>
//           <Detail><strong>Slots Available:</strong> {danceClass.slots}</Detail>
//           <Detail><strong>Description:</strong> {danceClass.description}</Detail>

//           <Fees>Fee: ₹{danceClass.fees}</Fees>

//           {!showEnrollmentForm && user && user.role !== "admin" && (
//             <ButtonGroup>
//               <EnrollButton
//                 onClick={handleEnroll}
//                 disabled={danceClass.slots <= 0}
//               >
//                 {danceClass.slots <= 0 ? "Slots Full" : "Enroll Now"}
//               </EnrollButton>
//             </ButtonGroup>
//           )}

//           {user && user.role === "admin" && (
//             <Detail style={{ color: "#f59e0b", fontWeight: "bold", marginTop: "20px" }}>
//               ⚠️ Admins cannot enroll in classes
//             </Detail>
//           )}
//         </InfoContainer>
//       </ClassInfoSection>

//       {showEnrollmentForm && (
//         <>
//           <EnrollmentForm
//             danceClass={danceClass}
//             onSuccess={handleEnrollmentSuccess}
//           />
//           <ButtonGroup style={{ marginTop: "20px" }}>
//             <CancelButton onClick={() => setShowEnrollmentForm(false)}>
//               Cancel
//             </CancelButton>
//           </ButtonGroup>
//         </>
//       )}
//     </Container>
//   );
// };

// export default ClassDetails;

