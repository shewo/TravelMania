import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, LogOut } from 'lucide-react'; 
import { GoogleLogin } from '@react-oauth/google'; 
import { jwtDecode } from "jwt-decode"; 
import '../styles/Signup.css';

const Signup = ({ isOpen, onClose, onLoginSuccess, user, onLogout }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- HELPER: SAVE TOKEN & NOTIFY PARENT ---
  const handleAuthResponse = (data, userDetails = {}) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      const decodedToken = jwtDecode(data.token);
      console.log("Decoded Token:", decodedToken);

      // Add shopId if present
      const userObj = {
        id: data.id,
        email: data.email || decodedToken.sub,
        name: data.name || userDetails.name,
        role: data.role || userDetails.role,
        picture: userDetails.picture || null,
        token: data.token
      };
      if (data.shopId) {
        userObj.shopId = data.shopId;
      }
      onLoginSuccess(userObj);
    }
  };

  // --- 1. GOOGLE LOGIN HANDLE ---
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("Google User Decoded:", decoded);

        const googlePayload = {
            email: decoded.email,
            name: decoded.name
        };

        const response = await fetch('http://localhost:8080/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(googlePayload),
        });

        if (response.ok) {
            const data = await response.json(); // ✅ Now returns { token, id, name, email, role }
            handleAuthResponse(data, { 
                name: decoded.name, 
                picture: decoded.picture, 
                role: 'TRAVELER' 
            });
        } else {
            console.error("Google Login Backend Error");
            alert("Google Login Failed!");
        }

    } catch (error) {
        console.error("Google Login Error", error);
    }
  };

  // --- 2. NORMAL EMAIL/PASS LOGIN HANDLE ---
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const url = isLogin 
      ? 'http://localhost:8080/api/auth/authenticate' 
      : 'http://localhost:8080/api/auth/register';

    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password, role: 'TRAVELER' };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json(); // ✅ Now returns { token, id, name, email, role }
        
        handleAuthResponse(data, { 
            name: data.name || (isLogin ? "User" : formData.name),
            email: data.email || formData.email 
        });

        setFormData({ name: '', email: '', password: '' });
      } else {
        const errorMsg = await response.text(); 
        try {
            const errorJson = JSON.parse(errorMsg);
            alert("Error: " + (errorJson.message || "Authentication Failed"));
        } catch {
            alert("Error: Login Failed. Please check credentials.");
        }
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Something went wrong! Is the backend running?");
    }
  };

  // --- RENDER SECTION ---
  return (
    <>
      <div className={`signup-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}/>
      
      <div className={`signup-drawer ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>

        {/* VIEW 1: LOGGED IN USER PROFILE */}
        {user ? (
          <div className="profile-view-container" style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <img 
              src={user.picture || `https://ui-avatars.com/api/?name=${user.name || 'User'}&background=c5a059&color=000&size=128&bold=true`} 
              alt="Profile" 
              style={{borderRadius: '50%', border: '4px solid #c5a059', marginBottom: '20px', boxShadow: '0 0 20px rgba(197, 160, 89, 0.4)'}}
            />
            <h2 className="drawer-title" style={{fontSize: '24px'}}>{user.name || "Traveler"}</h2>
            <p className="switch-text" style={{marginTop: '5px'}}>{user.email}</p>
            <p className="gold-text" style={{fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '10px'}}>{user.role || 'TRAVELER'}</p>

            <div style={{flex: 1}}></div>

            <button onClick={() => {
                localStorage.removeItem('token');
                onLogout();
            }} className="gold-btn" style={{borderColor: '#ff4444', color: '#ff4444', backgroundColor: 'rgba(255, 68, 68, 0.1)'}}>
              SIGN OUT <LogOut size={16} />
            </button>
          </div>

        ) : (

          /* VIEW 2: LOGIN / SIGNUP FORMS */
          <>
            <div className="drawer-header">
              <h2 className="drawer-title">{isLogin ? 'WELCOME' : 'JOIN THE'} <br /><span className="gold-text">{isLogin ? 'BACK' : 'CLAN'}</span></h2>
            </div>

            {/* --- GOOGLE BUTTON --- */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log('Login Failed')}
                    theme="filled_black"
                    shape="pill"
                    text={isLogin ? "signin_with" : "signup_with"}
                />
            </div>

            {/* DIVIDER */}
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px', color: 'rgba(197, 160, 89, 0.5)', fontSize: '12px'}}>
                <div style={{flex: 1, height: '1px', background: 'rgba(197, 160, 89, 0.2)'}}></div>
                <span style={{padding: '0 10px'}}>OR USE EMAIL</span>
                <div style={{flex: 1, height: '1px', background: 'rgba(197, 160, 89, 0.2)'}}></div>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-group">
                  <User className="icon" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="drawer-input" placeholder="Explorer Name" required />
                </div>
              )}
              <div className="input-group">
                <Mail className="icon" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="drawer-input" placeholder="Email Address" required />
              </div>
              <div className="input-group">
                <Lock className="icon" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="drawer-input" placeholder="Secret Key" required />
              </div>
              <button type="submit" className="gold-btn">{isLogin ? 'LOGIN' : 'SIGN UP'} <ArrowRight size={16} /></button>
            </form>

            <p className="switch-text">
              {isLogin ? "New here?" : "Already initialized?"}
              <span className="switch-link" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create Account" : "Access Login"}</span>
            </p>
          </>
        )}

      </div>
    </>
  );
};

export default Signup;