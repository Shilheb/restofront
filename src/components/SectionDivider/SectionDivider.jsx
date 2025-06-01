import React from 'react';
import './SectionDivider.css';

const SectionDivider = ({ variant = 'default' }) => {
  return (
    <div className={`section-divider ${variant}`}>
      <div className="divider-line"></div>
      <div className="divider-decoration">
        <div className="decoration-dot"></div>
        <div className="decoration-dot"></div>
        <div className="decoration-dot"></div>
      </div>
      <div className="divider-line"></div>
    </div>
  );
};

export default SectionDivider;
