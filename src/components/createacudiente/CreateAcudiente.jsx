import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./createacudiente.css";
import addDocente from "../../img/AddDocente.png";
import actualizarDocenteImg from "../../img/actualizarUsuario.png";
import avatar1 from "../../img/Avatar1.png";
import avatar2 from "../../img/Avatar2.png";
import { Keyboard } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BadgeIcon from "@mui/icons-material/Badge";
import FemaleIcon from "@mui/icons-material/Female";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MapIcon from "@mui/icons-material/Map";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import { useParams } from "react-router-dom";
import { useAuthAcudiente } from "../../hooks/useAuthAcudiente";
import CreatableSelect from "react-select/creatable";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CreateAcudiente = () => {
  const { id } = useParams();
  const {
    handleChangeBusqueda,
    handleChange,
    busquedaAcudiente,
    estadoBusqueda,
    persona,
    personaOptions,
    selectedOptionPersonas,
    handleChangeFiltro,
    registrarAcudiente,
    buscarPersona,
    actualizarAcudiente,
  } = useAuthAcudiente(id);
  const titulo = id ? "Actualizar acudiente" : "Registrar acudiente";
  const actionButton = id
    ? actualizarAcudiente
    : () => registrarAcudiente(persona.id);
  const nameBurron = id ? "Actualizar" : "Registrar";
  const classButton = id ? "btn-actualizar" : "btn-buscar";

  return (
    <div className="createDocente">
      <Sidebar />
      <div className="containerCreate">
        <Navbar />
        <center>
          <div className="bottomCreate">
            <div className="formulario-contenedor">
              <div className="header">
                <figure className="imagen-header">
                  {id && <img src={actualizarDocenteImg} />}
                  {!id && <img src={addDocente} />}
                </figure>
                <h1>{titulo}</h1>
              </div>
              <section className="contenido">
                <main className="labelContent">
                  <p
                    style={{
                      fontFamily: "revert-layer",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    Seleccione el nombre de la persona
                  </p>
                  <fieldset>
                    <CreatableSelect
                      isClearable
                      options={personaOptions}
                      placeholder="Seleccione la persona..."
                      className="filter-select"
                      classNamePrefix="filter-select"
                      onChange={(selectedOption) =>
                        handleChangeFiltro(selectedOption)
                      }
                      value={selectedOptionPersonas}
                      noOptionsMessage={() => "¡Sin personas para crear un acudiente!"}
                    />
                    {selectedOptionPersonas === null && (
                      <VisibilityOffIcon style={{ margin: "9px 15px 0 0" }} />
                    )}
                    {selectedOptionPersonas !== null && (
                      <button onClick={buscarPersona} className="btn-buscar">
                        <VisibilityIcon style={{ margin: "0 5px 0 0" }} />
                        Ver persona
                      </button>
                    )}
                  </fieldset>
                </main>
                {/* {identificacion && (
                  <>
                    <div className="resultado-persona">
                      <section>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #570217" }}
                        >
                          <AssignmentIcon
                            className="icon"
                            style={{ color: "#570217" }}
                          />
                          <label>{docenteActualizar.identificacion}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #570217" }}
                        >
                          <Keyboard
                            className="icon"
                            style={{ color: "#570217" }}
                          />
                          <label>{docenteActualizar.persona}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #570217" }}
                        >
                          <FemaleIcon
                            className="icon"
                            style={{ color: "#570217" }}
                          />
                          <label>{docenteActualizar.telefono}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #570217" }}
                        >
                          <ApartmentIcon
                            className="icon"
                            style={{ color: "#570217" }}
                          />
                          <label>{docenteActualizar.departamento}</label>
                        </fieldset>
                      </section>
                      <div>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #7451F8" }}
                        >
                          <BadgeIcon
                            className="icon"
                            style={{ color: "#7451F8" }}
                          />
                          <label>{docenteActualizar.ciudad}</label>
                        </fieldset>
                      </div>
                    </div>
                    <center>
                      <hr style={{ border: "1px solid gray", width: "90%" }} />
                    </center>
                    <br />
                    <center>
                      <div className="footer">
                        <main className="labelContent">
                          <p
                            style={{
                              fontFamily: "revert-layer",
                              fontWeight: "bold",
                              fontSize: "18px",
                            }}
                          >
                            Categoria
                          </p>
                          <fieldset>
                            <label>
                              <AccountCircleIcon
                                style={{ margin: "0 0 0 10px" }}
                              />
                              Docente
                            </label>
                            <button
                              className="btn-buscar"
                              onClick={() =>
                                registrarDocente(
                                  persona.id,
                                  "6881bf9c-ac52-4da5-a420-f5fed2f77168"
                                )
                              }
                            >
                              <PersonAddAlt1Icon />
                              Actualizar
                            </button>
                          </fieldset>
                        </main>
                      </div>
                    </center>
                  </>
                )} */}
                {estadoBusqueda === "Con persona" && (
                  <>
                    <div className="resultado-persona">
                      <div className="img-content">
                        {persona.genero === "Masculino" && (
                          <img src={avatar1} />
                        )}
                        {persona.genero === "Femenino" && <img src={avatar2} />}
                      </div>
                      <section>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #02AA95" }}
                        >
                          <AssignmentIcon
                            className="icon"
                            style={{ color: "#02AA95" }}
                          />
                          <label>{persona.tipoIdentificacion}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #02AA95" }}
                        >
                          <Keyboard
                            className="icon"
                            style={{ color: "#02AA95" }}
                          />
                          <label>{persona.nombre}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #02AA95" }}
                        >
                          <FemaleIcon
                            className="icon"
                            style={{ color: "#02AA95" }}
                          />
                          <label>{persona.genero}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #02AA95" }}
                        >
                          <ApartmentIcon
                            className="icon"
                            style={{ color: "#02AA95" }}
                          />
                          <label>{persona.ciudad.nombre}</label>
                        </fieldset>
                      </section>
                      <div>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #31028F" }}
                        >
                          <BadgeIcon
                            className="icon"
                            style={{ color: "#31028F" }}
                          />
                          <label>{persona.identificacion}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #31028F" }}
                        >
                          <Keyboard
                            className="icon"
                            style={{ color: "#31028F" }}
                          />
                          <label>{persona.apellido}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #31028F" }}
                        >
                          <LocalPhoneIcon
                            className="icon"
                            style={{ color: "#31028F" }}
                          />
                          <label>{persona.telefono}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #31028F" }}
                        >
                          <MapIcon
                            className="icon"
                            style={{ color: "#31028F" }}
                          />
                          <label>{persona.departamento.nombre}</label>
                        </fieldset>
                      </div>
                    </div>
                    <center>
                      <hr style={{ border: "1px solid gray", width: "90%" }} />
                    </center>
                    <br />
                    <center>
                      <div className="footer2">
                        <main className="labelContent">
                          <fieldset>
                            <button
                              className={classButton}
                              onClick={() => actionButton()}
                            >
                              {id && (
                                <SensorOccupiedIcon
                                  style={{ margin: "0 2px 0 0" }}
                                />
                              )}
                              {!id && (
                                <PersonAddAlt1Icon
                                  style={{ margin: "0 2px 0 0" }}
                                />
                              )}
                              {nameBurron}
                            </button>
                          </fieldset>
                        </main>
                      </div>
                    </center>
                  </>
                )}
                {estadoBusqueda === "Sin persona" && (
                  <>
                    <div className="resultado-persona">
                      <section className="personaNoEncontrada">
                        <h1>
                          Esta persona no se encuentra registrada{" "}
                          <SearchOffIcon />
                        </h1>
                      </section>
                    </div>
                  </>
                )}
                {estadoBusqueda === "Persona registrada" && (
                  <>
                    <div className="resultado-persona">
                      <section className="personaRegistrada">
                        <h1>
                          El docente fue registrado de manera exitosa{" "}
                          <CheckBoxIcon />
                        </h1>
                      </section>
                    </div>
                  </>
                )}
                {!(estadoBusqueda === "Con persona") &&
                  !(estadoBusqueda === "Sin persona") &&
                  !(estadoBusqueda === "Persona registrada") && (
                    // !(identificacion) &&
                    <>
                      <div className="resultado-persona">
                        <section className="personaBuscar">
                          <h1>
                            Buscar en el sistema <PersonSearchIcon />
                          </h1>
                        </section>
                      </div>
                    </>
                  )}
              </section>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
};
export default CreateAcudiente;
