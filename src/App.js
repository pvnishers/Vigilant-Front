import React, { useState, useEffect } from 'react';
import './bootstrap/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import InterpolPage from './components/InterpolPage'; 
import FbiPage from './components/FbiPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    // Use o método fetch para fazer a solicitação HTTP
    fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/fbi/getallwanted?page=1')
      .then((response) => response.json())
      .then((data) => setPersons(data))
      .catch((error) => console.error('Erro ao buscar dados:', error));
  }, []);

  // Função para dividir o array de persons em grupos de 3
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  return (
    <Router>
      <>
        <Navbar />
        <div className="row mt-3">
          <div className="col-md-10" id="wanted-persons">
            <Routes>
              {/* Rota para a página do FBI */}
              <Route path="/fbi" element={<FbiPage/>}>
              </Route>
              {/* Rota para a página da Interpol */}
              <Route path="/interpol" element={<InterpolPage/>}>
              </Route>
              {/* Rota padrão (outras páginas) */}
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
