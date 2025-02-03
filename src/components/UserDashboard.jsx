// src/components/UserDashboard.jsx
import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiChevronRight } from 'react-icons/fi';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTicket, setNewTicket] = useState({ title: '', description: '', priority: 'medium' });

  // Mock data - replace with API calls
  useEffect(() => {
    const mockTickets = [
      { id: 1, title: 'Payment Issue', status: 'open', priority: 'high', updated: '2h ago' },
      { id: 2, title: 'Login Problem', status: 'in-progress', priority: 'medium', updated: '1d ago' },
      { id: 3, title: 'Feature Request', status: 'resolved', priority: 'low', updated: '3d ago' },
    ];
    setTickets(mockTickets);
  }, []);

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    // Add API submission logic here
    setShowNewTicketModal(false);
    setNewTicket({ title: '', description: '', priority: 'medium' });
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Support Dashboard</h1>
        <div className="header-actions">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="new-ticket-btn"
            onClick={() => setShowNewTicketModal(true)}
          >
            <FiPlus /> New Ticket
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Open Tickets</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p>5</p>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <p>23</p>
        </div>
      </div>

      {/* Tickets List */}
      <div className="tickets-list">
        {filteredTickets.map(ticket => (
          <div key={ticket.id} className={`ticket-card priority-${ticket.priority}`}>
            <div className="ticket-header">
              <span className={`status-dot ${ticket.status}`}></span>
              <h4>{ticket.title}</h4>
              <span className="priority-badge">{ticket.priority}</span>
            </div>
            <div className="ticket-footer">
              <span>Last updated: {ticket.updated}</span>
              <button className="view-details-btn">
                View Details <FiChevronRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="modal-overlay">
          <div className="new-ticket-modal">
            <h2>Create New Ticket</h2>
            <form onSubmit={handleSubmitTicket}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowNewTicketModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;