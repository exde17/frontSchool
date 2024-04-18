import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "./datatable.css";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreateAcudiente from "../createacudiente/CreateAcudiente";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const DatatableStudent = ({ estudiantes, loading, eliminarEstudiante }) => {
  const columns = [
    {
      name: "Acciones",
      selector: (row) => (
        <div className="cellAction">
          <button
            style={{ border: "none", cursor: "pointer", background: "none" }}
            onClick={() => eliminarEstudiante(row.id)}
          >
            <DeleteIcon
              className="iconDelete"
              style={{ marginTop: "4px", color: "red" }}
            />
          </button>
          <button
            style={{ border: "none", cursor: "pointer", background: "none" }}
            // onClick={() => capturarInformacion(row)}
          >
            <EditIcon style={{ marginTop: "4px", color: "blue" }} />
          </button>
          <Link to={`/users/test/${row.id}`}>
            <button
              style={{ border: "none", cursor: "pointer", background: "none" }}
            >
              <VisibilityIcon
                style={{ marginTop: "4px", color: "yellowgreen" }}
              />
            </button>
          </Link>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Estudiante",
      selector: (row) => row.persona,
      sortable: true,
    },
    {
      name: "Acudiente",
      selector: (row) => row.acudiente,
      sortable: true,
    },
    {
      name: "Grupo",
      selector: (row) => row.grupo,
      sortable: true,
    },
  ];

  return (
    <div className="datatable">
      <div className="usersNew">
        <section className="content-card-persona">
          <main className="informacion">
            <PersonIcon />
            <h2>Persona</h2>
          </main>
          <Link to="/users">
            <button>GESTIONAR</button>
          </Link>
        </section>
        <section className="content-card-estudiante">
          <main className="informacion">
            <SchoolIcon />
            <h2>Estudiante</h2>
          </main>
          <Link to="/student">
            <button>GESTIONAR</button>
          </Link>
        </section>
        <section className="content-card-docente">
          <main className="informacion">
            <RecordVoiceOverIcon />
            <h2>Funcionario</h2>
          </main>
          <Link to="/teacher">
            <button>GESTIONAR</button>
          </Link>
        </section>
        <section className="content-card-acudiente">
          <main className="informacion">
            <FamilyRestroomIcon />
            <h2>Acudiente</h2>
          </main>
          <Link to="/attendant">
            <button>GESTIONAR</button>
          </Link>
        </section>
      </div>
      <div className="container_levels">
        <header>
          <button
            // onClick={toggleModal}
            style={{
              width: "15rem",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            <PersonAddAlt1Icon
              className="icon-registrar"
              style={{ margin: "0 1px 0 0" }}
            />
            Registrar estudiante
          </button>
        </header>
        { !loading && estudiantes.length === 0 &&
        <h1>Sin dato</h1>
        }
        <section>
          <DataTable
            columns={columns}
            data={estudiantes}
            progressPending={loading}
            pagination
          />
        </section>
        
      </div>
    </div>
  );
};

export default DatatableStudent;
