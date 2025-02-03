import  { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TicketList.css';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios.get('http://localhost:3000/api/tickets');
      setTickets(response.data);
    };
    fetchTickets();
  }, []);

  return (
    <div className="ticket-list">
      <h2>Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;