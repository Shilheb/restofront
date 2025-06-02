import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext.jsx'
import axios from 'axios'
import { API_ENDPOINTS } from '../../config/api'

const LoginPopup = ({setShowLogin}) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '' // Changed to match backend validation
    });
    const [errors, setErrors] = useState({}); // Add state for errors

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear errors when user types
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const apiUrl = currState === "Login"
                ? API_ENDPOINTS.LOGIN
                : API_ENDPOINTS.REGISTER;
            
            const response = await axios.post(apiUrl, formData);

            if (response.data.status === 'success') {
                localStorage.setItem('user_id', response.data.user.id);
                localStorage.setItem('username', JSON.stringify(response.data.user.name));
                localStorage.setItem('email', JSON.stringify(response.data.user.email));
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setShowLogin(false);
                setToken(response.data.token);
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setErrors({ general: error.response.data.message });
            }
            console.error('Error:', error);
        }
    };

    return (
        <div className='login-popup'>
            <div className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-content">
                    {errors.general && <div className="error-message">{errors.general}</div>}
                    <form onSubmit={handleSubmit} className="login-popup-inputs">
                    {currState==="Sign Up" && (
                        <>
                            <input 
                                type="text" 
                                name="name"
                                placeholder='Your name'
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <div className="error-message">{errors.name}</div>}
                        </>
                    )}
                    <input 
                        type="email"
                        name="email"
                        placeholder='Your email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                    <input 
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                    {currState==="Sign Up" && (
                        <>
                            <input 
                                type="password"
                                name="confirm_password"
                                placeholder='Confirm Password'
                                value={formData.confirm_password}
                                onChange={handleInputChange}
                            />
                            {errors.confirm_password && 
                                <div className="error-message">{errors.confirm_password}</div>
                            }
                        </>
                    )}
                        <button type="submit">{currState==="Login"?"Login":"Create account"}</button>
                    </form>
                    <div className="login-popup-condition">
                        <input type="checkbox" name="" id="" />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                    {currState==="Login"
                        ?<p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>
                        :<p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginPopup
