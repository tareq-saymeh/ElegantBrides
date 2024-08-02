import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    birthday: '',
  });
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', registerData);
      console.log('Registration successful:', response.data);
      navigate('/'); // Redirect to home after registration
    } catch (error) {
      if (error.response) {
        console.error('Registration failed:', error.response.data);
      } else {
        console.error('Registration failed:', error.message);
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', loginData);
      console.log('Login response:', response.data); // Log the response to debug

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful:', response.data);
        if (response.data.role === 'Admin') { // Ensure the role matches exactly with what the backend sends
          navigate('/dashboard'); // Redirect to dashboard if admin
        } else {
          navigate('/'); // Redirect to home if user
        }
      } else {
        console.log('Login failed: No token in response');
      }
    } catch (error) {
      if (error.response) {
        console.error('Login failed:', error.response.data);
      } else {
        console.error('Login failed:', error.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className={`auth-container ${rightPanelActive ? 'auth-right-panel-active' : ''}`} id="auth-container">
        <div className="auth-form-container auth-sign-up-container">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder="Name" value={registerData.name} onChange={handleRegisterChange} required />
            <input type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} required />
            <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} required />
            <input type="date" name="birthday" placeholder="Birthday" value={registerData.birthday} onChange={handleRegisterChange} required />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="auth-form-container auth-sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Log in</h1>
            <span>or use your account</span>
            <input type="text" name="identifier" placeholder="Email or Username" value={loginData.identifier} onChange={handleLoginChange} required />
            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="auth-overlay-container">
          <div className="auth-overlay">
            <div className="auth-overlay-panel auth-overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="auth-ghost" onClick={handleSignInClick} id="signIn">Sign In</button>
            </div>
            <div className="auth-overlay-panel auth-overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="auth-ghost" onClick={handleSignUpClick} id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
