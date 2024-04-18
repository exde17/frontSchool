import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField } from '@mui/material';
import img from "../../img/no-image-found.png"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import "./new.css"
import { useParams } from "react-router-dom";

const New = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [token, setToken] = useState('');
  const { docenteActualizar } = useParams();
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchDepartamentos(storedToken);
      fetchCiudades(storedToken);
    }
  }, [token]);

  // Se crea el estado del documento
  const [document, setDocument] = useState(null);

  const handleDocument = (event) =>{
    const selectedDocument = event.target.files[0];
    setDocument(selectedDocument);
  };
  
  //Estado de la imagen de perfil
  const [ file, setFile ] = useState("");

  const [ formData, setFormData] = useState({
    
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    tipoIdentificacion: "",
    identificacion: "",
    genero: "",
    email: "",
    telefono: "",
    departamento: "",
    ciudad: "",
    /* 
    barrioId: "",
    corregimientoId: "",
    veredaId: "",
    comunaId: "",
  */

  });
  
  // Función para obtener departamentos del endpoint
  const fetchDepartamentos = async (token) => {
    try {
      const response = await axios.get('https://render-school.onrender.com/api/departamento',{
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token de autenticación en el encabezado
          'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
        },
      });
      setDepartamentos(response.data);
    } catch (error) {
      console.error('Error al obtener departamentos:', error);
    }
  };

  // Función para obtener ciudades del endpoint
  const fetchCiudades = async (token) => {
    try {
      const response = await axios.get('https://render-school.onrender.com/api/ciudad',{
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token de autenticación en el encabezado
          'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
        },
      });
      setCiudades(response.data);
    } catch (error) {
      console.error('Error al obtener ciudades:', error);
    }
  };


  const handleInput = (event) =>{
    const {name, value } = event.target; 
    setFormData({...formData, [name]: value});
  };
  

  const handleSubmit = async (event,) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error('Token de autenticación no encontrado en el localStorage');
      }
      const formDataToSend = new FormData();
      // Agregar los archivos al formDataToSend
      if (document) {
        formDataToSend.append("document", document);
      }
      // Agrega los IDs de departamento y ciudad al formDataToSend
      formDataToSend.append("departamento", formData.departamento.id);
      formDataToSend.append("ciudad", formData.ciudad.id);

      // Agregar los demás datos del formulario al formDataToSend
      Object.keys(formData).forEach((key) => {
        if (key !== "departamento" && key !== "ciudad") { // Evita agregar departamento y ciudad nuevamente
          formDataToSend.append(key, formData[key]);
        }
      });

      // Enviar formDataToSend al endpoint
      const API_URL = 'https://render-school.onrender.com/api/persona';
      const response = await axios.post(API_URL, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token de autenticación en el encabezado
          'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
        },
      });
      console.log('Respuesta del servidor:', response.data);
      alert('Datos enviados con exito');
      // Restablecer los campos del formulario después de enviarlos
      setFormData({

        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        tipoIdentificacion: "",
        identificacion: "",
        genero: "",
        email: "",
        telefono: "",
        departamento: "",
        ciudad: "",
        /* 
        barrioId: "",
        corregimientoId: "",
        veredaId: "",
        comunaId: "",
      */
        
      });

    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };
 
  
  return (
    <div className="new">
      <Sidebar/>
      <div className="containerNew">
        <Navbar/>
        <div className="topNew">
          <h1> Add Nuevo Usuario </h1>
        </div>
        <div className="bottomNew">
          <div className="leftNew">
            <img src= {file ? URL.createObjectURL(file)
              :img} 
            alt="" />  
            <label htmlFor="file"><UploadFileIcon className="fileNew"/></label>
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} 
            style={{display: "none"}} accept=".jpg, .jpeg, .png"/> 
          </div>
            <div className="rightNew">
              <form onSubmit={handleSubmit}>
                <div className="formInput">
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInput}/>
                </div>

                <div className="formInput">
                  <label htmlFor="apellido">Apellido</label>
                  <input type="text" id="apellido" name="apellido" value={formData.apellido}  onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="tipoIdentificacion">Tipo Documento</label>
                  <select id="tipoIdentificacion" name="tipoIdentificacion" value={formData.tipoIdentificacion} onChange={handleInput}>
                    <option value="">Seleccione una opcion</option>
                    <option value="CC">Cedula Ciudadanía</option>
                    <option value="CE">Cedula Extranjeria</option>
                    <option value="TI">Targeta Identidad</option>  
                  </select>
                </div>

                <div className="formInput">
                  <label htmlFor="identificacion">Identificacion</label>
                  <input type="text"  id="identificacion" name="identificacion" value={formData.identificacion}  onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="genero">Genero</label>
                  <select id="genero" name="genero" value={formData.genero}  onChange={handleInput}>
                    <option value="">Seleccione una opcion</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>  
                  </select>
                </div>

                <div className="formInput">
                  <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
                  <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento}  onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email}  onChange={handleInput} />
                </div>
                <div className="formInput">
                  <label htmlFor="telefono">Tel</label>
                  <input type="text" id="telefono" name="telefono" value={formData.telefono}  onChange={handleInput}/>
                </div>


                <div className="formInput">
                  <label htmlFor="departamento">Departamento</label>
                  <Autocomplete
                    id="departamento"
                    options={departamentos}
                    getOptionLabel={(option) => option ? option.nombre : ""}
                    value={formData.departamento}
                    onChange={(event, value) => setFormData({ ...formData, departamento: value})} // Guarda solo la ID del departamento}}
                    renderInput={(params) => <TextField {...params} label="Seleccione" variant="standard" />}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="departamento">Ciudades</label>
                  <Autocomplete
                    id="ciudad"
                    options={ciudades}
                    getOptionLabel={(option) => option ? option.nombre : ""}
                    value={formData.ciudad}
                    onChange={(event, value) => setFormData({ ...formData, ciudad: value})}
                    renderInput={(params) => <TextField {...params} label="Seleccione" variant="standard" />}
                  />
                </div>


                <div className="formInput">
                  <label htmlFor="barrioId">Barrio</label>
                  <input type="text" id="barrioId" name="barrioId" value={formData} onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="corregimientoId">Corregimiento</label>
                  <input type="text" id="corregimientoId" name="corregimientoId" value={formData} onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="veredaId">Vereda</label>
                  <input type="text" id="veredaId" name="veredaId" value={formData} onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="comunaId">Comuna</label>
                  <input type="text" id="comunaId" name="comunaId" value={formData} onChange={handleInput}/>
                </div>
                
                <div className="formDocument">
                  <label htmlFor="archivoInput">Documento</label>
                  <input type="file" id="archivoInput" onChange={handleDocument} 
                  accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"/>
                </div>
                <div className="boton">
                  <button className='enviar' type='submit'>Enviar</button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  )
}


export default New