import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './company.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const Company = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  
  const [formData, setFormData] = useState({
    nombre: "",
    nit: "",
    codigo: "",
    correo: "",
    telefono: "",
    direccion: "",
    dane: "",
    departamento: "",
    ciudad: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target; 
    setFormData({ ...formData, [name]: value });
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

      const API_URL = `https://render-school.onrender.com/api/empresa`;
      const response = await axios.post(API_URL, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Respuesta del servidor:', response.data);
  
      setFormData({
        nombre: "",
        nit: "",
        codigo: "",
        correo: "",
        telefono: "",
        direccion: "",
        dane: "",
        departamento: "",
        ciudad: "",
      });

    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };


  return (
    <div className='company'>
        <Sidebar/>
        <div className='container'>
          <Navbar/> 
          <div className='bodyCompany'>
            <div className='title-company'>
              <h2>Crear Compañia</h2>
            </div>
            <div className='formCompany'>

              <form className="form-container"  onSubmit={handleSubmit}> 
                <div className='form-pair'>

                  <div className="formInput">   
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value={formData.nombre}  onChange={handleInput}/>
                  </div>
                  <div className="formInput">   
                    <label htmlFor="nit">NIT</label>
                    <input type="text" id="nit" name="nit" value={formData.nit}  onChange={handleInput}/>
                  </div>

                </div>
                <div className='form-pair'>

                  <div className="formInput">   
                    <label htmlFor="codigo">Codigo</label>
                    <input type="text" id="codigo" name="codigo" value={formData.codigo}  onChange={handleInput}/>
                  </div>
                  <div className="formInput">   
                    <label htmlFor="correo">Correo</label>
                    <input type="email" id="correo" name="correo" value={formData.correo}  onChange={handleInput}/>
                  </div>

                </div>
                <div className='form-pair'>
                  
                  <div className="formInput">   
                    <label htmlFor="telefono">Telefono</label>
                    <input type="text" id="telefono" name="telefono" value={formData.telefono}  onChange={handleInput}/>
                  </div>
                  <div className="formInput">   
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" id="direccion" name="direccion" value={formData.direccion}  onChange={handleInput}/>
                  </div>
                
                </div>
                <div className='form-pair'>

                  <div className="formInput">   
                    <label htmlFor="dane">Dane</label>
                    <input type="text" id="dane" name="dane" value={formData.dane}  onChange={handleInput}/>
                  </div>
                  <div className="formInput">   
                    <label htmlFor="departamento">Departamento</label>
                    <input type="text" id="departamento" name="departamento" value={formData.departamento}  onChange={handleInput}/>
                  </div>
                </div>
                <div className='form-pair'>

                  <div className="formInput">   
                    <label htmlFor="ciudad">Ciudad</label>
                    <input type="text" id="ciudad" name="ciudad" value={formData.ciudad}  onChange={handleInput}/>
                  </div>
                  
                </div>

                <div className="form-submit">
                  <button type='submit'>Enviar</button>
                </div>
              </form>

            </div>
            
          </div>
        </div>
    </div>
  )
}

export default Company