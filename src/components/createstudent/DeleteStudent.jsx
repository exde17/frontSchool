import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./deletestudent.css";

const DeleteStudent = () => {
    const { id } = useParams();


    // Función para eliminar los datos del usuario
    const deleteStudent = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                throw new Error('Token de autenticación no encontrado en el localStorage');
            }
            const response = await axios.delete(`https://render-school.onrender.com/api/estudiante/${id}`, {
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
        <div className="deleteStudent">
            <div className="windowsStudent">
                <p className="textStudent">¿Seguro que quieres borrar los datos?</p>
                <div className="buttonGroupStudent">
                    <Link to='/student' style={{textDecoration: "none"}}>
                        <button className="primaryStudent" onClick={deleteStudent}>Sí</button>
                    </Link>
                    <Link to='/student' style={{textDecoration: "none"}}>
                        <button className="secondaryStudent">Cancelar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DeleteStudent
