import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './deleteuser.css';

const DeleteUser = () => {
    const { id } = useParams();


    // Función para eliminar los datos del usuario
    const deleteUser = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                throw new Error('Token de autenticación no encontrado en el localStorage');
            }
            const response = await axios.delete(`https://render-school.onrender.com/api/persona/${id}`, {
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
        <div className="deleteUser">
            <div className="windowsUser">
                <p className="textUser">¿Seguro que quieres borrar los datos?</p>
                <div className="buttonGroup">
                    <Link to='/users' style={{textDecoration: "none"}}>
                        <button className="primaryUser" onClick={deleteUser}>Sí</button>
                    </Link>
                    <Link to='/users' style={{textDecoration: "none"}}>
                        <button className="secondaryUser">Cancelar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DeleteUser;


