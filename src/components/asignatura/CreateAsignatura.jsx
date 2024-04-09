import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import './createasignatura.css';

const CreateAsignatura = () => {
    const [open, setOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [token, setToken] = useState('');
    const [areasAcademicas, setAreasAcademicas] = useState([]);
    const [areaAcademicaSeleccionada, setAreaAcademicaSeleccionada] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
    }, []);

    const handleInputChange = (event) => {
        setNombre(event.target.value);
    };

    const handleAreaAcademicaChange = (event) => {
        setAreaAcademicaSeleccionada(event.target.value);
    };
    

    useEffect(() => {
        const fetchAreasAcademicas = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                if (!storedToken) {
                    throw new Error('Token de autenticación no encontrado en el localStorage');
                }
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
    
        fetchAreasAcademicas();
    }, []);
    


    const handleSubmit = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                throw new Error('Token de autenticación no encontrado en el localStorage');
            }
            // Crear un nuevo objeto FormData
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('codigo', areaAcademicaSeleccionada);

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
            setAreaAcademicaSeleccionada('');
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
                    <TextField
                        select
                        label="Seleccione el Área"
                        variant="outlined"
                        fullWidth
                        value={areaAcademicaSeleccionada}
                        onChange={handleAreaAcademicaChange}
                        sx={{ mb: 2 }}
                    >
                        {areasAcademicas.map((area) => (
                            <MenuItem key={area.id} value={area.id}>
                                {area.nombre}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        value={nombre}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="outlined" onClick={handleClose} sx={{ mr: 4 }}>Cerrar</Button>
                    <Button variant="contained" onClick={handleSubmit} >Enviar</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateAsignatura;