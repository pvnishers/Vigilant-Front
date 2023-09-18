import React, { useState, useEffect } from 'react';
import './bootstrap/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import FilterForm from './components/FilterForm';
import PersonCard from './components/PersonCard';

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
    <>
      <Navbar />
      <div className="row mt-3">
        <FilterForm nameFilter={nameFilter} setNameFilter={setNameFilter} />
        <div className="col-md-10" id="wanted-persons">
          {chunkArray(persons, 3).map((group, index) => (
            <div key={index} className="row mb-3">
              {group.map((person) => (
                <div key={person.id} className="col-md-4">
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
