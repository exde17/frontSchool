import Datatable from "../../components/datatable/Datatable";
import { ModalPersona } from "../../components/datatable/ModalPersona";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthDepartamento } from "../../hooks/useAuthDepartamento";
import { useAuthPersona } from "../../hooks/useAuthPersona";
import "./list.css";

const List = () => {
  const {
    personas,
    loading,
    openModal,
    persona,
    barrios,
    ciudades,
    corregimientos,
    veredas,
    comunas,
    eliminarPersona,
    toggleModal,
    handleChange,
    registrarPersona,
    capturarInformacion,
    actualizarPersona,
  } = useAuthPersona();

  const { departamentos } = useAuthDepartamento();
  const handlerChange = persona.id ? actualizarPersona : registrarPersona;

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          personas={personas}
          loading={loading}
          eliminarPersona={eliminarPersona}
          toggleModal={toggleModal}
          capturarInformacion={capturarInformacion}
        />
        <ModalPersona
          openModal={openModal}
          toggleModal={toggleModal}
          handleChange={handleChange}
          departamentos={departamentos}
          ciudades={ciudades}
          corregimientos={corregimientos}
          barrios={barrios}
          veredas={veredas}
          comunas={comunas}
          handlerChange={handlerChange}
          persona={persona}
        />
      </div>
    </div>
  );
};

export default List;
