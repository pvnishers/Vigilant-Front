import React, { useState, useEffect } from 'react';
import './bootstrap/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import InterpolPage from './components/InterpolPage'; 
import FbiPage from './components/FbiPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
  const [setPersons] = useState([]);

  useEffect(() => {
    fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/fbi/getallwanted?page=1')
      .then((response) => response.json())
      .then((data) => setPersons(data))
      .catch((error) => console.error('Erro ao buscar dados:', error));
  }, []);

  return (
    <Router>
      <>
        <Navbar />
        <div className="row mt-3">
          <div className="col-md-10" id="wanted-persons">
            <Routes>
              <Route path="/fbi" element={<FbiPage/>}>
              </Route>
              <Route path="/interpol" element={<InterpolPage/>}>
              </Route>
              <Route path="/">
              </Route>
            </Routes>
          </div>
        </div>
      </>
    </Router>
  );
};

export default App;
