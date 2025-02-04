import React, { useContext, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TaskContext from '../context/context';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);  // To control submit button enable/disable
    const navigate = useNavigate();
    const { isAuthorized, setIsAuthorized } = useContext(TaskContext);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prevState => {
            const updatedData = { ...prevState, [id]: type === 'checkbox' ? checked : value };
            validateForm(updatedData);
            return updatedData;
        });
    };

    const validateForm = (data) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        
       
        const hasLetter = /[a-zA-Z]/.test(data.password);
        const hasNumber = /\d/.test(data.password);

        if (!data.name || !data.email || !data.password || !data.confirmPassword) {
            setError('All fields are required');
            setIsValid(false);
        } else if (!emailRegex.test(data.email)) {
            setError('Invalid email address');
            setIsValid(false);
        } else if (!hasLetter || !hasNumber) {
            setError('Password must contain at least one letter and one number');
            setIsValid(false);
        } else if (data.password !== data.confirmPassword) {
            setError('Passwords do not match');
            setIsValid(false);
        } else if (!data.agreedToTerms) {
            setError('You must agree to the terms of service');
            setIsValid(false);
        } else {
            setError('');
            setIsValid(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;  
        console.log('User Data:', formData);
        toast.success('Registration successful!');
        localStorage.setItem('Email', formData.email);
        localStorage.setItem('Password', formData.password);
        setIsAuthorized(true);
        localStorage.setItem('isAuthorized', true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 4500);

        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreedToTerms: false
        });
    };

    return (
        <>
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image h-100'>
                <MDBCard className='m-5' style={{ maxWidth: '500px' }}>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5">Create an Account</h2>
                        {error && <p className="text-danger text-center">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                wrapperClass='mb-4'
                                label='Your Name'
                                size='lg'
                                id='name'
                                type='text'
                                value={formData.name}
                                onChange={handleChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                                required
                            />
                            <MDBInput
                                wrapperClass='mb-4'
                                label='Your Email'
                                size='lg'
                                id='email'
                                type='email'
                                value={formData.email}
                                onChange={handleChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                                required
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Password"
                                size="lg"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                                required
                            />
                            <MDBInput
                                wrapperClass='mb-4'
                                label='Repeat Your Password'
                                size='lg'
                                id='confirmPassword'
                                type={showPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                                onChange={handleChange}
                                required
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <span>Show Password</span>
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>
                            <div className='d-flex flex-row justify-content-center mb-4'>
                                <MDBCheckbox
                                    id='agreedToTerms'
                                    label='I Agree to the Terms of Service'
                                    checked={formData.agreedToTerms}
                                    onChange={handleChange}
                                />
                            </div>
                            <MDBBtn type="submit" className='mb-4 w-100 gradient-custom-4' size='lg' disabled={!isValid}>Register</MDBBtn>
                            <span>Already have an account? <a href="/singin">Sing In</a></span>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
            <ToastContainer />
        </>
    );
}

export default SignUp;
