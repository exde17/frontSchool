import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './academica.css';

const Academica = () => {
    const [token, setToken] = useState('');
    const [formData, setFormData] = useState({ nombre: '' });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!token) {
                throw new Error('Token de autenticación no encontrado en el localStorage');
            }
            const response = await axios.post(
                'https://render-school.onrender.com/api/area',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Respuesta del servidor:', response.data);
            // Limpiar el formulario después de enviar los datos
            setFormData({ nombre: '' });
        } catch (error) {
            console.error('Error al enviar datos:', error);
            alert('Error al enviar los datos',error);
        }
    };

    return (
        <div className="academica">
            <div className="container-acacemico">
                <div className="title-academico">
                    <h2>Area Academica</h2>
                </div>
                <div className="body-academico">
                    <form onSubmit={handleSubmit}>
                        <div className="form-Input">
                            <label htmlFor="academico">Area Academica</label>
                            <input
                                type="text"
                                id="academico"
                                name="nombre"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-submit">
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Academica;

