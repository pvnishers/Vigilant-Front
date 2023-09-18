import React from 'react';
import '../css/styles.css';

const PersonCard = ({ person }) => {
  // Função para truncar o assunto
  const truncateSubject = (subject) => {
    const maxLength = 60; // Defina o comprimento máximo desejado
    if (subject.length <= maxLength) {
      return subject;
    } else {
      return subject.substring(0, maxLength) + '...';
    }
  };

  return (
    <div className="card align-items-center person-card">
      <img src={person.images} className="card-img-top custom-image-size mt-2" alt={person.title} />
      <div className="card-body">
        <h5 className="card-title">{person.title}</h5>
        <p className="card-text">Subject: {truncateSubject(person.subjects || 'N/A')}</p>
        <p className="card-text">Nationality: {person.nationality || 'N/A'}</p>
        <a href={person.url} className="btn btn-primary">
          See details
        </a>
      </div>
    </div>
  );
};

export default PersonCard;
