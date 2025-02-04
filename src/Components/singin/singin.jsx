import React, { useContext, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TaskContext from '../context/context';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized } = useContext(TaskContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = () => {
    const storedEmail = localStorage.getItem('Email');
    const storedPassword = localStorage.getItem('Password');
    
    if (formData.email === storedEmail && formData.password === storedPassword) {
      toast.success('Login successful!');
      setFormData({
        email: '',
        password: ''
      });
      setIsAuthorized(true);
      localStorage.setItem('isAuthorized', true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 4500);
      setError('');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <>
      <MDBContainer fluid className='d-flex align-items-center justify-content-center vh-100 bg-light'>
        <MDBCard style={{ width: '500px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <MDBCardBody className='px-5 w-100' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
            <h2 className='text-uppercase text-center mb-4'>Sign In</h2>
            {error && <p style={{ color: 'red' }} className="text-center">{error}</p>}
            <MDBInput wrapperClass='mb-3' label='Your Email' size='lg' id='form2' type='email' name='email' value={formData.email} onChange={handleChange}  onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}/>
            <MDBInput wrapperClass='mb-3' label='Password' size='lg' id='form3' type='password' name='password' value={formData.password} onChange={handleChange} onKeyDown={(e) => e.key === 'Enter' && handleSignIn()} />
            <MDBBtn className='w-100' size='lg' onClick={handleSignIn}>Sign In</MDBBtn>
          </MDBCardBody>
          <span>Don't have an account? <a href="/">Sign Up</a></span>
        </MDBCard>
      </MDBContainer>
      <ToastContainer />
    </>
  );
}

export default SignIn;
