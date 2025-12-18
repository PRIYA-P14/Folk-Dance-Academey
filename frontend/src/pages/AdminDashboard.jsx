import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllEnrollments, getAllPayments, verifyPayment, updateEnrollmentStatus, getClasses, createClass, updateClass, deleteClass, getAdminStats, getAllContacts, updateContactStatus, deleteContact, getAllFeedback, deleteFeedback } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 100px 5%;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: var(--primary);
  margin-bottom: 30px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid #4a5568;
`;

const Tab = styled.button`
  padding: 15px 30px;
  background: ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 5px 5px 0 0;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary)' : '#4a5568'};
  }
`;

const Table = styled.table`
  width: 100%;
  background: #2d3748;
  border-radius: 10px;
  overflow: hidden;
  border-collapse: collapse;
`;

const FilterBar = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
`;

const FilterLabel = styled.span`
    color: #cbd5e0;
    font-weight: 600;
`;

const Select = styled.select`
    background: #1a202c;
    color: white;
    border: 1px solid #4a5568;
    border-radius: 6px;
    padding: 10px 12px;
    min-width: 200px;
    font-size: 0.95rem;
    cursor: pointer;
    &:focus {
        outline: none;
        border-color: var(--primary);
    }
`;

const Th = styled.th`
  background: #1a202c;
  color: var(--primary);
  padding: 15px;
  text-align: left;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #4a5568;
  color: white;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  border: 2px solid;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: all 0.3s;
  
  &.approve {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    border-color: #10b981;
    
    &:hover {
      background: rgba(16, 185, 129, 0.25);
      transform: translateY(-2px);
    }
  }
  
  &.reject {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
    border-color: #ef4444;
    
    &:hover {
      background: rgba(239, 68, 68, 0.25);
      transform: translateY(-2px);
    }
  }
  
  &.verify {
    background: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
    border-color: #3b82f6;
    
    &:hover {
      background: rgba(59, 130, 246, 0.25);
      transform: translateY(-2px);
    }
  }
  
  &.delete {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
    border-color: #ef4444;
    
    &:hover {
      background: rgba(239, 68, 68, 0.25);
      transform: translateY(-2px);
    }
  }
  
  &.edit {
    background: rgba(251, 146, 60, 0.15);
    color: var(--primary);
    border-color: var(--primary);
    
    &:hover {
      background: rgba(251, 146, 60, 0.25);
      transform: translateY(-2px);
    }
  }
`;

const Status = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.85rem;
  display: inline-block;
  
  &.pending {
    background: rgba(251, 191, 36, 0.15);
    color: #fbbf24;
    border: 1px solid #fbbf24;
  }
  
  &.approved {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    border: 1px solid #10b981;
  }
  
  &.verified {
    background: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
    border: 1px solid #3b82f6;
  }
  
  &.rejected, &.failed {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
    border: 1px solid #ef4444;
  }

  &.new {
    background: rgba(251, 146, 60, 0.15);
    color: var(--primary);
    border: 1px solid var(--primary);
  }

  &.read {
    background: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
    border: 1px solid #3b82f6;
  }

  &.replied {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    border: 1px solid #10b981;
  }

  &.archived {
    background: rgba(107, 114, 128, 0.15);
    color: #6b7280;
    border: 1px solid #6b7280;
  }
`;

const Form = styled.form`
  background: #2d3748;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
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
  border: 1px solid #4a5568;
  border-radius: 5px;
  background: #1a202c;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #4a5568;
  border-radius: 5px;
  background: #1a202c;
  color: white;
  font-size: 1rem;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const SubmitButton = styled.button`
  background: var(--primary);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background: #d97706;
  }
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
`;

const StatCard = styled.div`
    background: #1f2937;
    padding: 16px 18px;
    border-radius: 10px;
    border: 1px solid #374151;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const StatLabel = styled.span`
    color: #cbd5e0;
    font-size: 0.95rem;
`;

const StatValue = styled.span`
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--primary);
`;

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('enrollments');
    const [enrollments, setEnrollments] = useState([]);
    const [payments, setPayments] = useState([]);
    const [classes, setClasses] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ users: 0, enrollments: 0, payments: 0, classes: 0, revenue: 0 });
    const [statsLoading, setStatsLoading] = useState(true);
    const [enrollmentFilter, setEnrollmentFilter] = useState('all');
    const [showClassForm, setShowClassForm] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [classForm, setClassForm] = useState({
        className: '',
        danceType: '',
        description: '',
        instructor: '',
        duration: '',
        fees: '',
        slots: '',
        image: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is admin
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('No user found. Please login as admin.');
            navigate('/login');
            return;
        }
        
        try {
            const user = JSON.parse(userStr);
            console.log('Admin Dashboard - Current User:', user);
            
            if (user.role !== 'admin') {
                alert('Access denied. Admin only. Your role is: ' + user.role);
                navigate('/');
                return;
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            alert('Error loading admin panel. Please login again.');
            navigate('/login');
            return;
        }
        
        loadData();
        loadStats();
    }, [activeTab, navigate]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'enrollments') {
                const res = await getAllEnrollments();
                setEnrollments(res.data);
            } else if (activeTab === 'payments') {
                const res = await getAllPayments();
                setPayments(res.data);
            } else if (activeTab === 'classes') {
                const res = await getClasses();
                setClasses(res.data);
            } else if (activeTab === 'contacts') {
                const res = await getAllContacts();
                setContacts(res.data);
            } else if (activeTab === 'feedback') {
                const res = await getAllFeedback();
                setFeedbacks(res.data);
            }
        } catch (err) {
            console.error(err);
            alert('Error loading data');
        }
        setLoading(false);
    };

    const loadStats = async () => {
        try {
            setStatsLoading(true);
            const res = await getAdminStats();
            setStats(res.data || {});
        } catch (err) {
            console.error(err);
        } finally {
            setStatsLoading(false);
        }
    };

    const handleApproveEnrollment = async (id) => {
        try {
            await updateEnrollmentStatus(id, 'approved');
            loadData();
            alert('Enrollment approved!');
        } catch (err) {
            alert('Error approving enrollment');
        }
    };

    const handleRejectEnrollment = async (id) => {
        try {
            await updateEnrollmentStatus(id, 'rejected');
            loadData();
            alert('Enrollment rejected!');
        } catch (err) {
            alert('Error rejecting enrollment');
        }
    };

    const handleVerifyPayment = async (id) => {
        try {
            await verifyPayment(id, 'verified');
            loadData();
            alert('Payment verified!');
        } catch (err) {
            alert('Error verifying payment');
        }
    };

    const handleRejectPayment = async (id) => {
        try {
            await verifyPayment(id, 'failed');
            loadData();
            alert('Payment rejected!');
        } catch (err) {
            alert('Error rejecting payment');
        }
    };

    const handleClassFormChange = (e) => {
        setClassForm({
            ...classForm,
            [e.target.name]: e.target.value
        });
    };

    const handleClassSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingClass) {
                await updateClass(editingClass._id, classForm);
                alert('Class updated successfully!');
            } else {
                await createClass(classForm);
                alert('Class created successfully!');
            }
            setShowClassForm(false);
            setEditingClass(null);
            setClassForm({
                className: '',
                danceType: '',
                description: '',
                instructor: '',
                duration: '',
                fees: '',
                slots: '',
                image: ''
            });
            loadData();
        } catch (err) {
            alert('Error saving class');
        }
    };

    const handleEditClass = (cls) => {
        setEditingClass(cls);
        setClassForm({
            className: cls.className,
            danceType: cls.danceType,
            description: cls.description,
            instructor: cls.instructor,
            duration: cls.duration,
            fees: cls.fees,
            slots: cls.slots,
            image: cls.image
        });
        setShowClassForm(true);
    };

    const handleDeleteClass = async (id) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            try {
                await deleteClass(id);
                alert('Class deleted successfully!');
                loadData();
            } catch (err) {
                alert('Error deleting class');
            }
        }
    };

    const enrollmentClassOptions = Array.from(new Set(
        enrollments
            .map(e => e.danceClass?.className)
            .filter(Boolean)
    ));

    const filteredEnrollments = enrollmentFilter === 'all'
        ? enrollments
        : enrollments.filter(e => e.danceClass?.className === enrollmentFilter);

    const handleMarkContactAsRead = async (id) => {
        try {
            await updateContactStatus(id, { status: 'read' });
            loadData();
        } catch (err) {
            alert('Error updating contact status');
        }
    };

    const handleMarkContactAsReplied = async (id) => {
        try {
            await updateContactStatus(id, { status: 'replied' });
            loadData();
            alert('Contact marked as replied!');
        } catch (err) {
            alert('Error updating contact status');
        }
    };

    const handleDeleteContact = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact message?')) {
            try {
                await deleteContact(id);
                loadData();
                alert('Contact message deleted successfully!');
            } catch (err) {
                alert('Error deleting contact');
            }
        }
    };

    const handleDeleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            try {
                await deleteFeedback(id);
                loadData();
                alert('Feedback deleted successfully!');
            } catch (err) {
                alert('Error deleting feedback');
            }
        }
    };

    const handleViewFeedback = (feedback) => {
        alert(`Feedback Details:\n\nFrom: ${feedback.user?.name || 'Unknown'}\nSubject: ${feedback.subject}\nRating: ${'⭐'.repeat(feedback.rating)}\nDate: ${new Date(feedback.createdAt).toLocaleString()}\n\nMessage:\n${feedback.message}`);
    };

    const handleViewContactMessage = (contact) => {
        alert(`Contact Message Details:\n\nFrom: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nSubject: ${contact.subject}\nDate: ${new Date(contact.submittedAt).toLocaleString()}\nStatus: ${contact.status}\n\nMessage:\n${contact.message}`);
    };

    const handleReplyToContact = (contact) => {
        const replyMessage = prompt(`Reply to ${contact.name} (${contact.email}):\n\nOriginal Message:\n${contact.message}\n\nEnter your reply:`);
        
        if (replyMessage && replyMessage.trim()) {
            // In a real application, this would send an email via backend
            alert(`Reply will be sent to ${contact.email}:\n\n${replyMessage}\n\nNote: Email functionality needs to be implemented in the backend.`);
            
            // Mark as replied after sending
            handleMarkContactAsReplied(contact._id);
        }
    };

    return (
        <Container>
            <Title>Admin Dashboard</Title>
            
            <StatsGrid>
              <StatCard>
                <StatLabel>Total Users</StatLabel>
                <StatValue>{statsLoading ? '...' : stats.users ?? 0}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Total Enrollments</StatLabel>
                <StatValue>{statsLoading ? '...' : stats.enrollments ?? 0}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Total Payments</StatLabel>
                <StatValue>{statsLoading ? '...' : stats.payments ?? 0}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Total Classes</StatLabel>
                <StatValue>{statsLoading ? '...' : stats.classes ?? 0}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Total Revenue</StatLabel>
                <StatValue>₹{statsLoading ? '...' : (stats.revenue ?? 0)}</StatValue>
              </StatCard>
            </StatsGrid>
            
            <TabContainer>
                <Tab active={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')}>
                    User Feedback
                </Tab>
                <Tab active={activeTab === 'enrollments'} onClick={() => setActiveTab('enrollments')}>
                    Enrollments
                </Tab>
                <Tab active={activeTab === 'payments'} onClick={() => setActiveTab('payments')}>
                    Payments
                </Tab>
                <Tab active={activeTab === 'classes'} onClick={() => setActiveTab('classes')}>
                    Manage Classes
                </Tab>
                <Tab active={activeTab === 'contacts'} onClick={() => setActiveTab('contacts')}>
                    Contact Messages
                </Tab>
            </TabContainer>

            {loading ? (
                <p style={{ color: '#a0aec0' }}>Loading...</p>
            ) : (
                <>
                    {activeTab === 'enrollments' && (                        <>
                        <FilterBar>
                            <FilterLabel>Filter by Dance Class:</FilterLabel>
                            <Select value={enrollmentFilter} onChange={(e) => setEnrollmentFilter(e.target.value)}>
                                <option value="all">All Classes</option>
                                {enrollmentClassOptions.map((className) => (
                                    <option key={className} value={className}>
                                        {className}
                                    </option>
                                ))}
                            </Select>
                        </FilterBar>                        <Table>
                            <thead>
                                <tr>
                                    <Th>User</Th>
                                    <Th>Class</Th>
                                    <Th>Status</Th>
                                    <Th>Payment Status</Th>
                                    <Th>Date</Th>
                                    <Th>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEnrollments.map(enrollment => (
                                    <tr key={enrollment._id}>
                                        <Td>{enrollment.user?.name}</Td>
                                        <Td>{enrollment.danceClass?.className}</Td>
                                        <Td><Status className={enrollment.status}>{enrollment.status}</Status></Td>
                                        <Td><Status className={enrollment.paymentStatus}>{enrollment.paymentStatus}</Status></Td>
                                        <Td>{new Date(enrollment.enrolledAt).toLocaleDateString()}</Td>
                                        <Td>
                                            {enrollment.status === 'pending' && (
                                                <>
                                                    <Button className="approve" onClick={() => handleApproveEnrollment(enrollment._id)}>
                                                        Approve
                                                    </Button>
                                                    <Button className="reject" onClick={() => handleRejectEnrollment(enrollment._id)}>
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                        </Td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        </>
                    )}

                    {activeTab === 'payments' && (
                        <Table>
                            <thead>
                                <tr>
                                    <Th>User</Th>
                                    <Th>Class</Th>
                                    <Th>Amount</Th>
                                    <Th>Transaction ID</Th>
                                    <Th>Status</Th>
                                    <Th>Date</Th>
                                    <Th>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(payment => (
                                    <tr key={payment._id}>
                                        <Td>{payment.user?.name}</Td>
                                        <Td>{payment.enrollment?.danceClass?.className}</Td>
                                        <Td>₹{payment.amount}</Td>
                                        <Td>{payment.transactionId}</Td>
                                        <Td><Status className={payment.status}>{payment.status}</Status></Td>
                                        <Td>{new Date(payment.paymentDate).toLocaleDateString()}</Td>
                                        <Td>
                                            {payment.status === 'pending' && (
                                                <>
                                                    <Button className="verify" onClick={() => handleVerifyPayment(payment._id)}>
                                                        Verify
                                                    </Button>
                                                    <Button className="reject" onClick={() => handleRejectPayment(payment._id)}>
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                        </Td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

                    {activeTab === 'classes' && (
                        <>
                            <Button 
                                className="approve" 
                                onClick={() => {
                                    setShowClassForm(!showClassForm);
                                    setEditingClass(null);
                                    setClassForm({
                                        className: '',
                                        danceType: '',
                                        description: '',
                                        instructor: '',
                                        duration: '',
                                        fees: '',
                                        slots: '',
                                        image: ''
                                    });
                                }}
                                style={{ marginBottom: '20px' }}
                            >
                                {showClassForm ? 'Cancel' : '+ Add New Class'}
                            </Button>

                            {showClassForm && (
                                <Form onSubmit={handleClassSubmit}>
                                    <h2 style={{ color: 'var(--primary)', marginTop: 0 }}>
                                        {editingClass ? 'Edit Class' : 'Add New Class'}
                                    </h2>
                                    <FormGroup>
                                        <Label>Class Name *</Label>
                                        <Input
                                            type="text"
                                            name="className"
                                            value={classForm.className}
                                            onChange={handleClassFormChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Dance Type *</Label>
                                        <Input
                                            type="text"
                                            name="danceType"
                                            value={classForm.danceType}
                                            onChange={handleClassFormChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Description *</Label>
                                        <TextArea
                                            name="description"
                                            value={classForm.description}
                                            onChange={handleClassFormChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Instructor *</Label>
                                        <Input
                                            type="text"
                                            name="instructor"
                                            value={classForm.instructor}
                                            onChange={handleClassFormChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Duration *</Label>
                                        <Input
                                            type="text"
                                            name="duration"
                                            value={classForm.duration}
                                            onChange={handleClassFormChange}
                                            placeholder="e.g., 3 months"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Fees (₹) *</Label>
                                        <Input
                                            type="number"
                                            name="fees"
                                            value={classForm.fees}
                                            onChange={handleClassFormChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Available Slots *</Label>
                                        <Input
                                            type="number"
                                            name="slots"
                                            value={classForm.slots}
                                            onChange={handleClassFormChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Image Path or URL *</Label>
                                        <Input
                                            type="text"
                                            name="image"
                                            value={classForm.image}
                                            onChange={handleClassFormChange}
                                            placeholder="/public/your-file.jpg or https://..."
                                            required
                                        />
                                        {classForm.image && (
                                            <div style={{ marginTop: '10px' }}>
                                                <img
                                                    src={(function(){
                                                        const v = (classForm.image||'').trim();
                                                        if (!v) return '';
                                                        if (/^https?:\/\//i.test(v)) return v;
                                                        const base = 'http://localhost:5000';
                                                        let path = v;
                                                        if (!path.startsWith('/')) path = '/'+path;
                                                        return base + path;
                                                    })()}
                                                    alt="preview"
                                                    style={{ width: 220, height: 130, objectFit: 'cover', border: '1px solid #374151', borderRadius: 6 }}
                                                    onError={(e)=>{ e.currentTarget.style.display='none'; }}
                                                />
                                                <p style={{ color: '#9CA3AF', fontSize: 12, marginTop: 6 }}>
                                                    Tip: Put files in backend/public (e.g., /public/mayilattam.jpg)
                                                </p>
                                            </div>
                                        )}
                                    </FormGroup>
                                    <SubmitButton type="submit">
                                        {editingClass ? 'Update Class' : 'Create Class'}
                                    </SubmitButton>
                                </Form>
                            )}

                            <Table>
                                <thead>
                                    <tr>
                                        <Th>Class Name</Th>
                                        <Th>Type</Th>
                                        <Th>Instructor</Th>
                                        <Th>Duration</Th>
                                        <Th>Fees</Th>
                                        <Th>Slots</Th>
                                        <Th>Status</Th>
                                        <Th>Actions</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classes.map(cls => (
                                        <tr key={cls._id}>
                                            <Td>{cls.className}</Td>
                                            <Td>{cls.danceType}</Td>
                                            <Td>{cls.instructor}</Td>
                                            <Td>{cls.duration}</Td>
                                            <Td>₹{cls.fees}</Td>
                                            <Td>{cls.slots}</Td>
                                            <Td><Status className={cls.status}>{cls.status}</Status></Td>
                                            <Td>
                                                <Button className="edit" onClick={() => handleEditClass(cls)}>
                                                    Edit
                                                </Button>
                                                <Button className="delete" onClick={() => handleDeleteClass(cls._id)}>
                                                    Delete
                                                </Button>
                                            </Td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    )}

                    {activeTab === 'contacts' && (
                        <Table>
                            <thead>
                                <tr>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Phone</Th>
                                    <Th>Subject</Th>
                                    <Th>Message</Th>
                                    <Th>Status</Th>
                                    <Th>Date</Th>
                                    <Th>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map(contact => (
                                    <tr key={contact._id}>
                                        <Td>{contact.name}</Td>
                                        <Td>{contact.email}</Td>
                                        <Td>{contact.phone}</Td>
                                        <Td>{contact.subject}</Td>
                                        <Td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {contact.message}
                                        </Td>
                                        <Td><Status className={contact.status}>{contact.status}</Status></Td>
                                        <Td>{new Date(contact.submittedAt).toLocaleDateString()}</Td>
                                        <Td>
                                            <Button className="approve" onClick={() => handleViewContactMessage(contact)}>
                                                View
                                            </Button>
                                            <Button className="verify" onClick={() => handleReplyToContact(contact)}>
                                                Reply
                                            </Button>
                                            {contact.status === 'new' && (
                                                <Button className="verify" onClick={() => handleMarkContactAsRead(contact._id)}>
                                                    Mark Read
                                                </Button>
                                            )}
                                            <Button className="delete" onClick={() => handleDeleteContact(contact._id)}>
                                                Delete
                                            </Button>
                                        </Td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

                    {activeTab === 'feedback' && (
                        <Table>
                            <thead>
                                <tr>
                                    <Th>User</Th>
                                    <Th>Subject</Th>
                                    <Th>Rating</Th>
                                    <Th>Message Preview</Th>
                                    <Th>Date</Th>
                                    <Th>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.map(feedback => (
                                    <tr key={feedback._id}>
                                        <Td>{feedback.user?.name || 'Unknown'}</Td>
                                        <Td>{feedback.subject}</Td>
                                        <Td>
                                            <span style={{ color: '#fbbf24', fontSize: '1.2rem' }}>
                                                {'⭐'.repeat(feedback.rating || 0)}
                                            </span>
                                        </Td>
                                        <Td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {feedback.message}
                                        </Td>
                                        <Td>{new Date(feedback.createdAt).toLocaleDateString()}</Td>
                                        <Td>
                                            <Button className="approve" onClick={() => handleViewFeedback(feedback)}>
                                                View
                                            </Button>
                                            <Button className="delete" onClick={() => handleDeleteFeedback(feedback._id)}>
                                                Delete
                                            </Button>
                                        </Td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </>
            )}
        </Container>
    );
};

export default AdminDashboard;
