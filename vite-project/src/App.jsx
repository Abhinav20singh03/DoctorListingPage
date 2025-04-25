import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import FilterPanel from "./components/FilterPanel";
import DoctorList from "./components/DoctorList";
import "./App.css";

  function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ consult: "", specialities: [] });
    const [sort, setSort] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]); 

  const allSpecialities = [
      ...new Set(doctorsData.flatMap(d => d.specialities.map(s => s.name)))
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json"); 
        if (!response.ok) {
          throw new Error("Failed to fetch doctor data");
        }
        const data = await response.json();
        setDoctorsData(data);  
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (e) => {
    const { value, type, name, checked } = e.target;

    if (type === "radio") {
      setFilters(prev => ({ ...prev, consult: value }));
    } else if (type === "checkbox") {
      setFilters(prev => ({
        ...prev,
        specialities: checked
          ? [...prev.specialities, value]
          : prev.specialities.filter(item => item !== value)
      }));
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    let docs = [...doctorsData];

    if (searchTerm) {
      docs = docs.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filters.consult) {
      docs = docs.filter(d =>
        filters.consult === "video" ? d.video_consult : d.in_clinic
      );
    }
    if (filters.specialities.length) {
      docs = docs.filter(d =>
        filters.specialities.every(fspec =>
          d.specialities.some(s => s.name === fspec)
        )
      );
    }

    const parseFees = (fee) => {
      return parseInt(fee.replace(/[^0-9]/g, ""), 10);
    };

   
    const parseExperience = (exp) => {
      return parseInt(exp.replace(/[^0-9]/g, ""), 10);
    };

    if (sort === "feesAsc") {
      docs.sort((a, b) => parseFees(a.fees) - parseFees(b.fees)); 
    } else if (sort === "experienceDesc") {
      docs.sort((a, b) => parseExperience(b.experience) - parseExperience(a.experience)); 
    }

    setFilteredDoctors(docs);
  }, [searchTerm, filters, sort, doctorsData]);

  const suggestions = doctorsData
    .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3)
    .map(d => ({
      name: d.name,
      speciality: d.specialities.length > 0 ? d.specialities[0].name : "Speciality not listed"
    }));

  return (
    <div className="app">
      <Header onSearch={handleSearch} suggestions={searchTerm ? suggestions : []} />
      <div className="main">
        <FilterPanel
          onFilterChange={handleFilterChange}
           onSortChange={handleSortChange}
          specialities={allSpecialities}
        />
        <DoctorList doctors={filteredDoctors} />
      </div>
    </div>
  );
}

 export default App;
