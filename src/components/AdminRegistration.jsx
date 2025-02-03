import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/AdminRegistration.css'; // Ensure you create this CSS file or adjust as needed

const AdminRegistration = () => {
  // Initialize form data with role automatically set to 'admin'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Admin'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Force the role to be 'admin' in case of any accidental change.
    const registrationData = { ...formData, role: 'Admin' };

    try {
      const response = await axios.post(
        'http://localhost:3000/api/admin-register',
        registrationData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success('Admin registered successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      // Display error message from backend if available
      toast.error(error.response?.data.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
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
        {/* Role input removed to enforce 'admin' */}
        <button type="submit">Register as Admin</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AdminRegistration;
