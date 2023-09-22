import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/HomePage';
import FbiPage from './components/FbiPage'; // Certifique-se de importar o componente FbiPage
import InterpolPage from './components/InterpolPage'; // Certifique-se de importar o componente InterpolPage
import Register from './components/RegisterComponent';
import Login from './components/LoginComponent';
import { AuthenticationProvider, useAuth } from './contexts/AuthenticationContext';

const Protected = ({ isAdmin, children }) => {
  const { currentUser } = useAuth(); 

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && currentUser.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <Fragment>{children}</Fragment>;
};

const App = () => {
  return (
    <AuthenticationProvider>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <Protected>
                <Home />
              </Protected>
            } />
            <Route path="/fbi" element={
              <Protected>
                <FbiPage />
              </Protected>
            } />
            <Route path="/interpol" element={
              <Protected>
                <InterpolPage />
              </Protected>
            } />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Fragment>
      </Router>
    </AuthenticationProvider>
  );
}

export default App;
