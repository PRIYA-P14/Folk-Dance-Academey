import { useState } from 'react';
import styled from 'styled-components';
import { createEnrollment } from '../services/api';

const FormContainer = styled.div`
  background: #2d3748;
  padding: 30px;
  border-radius: 10px;
  margin-top: 30px;
  border: 2px solid var(--primary);
`;

const Title = styled.h2`
  color: var(--primary);
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #cbd5e0;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
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

const Select = styled.select`
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

const Button = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 15px;
  font-size: 1.1rem;
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

const InfoText = styled.p`
  color: #a0aec0;
  font-size: 0.9rem;
  margin: 0;
  padding: 10px;
  background: #1a202c;
  border-radius: 5px;
  border-left: 3px solid #3182ce;
`;

const SuccessMessage = styled.div`
  background: #10b981;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  background: #ef4444;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const EnrollmentForm = ({ danceClass, onSuccess }) => {
    const [formData, setFormData] = useState({
        paymentMethod: 'upi',
        transactionId: '',
        amount: danceClass.fees
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await createEnrollment({
                danceClassId: danceClass._id,
                transactionId: formData.transactionId,
                amount: formData.amount
            });

            setSuccess(true);
            setLoading(false);
            
            if (onSuccess) {
                onSuccess(response.data);
            }
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.msg || 'Enrollment failed. Please try again.');
        }
    };

    if (success) {
        return (
            <FormContainer>
                <SuccessMessage>
                    🎉 Enrollment Successful! Your payment is under verification. You will be notified once approved.
                </SuccessMessage>
            </FormContainer>
        );
    }

    return (
        <FormContainer>
            <Title>Enroll in {danceClass.className}</Title>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <InfoText>
                💡 <strong>Note:</strong> After payment, please enter your transaction ID below. 
                Your enrollment will be confirmed once the admin verifies your payment.
            </InfoText>

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Class Fee</Label>
                    <Input
                        type="text"
                        value={`₹${danceClass.fees}`}
                        disabled
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Payment Method</Label>
                    <Select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        required
                    >
                        <option value="upi">UPI / Google Pay / PhonePe</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="card">Debit/Credit Card</option>
                        <option value="cash">Cash (Pay at Center)</option>
                    </Select>
                </FormGroup>

                {formData.paymentMethod === 'upi' && (
                    <InfoText>
                        📱 <strong>UPI ID:</strong> danceclass@upi<br/>
                        or scan the QR code at the center
                    </InfoText>
                )}

                {formData.paymentMethod === 'bank_transfer' && (
                    <InfoText>
                        🏦 <strong>Bank Details:</strong><br/>
                        Account Name: Folk Dance Academy<br/>
                        Account No: 1234567890<br/>
                        IFSC: SBIN0001234<br/>
                        Bank: State Bank of India
                    </InfoText>
                )}

                <FormGroup>
                    <Label>Transaction ID / Reference Number *</Label>
                    <Input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        placeholder="Enter your transaction ID"
                        required
                    />
                </FormGroup>

                <Button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Complete Enrollment'}
                </Button>
            </Form>
        </FormContainer>
    );
};

export default EnrollmentForm;
