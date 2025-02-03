import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/AdminLogin.css'; // Optionally adjust the CSS filename if needed
import googleLogo from '../assets/img/google.png';
import metaLogo from '../assets/img/meta.png';
import appleLogo from '../assets/img/apple-black-logo.png';


const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://customer-support-system-backend.vercel.app/api/user-login', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      // Expect the backend to return a JWT token
      const token = response.data.token; 
      if (token) {
        localStorage.setItem('authToken', token);
        toast.success('Login successful!');
        
        // Redirect to user dashboard after a short delay for the toast to display
        setTimeout(() => {
          navigate('/user-dashboard');
        }, 2000);
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      toast.error('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Welcome Back</h2>
      <p>Login to your Acme Inc account</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="forgot-password">
          <a href="#">Forgot your password?</a>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>Or continue with</p>
      <div className="social-login">
        <button className="social-button google">
          <img src={googleLogo} alt="Google" />
        </button>
        <button className="social-button apple">
          <img src={appleLogo} alt="Apple" />
        </button>
        <button className="social-button meta">
          <img src={metaLogo} alt="Meta" />
        </button>
      </div>
      <p>Don't have an account? <a href="#">Sign up</a></p>
      <ToastContainer />
    </div>
  );
};

export default UserLogin;
