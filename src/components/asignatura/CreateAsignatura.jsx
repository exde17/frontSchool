import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, TextField, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import './createasignatura.css';

const CreateAsignatura = () => {
    const [open, setOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [token, setToken] = useState('');
    const [areasAcademicas, setAreasAcademicas] = useState([]);
    const [area, setArea] = useState(null);

    const handleOpen = () => setOpen(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            fetchAreasAcademicas(storedToken);
        }
    }, [token]);


    const fetchAreasAcademicas = async (token) => {
        try {
            const response = await axios.get('https://render-school.onrender.com/api/area', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setAreasAcademicas(response.data);
        } catch (error) {
            console.error('Error al obtener áreas académicas:', error);
        }
    };


    const handleInputChange = (event) => {
        setNombre(event.target.value);
    };

    const handleClose = () => {
        setNombre('');
        setArea(null);
        setOpen(false);
    };

    const handleSubmit = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                throw new Error('Token de autenticación no encontrado en el localStorage');
            }
            // Crear un nuevo objeto FormData
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('codigo', area.id);

            const response = await axios.post('https://render-school.onrender.com/api/asignatura',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Respuesta del servidor:', response.data);
            alert('Datos enviados', response.data);
            // Limpiar el campo después de enviar los datos
            setNombre('');
            setArea('');
            // Cerrar el modal después de enviar los datos
            handleClose();
        } catch (error) {
            console.error('Error al enviar datos:', error);
            alert('Error al enviar los datos', error);
        }
    };

    return (
        <div>
            {/* Botón para abrir el modal */}
            <button variant="contained" onClick={handleOpen} className='linkDatatable'>Agregar</button>
            {/* Modal para crear área */}
            <Modal open={open} onClose={handleClose} >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <h3>Crear Asignatura</h3>
                    <Autocomplete
                        id="area"
                        options={areasAcademicas}
                        getOptionLabel={(option) => option.nombre}
                        value={area}
                        onChange={(event, newValue) => {
                            setArea(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Seleccione el Área" variant="outlined" />}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        value={nombre}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="outlined" onClick={handleClose} sx={{ mr: 4 }}>Cerrar</Button>
                    <Button variant="contained" onClick={handleSubmit}>Enviar</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateAsignatura;
