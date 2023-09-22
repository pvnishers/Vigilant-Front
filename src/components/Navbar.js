import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/vigilant-logo-blue-white-cut.png';
import { useAuth } from '../contexts/AuthenticationContext';

const Navbar = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate('/login'); 
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
          <img src={logo} alt="Vigilant Core" width="200" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/fbi">FBI</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/interpol">Interpol</NavLink>
            </li>
          </ul>
          {currentUser ? (
            <div className="d-flex ms-auto">
              <span className="navbar-text me-2">
                Olá, {currentUser}!
              </span>
              <button className="btn btn-outline-primary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex ms-auto">
              <button className="btn btn-outline-primary me-2" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/register')}>
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
