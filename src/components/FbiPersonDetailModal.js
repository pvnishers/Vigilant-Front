import React from 'react';

const FbiPersonDetailsModal = ({ person, show, onHide }) => {
  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{person.title} Details</h5>
            <button type="button" className="close" onClick={onHide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img src={person.images} className="img-fluid" alt={person.title} />
            <p><strong>Subject:</strong> {person.subjects || 'N/A'}</p>
            <p><strong>Nationality:</strong> {person.nationality || 'N/A'}</p>
            <p><strong>Sex:</strong> {person.sex || 'N/A'}</p>
            <p><strong>Age (Min-Max):</strong> {person.age_Min || '?'} - {person.age_Max || '?'}</p>
            <p><strong>Locations:</strong> {person.locations || 'N/A'}</p>
            <p><strong>Race:</strong> {person.race || 'N/A'}</p>
            <p><strong>Place of Birth:</strong> {person.place_Of_Birth || 'N/A'}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
            <a href={person.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">See More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FbiPersonDetailsModal;
