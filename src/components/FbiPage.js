import React, { useState, useEffect } from 'react';
import FbiPersonCard from './FbiPersonCard';
import PaginationComponent from './PaginationComponent';
import FbiFilterForm from './FbiFilterForm';

const FbiPage = () => {
  const [fbiPersons, setFbiPersons] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({
    title: '',
    subject: '',
    nationality: '',
    sex: '',
    race: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({}); // novo estado

  const itemsPerPage = 15;

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  useEffect(() => {
    const fetchData = async () => {
      const queryString = Object.entries(appliedFilters).map(([key, value]) => `${key}=${value}`).join('&');
      try {
        const response = await fetch(
          `https://vigilant-api-a2xyukeyka-uc.a.run.app/fbi/getallwanted?page=${currentPage + 1}&${queryString}`
        );
        if (response.ok) {
          const data = await response.json();
          setFbiPersons(data.wantedList);
          setTotalRecords(data.totalRecords);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do FBI:', error);
      }
    };
    fetchData();
  }, [currentPage, appliedFilters]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3">
          <FbiFilterForm filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
        </div>
        <div className="col-md-9">
          <div className="row">
            {fbiPersons.map((person) => (
              <div key={person.id} className="col-md-4">
                <FbiPersonCard person={person} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <PaginationComponent
        pageCount={Math.ceil(totalRecords / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FbiPage;
