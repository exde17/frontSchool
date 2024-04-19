import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Autocomplete, TextField} from '@mui/material';
import "./createstudent.css";

const CreateStudent = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [ searchGrupo, setSearchGrupo] = useState('');
  const [ searchGrupoRe, setSearchGrupoRe] = useState([]);
  const [ searchAcudiente, setSearchAcudiente] = useState('');
  const [ searchAcudienteRe, setSearchAcudienteRe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const [formData, setFormData] = useState({
    grupo: "",
    acudiente: "",
    persona: ""
  });


  useEffect(() => {
    // Definimos una función asincrónica dentro del efecto
    const fetchData = async () => {
      try {
        setLoading(true);
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          throw new Error('Token de autenticación no encontrado en el localStorage');
        }
        const response = await axios.get(`https://render-school.onrender.com/api/persona?search=${search}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setLoading(false);
      }
    };
  
    // Llamamos a la función fetchData dentro del efecto cuando el componente se monta y cada vez que `search` cambie
    fetchData();
  }, [search]); // <-- Ahora el efecto se ejecutará cada vez que `search` cambie
  


  useEffect(() => {
    // Definimos una función asincrónica dentro del efecto
    const fetchDataGrupo = async () => {
      try {
        setLoading(true);
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          throw new Error('Token de autenticación no encontrado en el localStorage');
        }
        const response = await axios.get(`https://render-school.onrender.com/api/grupo?search=${searchGrupo}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setSearchGrupoRe(response.data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setLoading(false);
      }
    };
  
    // Llamamos a la función fetchData dentro del efecto cuando el componente se monta y cada vez que `search` cambie
    fetchDataGrupo();
  }, [searchGrupo]); // <-- Ahora el efecto se ejecutará cada vez que `search` cambie



  
  useEffect(() => {
    // Definimos una función asincrónica dentro del efecto
    const fetchDataAcudiente = async () => {
      try {
        setLoading(true);
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          throw new Error('Token de autenticación no encontrado en el localStorage');
        }
        const response = await axios.get(`https://render-school.onrender.com/api/acudiente?search=${searchAcudiente}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setSearchAcudienteRe(response.data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setLoading(false);
      }
    };
  
    // Llamamos a la función fetchData dentro del efecto cuando el componente se monta y cada vez que `search` cambie
    fetchDataAcudiente();
  }, [searchAcudiente]); // <-- Ahora el efecto se ejecutará cada vez que `search` cambie



  const handleSearch = async (value) => {
    setSearch(value);
    if (value.trim() !== '') {
      // Aquí puedes dejar la lógica de búsqueda en tiempo real
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
        console.error('Error buscando los datos:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchGrupo = async (value) => {
    setSearchGrupo(value);
    if (value.trim() !== '') {
      // Aquí puedes dejar la lógica de búsqueda en tiempo real
      try {
        setLoading(true);
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          throw new Error('Token de autenticación no encontrado en el localStorage');
        }
        const response = await axios.get(`https://render-school.onrender.com/api/grupo?search=${value}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setSearchGrupoRe(response.data);
      } catch (error) {
        console.error('Error buscando los datos:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchGrupoRe([]);
    }
  };
  

  const handleSearchAcudiente = async (value) => {
    setSearchAcudiente(value);
    if (value.trim() !== '') {
      // Aquí puedes dejar la lógica de búsqueda en tiempo real
      try {
        setLoading(true);
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          throw new Error('Token de autenticación no encontrado en el localStorage');
        }
        const response = await axios.get(`https://render-school.onrender.com/api/acudiente?search=${value}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setSearchAcudienteRe(response.data);
      } catch (error) {
        console.error('Error buscando los datos:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchAcudienteRe([]);
    }
  };





  const handleInput = (event) => {
    const { name, value } = event.target; 
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
        grupo: "",
        acudiente: "",
        persona: "",
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
                <Autocomplete
                  id="persona"
                  options={searchResults}
                  getOptionLabel={(user) => user.nombre}
                  onInputChange={(event, value) => handleSearch(value)}
                  renderInput={(params) => <TextField {...params} label="Seleccionar Usuario" variant="standard" />}
                />
              </div>
              <div className="formInput">
                <Autocomplete
                  id="grupo"
                  options={searchGrupoRe}
                  getOptionLabel={(user) => user.nombre}
                  onInputChange={(event, value) => handleSearchGrupo(value)}
                  renderInput={(params) => <TextField {...params} label="Seleccionar Grupo" variant="standard" />}
                />
                {/* <label htmlFor="grupo">Grupo</label>
                <input type="text" id="grupo" name="grupo" value={formData.grupo}  onChange={handleInput}/> */}
              </div>
              <div className="formInput">
                <Autocomplete
                  id="acudiente"
                  options={searchAcudienteRe}
                  getOptionLabel={(user) => user.nombre}
                  onInputChange={(event, value) => handleSearchAcudiente(value)}
                  renderInput={(params) => <TextField {...params} label="Seleccionar Acudiente" variant="standard" />}
                />
                {/* <label htmlFor="acudiente">Acudiente</label>
                <input type="text" id="acudiente" name="acudiente" value={formData.acudiente}  onChange={handleInput}/> */}
              </div>
              <div className="boton">
                <button className="enviar" type='submit'>Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateStudent;