import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/AdminLogin.css';
import googleLogo from '../assets/img/google.png';
import metaLogo from '../assets/img/meta.png';
import appleLogo from '../assets/img/apple-black-logo.png';

const AdminLogin = () => {
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
      const response = await axios.post('http://localhost:3000/api/admin-login', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      const token = response.data.token; // Assuming the response returns a token

      if (token) {
        // Store the token to maintain session
        localStorage.setItem('authToken', token);
        toast.success('Login successful!');
        
        // Redirect after a short delay to allow the toast to display
        setTimeout(() => {
          navigate('/admin-dashboard');
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
      <h2>Welcome back</h2>
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

export default AdminLogin;
