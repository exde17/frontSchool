import { useParams } from "react-router-dom";
import "./viewdocente.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useAuthDocente } from "../../hooks/useAuthDocente";
import avatar1 from "../../img/Avatar1.png";
import avatar2 from "../../img/Avatar2.png";

const ViewDocente = () => {
  const { id } = useParams();
  const { docente } = useAuthDocente(id);

  return (
    <div className="viewDocente">
      <Sidebar />
      <div className="viewContainer">
        <Navbar />
        <div className="arriba">
          <div className="left">
            <div className="editButton">Editar</div>
            <h1 className="titulo">Informacion</h1>
            <div className="item">
              {docente.persona.genero === "Masculino" && (
                <img
                  src={avatar1}
                  className="itemImg"
                  style={{ width: "100px" }}
                />
              )}
              {docente.persona.genero === "Femenino" && (
                <img src={avatar2} className="itemImg" />
              )}
              <div className="detalles">
                <h3 className="nombre" id="nombre">
                  {docente.categoriaFuncionario.nombre}
                </h3>
                <div className="detailItem">
                  <span className="itemKey">Nombre:</span>
                  <span className="itemValue" id="persona">
                    {docente.persona.nombre}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Apellido:</span>
                  <span className="itemValue" id="persona">
                    {docente.persona.apellido}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tipo identificacion:</span>
                  <span className="itemValue" id="identificacion">
                    {docente.persona.tipoIdentificacion}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Identificacion</span>
                  <span className="itemValue" id="identificacion">
                    {docente.persona.identificacion}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="editButton">Editar</div>
            <h1 className="titulo">Informacion Institucion</h1>
            <div className="item">
              <div className="detalles">
                <h1 className="nombre">I. E. los Colores</h1>
                <div className="detailItem">
                  <span className="itemKey">Grado actual</span>
                  <span className="itemValue">1° Primero</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Acudiente</span>
                  <span className="itemValue">Margarita sanchez</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telfono</span>
                  <span className="itemValue">+57 322 354 5655</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ciudad</span>
                  <span className="itemValue">Monteria -</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="calificaciones">Calificaciones</h1>
        </div>
      </div>
    </div>
  );
};

export default ViewDocente;
