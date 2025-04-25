import React from "react";
import DoctorCard from "./DoctorCard";
import "../styles/DoctorList.css";

const DoctorList = ({ doctors }) => {
   return (
    <div className="doctor-list">
       {doctors.map(doc => <DoctorCard key={doc.id} doctor={doc} />)}
       </div>
  );
 };

export   default DoctorList;
