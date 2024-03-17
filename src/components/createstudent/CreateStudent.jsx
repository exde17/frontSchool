import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./createstudent.css";


const CreateStudent = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');


  // Buscar el usuario en la base de datos

  const handleChange = async (event) => {
    const {value} = event.target;
    setSearch(value);
    
    if(value.trim() !== '') {
      try{
        setLoading(true);
        // Recuperar el token de autenticación del localStorage
        const storedToken = localStorage.getItem('token');
        
        // Verificar si el token está presente
        if (!storedToken) {
          throw new Error('Token de autenticación no encontrado en el localStorage');
        }
        const response = await axios.get(`https://render-school.onrender.com/api/persona?search=${value}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setSearchResults(response.data);

      } catch (error) {
        console.error('Error buscando los datos', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]); // Limpiar los resultados se la busqueda esta vacia 
    }
  };
  // __________________________________________


  useEffect(() => {
    // Verifica si el token está en el localStorage al cargar el componente
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const [ formData, setFormData] = useState({

    nombre: "",
    grupo: "",
    acudiente: "",
  });
  
  const handleInput = (event) =>{
    const {name, value } = event.target; 
    setFormData({...formData, [name]: value});
  };
  
  const handleSubmit = async (event,) => {
    event.preventDefault();
    
    try {
      //________________________
      if (!token) {
        throw new Error('Token de autenticación no encontrado en el localStorage');
      }
      //________________________

      const formDataToSend = new FormData();
      // Agregar los archivos al formDataToSend      

      // Agregar los demás datos del formulario al formDataToSend
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Enviar formDataToSend al endpoint
      const API_URL = `https://render-school.onrender.com/api/estudiante`;
      const response = await axios.post(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token de autenticación en el encabezado
          'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
        },
        //_________________________
        // Aquí puedes enviar los datos que deseas al endpoint
        formData: formData,
        
        // Puedes agregar más datos según sea necesario
      });
      console.log('Respuesta del servidor:', response.data);
  
      // Restablecer los campos del formulario después de enviarlos
      setFormData({
        nombre: "",
        grupo: "",
        acudiente: "",
      });

    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };


  return (
    <div className="createStudent">
      <Sidebar/>
      <div className="containerCreate">
        <Navbar/>
        <div className="topCreate">
          <h1>Nuevo Estudiante </h1>
        </div>
        <div className="bottomCreate">
          
            <div className="rightCreate">
              <form onSubmit={handleSubmit}>
                <div className="formInput">
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInput} />
                  {loading && <p> Cargando resultados...</p>}
                  {searchResults.length > 0 && (
                    <ul>
                      {searchResults.map((user) => (
                        <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>  
                  )}
                </div>
                <div className="formInput"> 
                  <label htmlFor="grupo">Grupo</label>
                  <input type="text" id="grupo" name="grupo" value={formData.grupo}  onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="acudiente">Acudiente</label>
                  <input type="text" id="acudiente" name="acudiente" value={formData.acudiente}  onChange={handleInput}/>
                </div>
                
                <div className="boton">
                  <button type='submit'>Enviar</button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  )
}


export default CreateStudent