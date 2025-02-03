import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/UserRegistration.css'; 

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '', 
    email: ''
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://customer-support-system-backend.vercel.app/api/user-register', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        toast.success(response.data.message || 'User registered successfully!');
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Registration failed. Please try again.';
      toast.error(errorMessage);
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="registration-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-field">
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
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input 
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-field">
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
        <button type="submit" className="submit-btn">Register</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserRegistration;
