import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./createstudent.css";

const CreateDocente = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la ventana modal
  const [selectedUser, setSelectedUser] = useState(null); // Estado para almacenar el usuario seleccionado

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = async (event) => {
    const { value } = event.target;
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
      } catch (error) {
        console.error('Error buscando los datos', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setFormData({
      ...formData,
      nombre: user.nombre,
      persona: user.id // Agrega el ID seleccionado como "persona"
    });
    setIsModalOpen(false);
  };

  const [ formData, setFormData] = useState({
    nombre: "",
    grupo: "",
    acudiente: "",
    persona: ""  // Agrega el campo "persona" al objeto formData
  });
  
  const handleInput = (event) =>{
    const {name, value } = event.target; 
    setFormData({...formData, [name]: value});
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      if (!token) {
        throw new Error('Token de autenticación no encontrado en el localStorage');
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const API_URL = `https://render-school.onrender.com/api/estudiante`;
      const response = await axios.post(API_URL, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Respuesta del servidor:', response.data);
  
      setFormData({
        nombre: "",
        grupo: "",
        acudiente: "",
        persona: "" // Restablece el campo "persona" después del envío
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
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInput} onClick={handleOpenModal} />
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
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Seleccionar Usuario</h2>
            <ul>
              {searchResults.map((user) => (
                <li key={user.id} onClick={() => handleSelectUser(user)}>{user.nombre}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateDocente;
