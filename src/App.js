import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/HomePage';
import FbiPage from './components/FbiPage'; 
import InterpolPage from './components/InterpolPage';
import Register from './components/RegisterComponent';
import Login from './components/LoginComponent';
import AdminLoginComponent from './components/AdminLoginComponent';
import AdminDashboard from './components/AdminDashboard';
import { AuthenticationProvider, useAuth } from './contexts/AuthenticationContext';

const Protected = ({ isAdmin, children }) => {
  const { currentUser } = useAuth(); 

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Fragment>{children}</Fragment>;
};

const RoutesWithNavbar = () => {
  const location = useLocation();
  
  return (
    <Fragment>
      {(location.pathname !== '/login' && location.pathname !== '/register') && <Navbar />}
      <Routes>
        <Route path="/" element={<Protected><Home /></Protected>} />
        <Route path="/fbi" element={<Protected><FbiPage /></Protected>} />
        <Route path="/interpol" element={<Protected><InterpolPage /></Protected>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLoginComponent />} />
        <Route path="/admin/dashboard" element={<Protected isAdmin><AdminDashboard /></Protected>} />
      </Routes>
    </Fragment>
  );
};


const App = () => {
  return (
    <AuthenticationProvider>
      <Router>
        <RoutesWithNavbar />
      </Router>
    </AuthenticationProvider>
  );
}

export default App;
