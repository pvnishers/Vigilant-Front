import React, { useState } from 'react';
import '../css/styles.css';
import FbiPersonDetailsModal from './FbiPersonDetailModal';
import fallbackImage from '../images/fallback-image.jpg'; 

const FbiPersonCard = ({ person }) => {
  const truncateSubject = (subject) => {
    const maxLength = 60;
    if (subject.length <= maxLength) {
      return subject;
    } else {
      return subject.substring(0, maxLength) + '...';
    }
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage; 
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="card person-card mx-auto d-block">
      <img 
        src={person.images} 
        onError={handleImageError}
        className="card-img-top custom-image-size mt-2 mx-auto d-block" 
        alt={person.title} 
      />
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
