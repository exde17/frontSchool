import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './deleteasignatura.css';

const DeleteAsignatura = () => {
  const { id } = useParams();


    // Función para eliminar los datos del usuario
    const DeleteAsignatura = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                throw new Error('Token de autenticación no encontrado en el localStorage');
            }
            const response = await axios.delete(`https://render-school.onrender.com/api/asignatura/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            console.log('Datos eliminados:', response.data);
            alert('Datos eliminados');
            // Aquí puedes agregar lógica adicional, como recargar la lista de usuarios
        } catch (error) {
            console.error('Error al eliminar los datos:', error);
        }
    };


    return (
        <div className="deleteAsignatura">
            <div className="windowsAsignatura">
                <p className="textAsignatura">¿Seguro que quieres borrar los datos?</p>
                <div className="buttonGroupAsignatura">
                    <Link to='/asignatura' style={{textDecoration: "none"}}>
                        <button className="primaryAsignatura" onClick={DeleteAsignatura}>Sí</button>
                    </Link>
                    <Link to='/asignatura' style={{textDecoration: "none"}}>
                        <button className="secondaryAsignatura">Cancelar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
  

export default DeleteAsignatura