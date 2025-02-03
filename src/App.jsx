import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminRegistration from './components/AdminRegistration';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard';
import UserLogin from './components/UserLogin';
import UserRegistration from './components/UserRegistration';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegistration />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/create-ticket" element={<TicketForm />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegistration />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;