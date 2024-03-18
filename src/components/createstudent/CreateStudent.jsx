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
  useEffect(() => {
    // Verifica si el token está en el localStorage al cargar el componente
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSearch = async (value) => {
    setSearch(value);
    
    if (value.trim() !== '') {
      try {
        setLoading(true);
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          throw new Error('Token de autenticación no encontrado en el localStorage');
        }
        const response = await axios.get(`https://render-school.onrender.com/api/persona?search=${value}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setSearchResults(response.data);
        console.log(value);
      } catch (error) {
        console.error('Error buscando los datos', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };


  const handleSelect = (event) => {
    const selectUserId = parseInt(event.target.value);
    const selectedUser = searchResults.find((user) => user.id === selectUserId);
    if (selectedUser) {
      setFormData({
        ...formData,
         // Aquí puedes agregar más campos según sea necesario
        persona: selectedUser.id    // Agrega el ID seleccionado como "persona"
      });
    }
  };

  const [ formData, setFormData] = useState({
 
    grupo: "",
    acudiente: "",
    persona: "" // Agrega el campo "persona" al objeto formData
  });
  
  const handleInput = (event) =>{
    const {name, value } = event.target; 
    setFormData({...formData, [name]: value});
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      //________________________
      if (!token) {
        throw new Error('Token de autenticación no encontrado en el localStorage');
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      //________________________
      // Enviar formDataToSend al endpoint
      const API_URL = `https://render-school.onrender.com/api/estudiante`;
      const response = await axios.post(API_URL, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token de autenticación en el encabezado
          'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
        },
        //_________________________
        // Aquí puedes enviar los datos que deseas al endpoint
       
        // Puedes agregar más datos según sea necesario
      });
      console.log('Respuesta del servidor:', response.data);
  
      // Restablecer los campos del formulario después de enviarlos
      setFormData({
        
        grupo: "",
        acudiente: "",
        persona: "" // Agrega el campo "persona" al objeto formData
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
                  <label htmlFor="persona">Nombre</label>
                  <input type="text" id="persona" name="persona" value={formData.persona} onChange={handleInput} />
                 {/* onChange={ (e) => handleSearch(e.target.value)} */}
                  <select onChange={handleSelect}>
                    <option value="">Seleccionar Usuarios</option>
                    {searchResults.map((user) =>(
                      <option key={user.id} value={user.id}>{user.id}</option>
                    ))}
                      
                  </select>
                  {loading && <p> Cargando resultados...</p>}
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