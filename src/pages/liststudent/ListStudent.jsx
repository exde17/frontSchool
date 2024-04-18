import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./liststudent.css";
import DatatableStudent from "../../components/datatablestudent/DatatableStudent";
import { useAuthEstudiante } from "../../hooks/useAuthEstudiante";

const ListStudent = () => {
  const { estudiantes, loading, eliminarEstudiante } = useAuthEstudiante();
  return (
    <div className="listStudent">
      <Sidebar />
      <div className="container-student">
        <Navbar />
        <DatatableStudent
          estudiantes={estudiantes}
          loading={loading}
          eliminarEstudiante={eliminarEstudiante}
        />
      </div>
    </div>
  );
};

export default ListStudent;