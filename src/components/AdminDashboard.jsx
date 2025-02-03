import { useState } from 'react';
import { 
  BarChart, Search, Users, Settings, Bell, LogOut, Ticket, Clock, AlertCircle 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const mockData = {
  tickets: [
    { id: 1, customer: "John Doe", subject: "Login Issue", status: "open", priority: "high", date: "2024-02-02" },
    { id: 2, customer: "Jane Smith", subject: "Payment Failed", status: "in_progress", priority: "medium", date: "2024-02-02" },
    { id: 3, customer: "Bob Wilson", subject: "Account Access", status: "closed", priority: "low", date: "2024-02-01" },
  ],
  stats: [
    { name: 'Jan', tickets: 65, resolved: 45 },
    { name: 'Feb', tickets: 59, resolved: 50 },
    { name: 'Mar', tickets: 80, resolved: 70 },
    { name: 'Apr', tickets: 81, resolved: 75 },
    { name: 'May', tickets: 56, resolved: 48 },
    { name: 'Jun', tickets: 55, resolved: 50 },
  ]
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const getStatusClass = (status) => {
    if (status === 'open') return 'status-open';
    if (status === 'in_progress') return 'status-in-progress';
    if (status === 'closed') return 'status-closed';
    return 'status-default';
  };

  const getPriorityClass = (priority) => {
    if (priority === 'high') return 'priority-high';
    if (priority === 'medium') return 'priority-medium';
    if (priority === 'low') return 'priority-low';
    return 'priority-default';
  };

  // Sidebar with additional Profile tab
  const Sidebar = () => (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Support Dashboard</h2>
      </div>
      <nav className="sidebar-nav">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`sidebar-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
        >
          <BarChart size={20} />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          className={`sidebar-nav-btn ${activeTab === 'tickets' ? 'active' : ''}`}
        >
          <Ticket size={20} />
          <span>Tickets</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`sidebar-nav-btn ${activeTab === 'users' ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Users</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`sidebar-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
        
        <button
          onClick={() => setActiveTab('profile')}
          className={`sidebar-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );

  // Header with search and logout
  const Header = () => (
    <header className="header">
      <div className="header-search">
        <input
          type="text"
          placeholder="Search tickets..."
          className="header-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="header-search-icon" size={20} />
      </div>

      <div className="header-actions">
        <button className="header-bell-btn">
          <Bell size={20} />
          <span className="notification-count">3</span>
        </button>
        <div className="header-avatar">
          <span>AD</span>
        </div>
        <button className="header-logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );

  // Dashboard content
  const Dashboard = () => (
    <div className="dashboard-content">
      <div className="dashboard-stats">
        <div className="stat-box">
          <div className="stat-icon bg-blue">
            <Ticket className="icon" size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Tickets</h3>
            <p>1,284</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon bg-green">
            <Clock className="icon" size={24} />
          </div>
          <div className="stat-info">
            <h3>Avg Response</h3>
            <p>2.4h</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon bg-yellow">
            <AlertCircle className="icon" size={24} />
          </div>
          <div className="stat-info">
            <h3>Open Tickets</h3>
            <p>37</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon bg-purple">
            <Users className="icon" size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p>892</p>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Ticket Trends</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tickets" stroke="#3B82F6" />
                <Line type="monotone" dataKey="resolved" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3>Recent Tickets</h3>
          <div className="recent-tickets">
            {mockData.tickets.map(ticket => (
              <div key={ticket.id} className="ticket-item">
                <div className="ticket-info">
                  <h4>{ticket.subject}</h4>
                  <p>{ticket.customer}</p>
                </div>
                <div className="ticket-status">
                  <span className={`status-label ${getStatusClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  <span className={`priority-label ${getPriorityClass(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Profile page content
  const Profile = () => (
    <div className="profile-content">
      <h2>Admin Profile</h2>
      <div className="profile-card">
        <div className="profile-avatar">
          <span>AD</span>
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> Admin User</p>
          <p><strong>Email:</strong> admin@example.com</p>
          {/* Additional profile information can go here */}
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <Header />
      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'tickets' && <div className="tab-content">Tickets Content</div>}
        {activeTab === 'users' && <div className="tab-content">Users Content</div>}
        {activeTab === 'settings' && <div className="tab-content">Settings Content</div>}
        {activeTab === 'profile' && <Profile />}
      </main>
    </div>
  );
};

export default AdminDashboard;
