import React from "react";
import "../styles/DoctorCard.css";
import { FaHospitalAlt, FaMapMarkerAlt } from "react-icons/fa";

const DoctorCard = ({ doctor }) => {

  const experienceYears = doctor.experience
    ? doctor.experience.match(/\d+/)?.[0] 
    : "";

  return (
    <div className="doctor-card">
      <div className="left-section">
            <img src={doctor.photo} alt={doctor.name} className="doctor-img" />
        <div className="doctor-info">
          <h2 className="doctor-name">{doctor.name}</h2>
          <p className="doctor-speciality">
            {doctor.specialities?.map(s => s.name).join(", ") || ""}
          </p>
          <p className="doctor-degree">
            {doctor.degrees?.join(", ") || ""}
          </p>
          <p className="doctor-experience">
            {experienceYears} yrs exp.
          </p>
          <div className="clinic-line">
             <FaHospitalAlt className="icon" />
            <span className="clinic-name">{doctor.clinic.name}</span>
          </div>
          <div className="clinic-line">
            <FaMapMarkerAlt className="icon" />
            <span className="clinic-location">{doctor.clinic.address.locality}</span>
          </div>
        </div>
      </div>
       <div className="right-section">
         <p className="fees">{doctor.fees}</p>
           <button className="book-btn">Book Appointment</button>
      </div>
    </div>
  );
};

export default DoctorCard;
