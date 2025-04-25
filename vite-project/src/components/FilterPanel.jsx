import React, { useState } from "react";
import "../styles/FilterPanel.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterPanel = ({ onFilterChange, onSortChange, specialities }) => {
  const [showSpecialities, setShowSpecialities] = useState(true);
  const [showConsultation, setShowConsultation] = useState(true);
   const [showSort, setShowSort] = useState(true);

  const handleClearAll = () => {
    window.location.reload();
  };

  return (
    <div className="filter-panel">
     
      <div className="filter-section">
        <div className="filter-header" onClick={() => setShowSort(!showSort)}>
          <h3>Sort by</h3>
          {showSort ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showSort && (
          <div className="sort-options">
            <label>
              <input type="radio" name="sort" value="feesAsc" onChange={onSortChange} />
              Price: Low-High
            </label>
            <label>
              <input type="radio" name="sort" value="experienceDesc" onChange={onSortChange} />
              Experience- Most Experience first
            </label>
          </div>
        )}
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <h3>Filters</h3>
          <button className="clear-all" onClick={handleClearAll}>
            Clear All
          </button>
        </div>

        <div className="sub-filter">
          <div className="sub-header" onClick={() => setShowSpecialities(!showSpecialities)}>
            <h4>Specialities</h4>
            {showSpecialities ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showSpecialities && (
            <div className="speciality-options">
              <input type="text" className="search-input" placeholder="Search" />
              {specialities.map((spec, index) => (
                <label key={index}>
                  <input type="checkbox" value={spec} onChange={onFilterChange} />
                  {spec}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="sub-filter">
          <div className="sub-header" onClick={() => setShowConsultation(!showConsultation)}>
            <h4>Mode of consultation</h4>
            {showConsultation ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showConsultation && (
            <div className="consultation-options">
              <label>
                <input type="radio" name="consult" value="video" onChange={onFilterChange} />
                Video Consultation
              </label>
              <label>
                <input type="radio" name="consult" value="inClinic" onChange={onFilterChange} />
                In-clinic Consultation
              </label>
               <label>
                <input type="radio" name="consult" value="all" onChange={onFilterChange} />
                 All
               </label>
              </div>
           )}
         </div>
      </div>
    </div >
  );
};

export default  FilterPanel; 
