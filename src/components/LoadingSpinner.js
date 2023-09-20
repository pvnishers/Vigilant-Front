import React from 'react';
import '../css/spinner.css'; // Importe o arquivo CSS para a animação

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
