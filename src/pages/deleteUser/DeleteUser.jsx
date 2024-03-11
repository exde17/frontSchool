import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./deleteuser.css";

const DeleteUser = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);

    const deletedData = async () => {
        try{
            // Obtener el token de autenticación del localStorage
            const storedToken = localStorage.getItem('token');

            // Verificar si el token está presente
            if (!storedToken) {
                throw new Error('Token de autenticación no encontrado en el localStorage');
            }

            // Realizar la solicitud DELETE a la API incluyendo el token de autenticación en el encabezado
            const response = await axios.delete(`https://render-school.onrender.com/api/persona/${id}`, {
                headers: {
                Authorization: `Bearer ${storedToken}`,
                },
            });
            
            console.log('Datos eliminados:', response.data);
            showModal(false);
        }catch (error) {
            console.error('Error al eliminar los datos:', error);
          }
    };


  return (
    <div className='delete'>
        <div className='windows' >
            <button className='primary' onClick={() => setShowModal(true)}> Eliminar datos  </button>
            {/* Modal de confirmación */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                            <p>¿Seguro que quieres borrar los datos?</p>
                        <div className="modal-button">
                            <button className='secondary' onClick={deletedData}>Sí</button>
                            <button className='secondary' onClick={() => setShowModal(false)} >Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default DeleteUser