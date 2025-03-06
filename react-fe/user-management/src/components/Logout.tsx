import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
