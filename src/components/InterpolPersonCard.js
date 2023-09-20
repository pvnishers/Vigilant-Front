// InterpolPersonCard.js
import React from 'react';

const InterpolPersonCard = ({ person }) => {
  return (
    <div className="card align-items-center person-card">
      <img src={person.thumbnailUrl} className="card-img-top custom-image-size mt-2" alt={person.name} />
      <div className="card-body">
        <h5 className="card-title">{person.name}</h5>
        <p className="card-text">Date of Birth: {person.dateOfBirth || 'N/A'}</p>
        <p className="card-text">Nationalities: {person.nationalities || 'N/A'}</p>
        <a href={person.url} className="btn btn-primary">
          See details
        </a>
      </div>
    </div>
  );
};

export default InterpolPersonCard;
