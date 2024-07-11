import React, { useState } from 'react';
import './Login.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  return (
    <div>
      <Navbar/>
    <div className={`auth-container ${rightPanelActive ? 'auth-right-panel-active' : ''}`} id="auth-container">
      <div className="auth-form-container auth-sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          {/* <div className="auth-social-container">
            <a href="#" className="auth-social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="auth-social"><i className="fab fa-linkedin-in"></i></a>
          </div> */}
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="Date" placeholder="BirthDay" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="auth-form-container auth-sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          {/* <div className="auth-social-container">
            <a href="#" className="auth-social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="auth-social"><i className="fab fa-linkedin-in"></i></a>
          </div> */}
          <span>or use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
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
    <Footer/>
    </div>
  );
};

export default Login;
