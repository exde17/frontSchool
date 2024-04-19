import { useParams } from "react-router-dom";
import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useAuthPersona } from "../../hooks/useAuthPersona";
import avatar1 from "../../img/Avatar1.png";
import avatar2 from "../../img/Avatar2.png";

const Single = () => {
  const { id } = useParams();
  const { persona } = useAuthPersona(id);
  console.log(persona);
  return (
    <div className="viewStudent">
      <Sidebar />
      <div className="viewContainer">
        <Navbar />
        <div className="arriba">
          <div className="left">
            <div className="editButton">Editar</div>
            <h1 className="titulo">Informacion</h1>
            <div className="item">
              {persona.genero === "Masculino" && (
                <img src={avatar1} className="itemImg" style={{ width: "100px" }}/>
              )}
              {persona.genero === "Femenino" && (
                <img src={avatar2} className="itemImg" />
              )}
              <img alt="" />
              <div className="detalles">
                <h3 className="nombre" id="nombre">
                  {persona.nombre} {persona.apellido}
                </h3>
                <div className="detailItem">
                  <span className="itemKey">Tipo identificacion: </span>
                  <span className="itemValue" id="persona">
                    {persona.tipoIdentificacion}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Identificacion: </span>
                  <span className="itemValue" id="grupo">
                    {persona.identificacion}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ciudad: </span>
                  <span className="itemValue" id="acudiente">
                    {persona.ciudad.nombre}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Departamento:</span>
                  <span className="itemValue" id="acudiente">
                    {persona.departamento.nombre}
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

export default Single;
