import React from "react";
import "./listacudiente.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableAcudiente from "../../components/datatableacudiente/DatatableAcudiente";
import { useAuthAcudiente } from "../../hooks/useAuthAcudiente";

const ListAcudiente = () => {
  const { acudientes, loading, eliminarDocente } = useAuthAcudiente();
  return (
    <div className="listAcudiente">
      <Sidebar />
      <div className="container">
        <Navbar />
        <DatatableAcudiente
          acudientes={acudientes}
          loading={loading}
          eliminarDocente={eliminarDocente}
        />
      </div>
    </div>
  );
};

export default ListAcudiente;
