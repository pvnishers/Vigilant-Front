import React, { useState } from 'react';
import '../css/styles.css';
import FbiPersonDetailsModal from './FbiPersonDetailModal'; // Importe o componente do modal

const FbiPersonCard = ({ person }) => {
  // Função para truncar o assunto
  const truncateSubject = (subject) => {
    const maxLength = 60; // Defina o comprimento máximo desejado
    if (subject.length <= maxLength) {
      return subject;
    } else {
      return subject.substring(0, maxLength) + '...';
    }
  };

  const [modalShow, setModalShow] = useState(false); // Estado para controlar a exibição do modal

  return (
    <div className="card align-items-center person-card">
      <img src={person.images} className="card-img-top custom-image-size mt-2" alt={person.title} />
      <div className="card-body">
        <h5 className="card-title">{person.title}</h5>
        <p className="card-text">Subject: {truncateSubject(person.subjects || 'N/A')}</p>
        <p className="card-text">Nationality: {person.nationality || 'N/A'}</p>
        <button className="btn btn-primary" onClick={() => setModalShow(true)}>
          See details
        </button>
        <FbiPersonDetailsModal
          person={person}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
};

export default FbiPersonCard;
