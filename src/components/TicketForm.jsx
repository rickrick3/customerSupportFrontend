import  { useState } from 'react';
import axios from 'axios';
import '../styles/TicketForm.css';

const TicketForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://customer-support-system-backend.vercel.app/api/tickets', formData);
      console.log('Ticket created successfully');
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div className="ticket-form">
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default TicketForm;