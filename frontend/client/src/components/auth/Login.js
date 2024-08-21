import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

// Translation data
const translations = {
  en: {
    createAccount: 'Create Account',
    useEmailForRegistration: 'or use your email for registration',
    namePlaceholder: 'Name',
    phonePlaceholder: 'Phone',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    birthdayPlaceholder: 'Birthday',
    signUp: 'Sign Up',
    login: 'Log in',
    useAccount: 'or use your account',
    identifierPlaceholder: 'Email or Username',
    forgotPassword: 'Forgot your password?',
    signIn: 'Sign In',
    welcomeBack: 'Welcome Back!',
    keepConnected: 'To keep connected with us please login with your personal info',
    helloFriend: 'Hello, Friend!',
    enterDetails: 'Enter your personal details and start journey with us',
  },
  ar: {
    createAccount: 'إنشاء حساب',
    useEmailForRegistration: 'أو استخدم بريدك الإلكتروني للتسجيل',
    namePlaceholder: 'الاسم',
    phonePlaceholder: 'الهاتف',
    emailPlaceholder: 'البريد الإلكتروني',
    passwordPlaceholder: 'كلمة المرور',
    birthdayPlaceholder: 'تاريخ الميلاد',
    signUp: 'تسجيل',
    login: 'تسجيل الدخول',
    useAccount: 'أو استخدم حسابك',
    identifierPlaceholder: 'البريد الإلكتروني أو اسم المستخدم',
    forgotPassword: 'نسيت كلمة المرور؟',
    signIn: 'تسجيل الدخول',
    welcomeBack: 'مرحبًا بعودتك!',
    keepConnected: 'للبقاء على اتصال معنا، يرجى تسجيل الدخول باستخدام معلوماتك الشخصية',
    helloFriend: 'مرحبًا، صديق!',
    enterDetails: 'أدخل بياناتك الشخصية وابدأ رحلتك معنا',
  },
};

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    Phone: '',
    email: '',
    password: '',
    birthday: '',
  });
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
  });

  const navigate = useNavigate();
  const language = localStorage.getItem('language') || 'ar'; // Default to Arabic
  const t = translations[language]; // Get the current language's translations

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
      const response = await axios.post('http://localhost:3000/api/auth/register', registerData, { withCredentials: true });
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
      const response = await axios.post('http://localhost:3000/api/auth/login', loginData, { withCredentials: true });
      console.log('Login response:', response.data); // Log the response to debug

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful:', response.data);
        if (response.data.role === 'Admin') {
          navigate('/dashboard'); // Redirect to dashboard if admin
          console.log('Admin logged in');
        } else {
          navigate('/'); // Redirect to home if user
          console.log('User logged in');
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
            <h1>{t.createAccount}</h1>
            <span>{t.useEmailForRegistration}</span>
            <input type="text" name="name" placeholder={t.namePlaceholder} value={registerData.name} onChange={handleRegisterChange} required />
            <input type="text" name="Phone" placeholder={t.phonePlaceholder} value={registerData.Phone} onChange={handleRegisterChange} required />
            <input type="email" name="email" placeholder={t.emailPlaceholder} value={registerData.email} onChange={handleRegisterChange} required />
            <input type="password" name="password" placeholder={t.passwordPlaceholder} value={registerData.password} onChange={handleRegisterChange} required />
            <input type="date" name="birthday" placeholder={t.birthdayPlaceholder} value={registerData.birthday} onChange={handleRegisterChange} required />
            <button type="submit">{t.signUp}</button>
          </form>
        </div>
        <div className="auth-form-container auth-sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>{t.login}</h1>
            <span>{t.useAccount}</span>
            <input type="text" name="identifier" placeholder={t.identifierPlaceholder} value={loginData.identifier} onChange={handleLoginChange} required />
            <input type="password" name="password" placeholder={t.passwordPlaceholder} value={loginData.password} onChange={handleLoginChange} required />
            <a href="#">{t.forgotPassword}</a>
            <button type="submit">{t.signIn}</button>
          </form>
        </div>
        <div className="auth-overlay-container">
          <div className="auth-overlay">
            <div className="auth-overlay-panel auth-overlay-left">
              <h1>{t.welcomeBack}</h1>
              <p>{t.keepConnected}</p>
              <button className="auth-ghost" onClick={handleSignInClick} id="signIn">{t.signIn}</button>
            </div>
            <div className="auth-overlay-panel auth-overlay-right">
              <h1>{t.helloFriend}</h1>
              <p>{t.enterDetails}</p>
              <button className="auth-ghost" onClick={handleSignUpClick} id="signUp">{t.signUp}</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
