import React, { useEffect, useState } from "react";
import { consultarEstudiantes } from "../services/AuthService";
import Swal from "sweetalert2";
import axios from "axios";

export function useAuthEstudiante() {
  const [estudiantes, setEstudiantes] = useState([]);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const cargarEstudiantes = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarEstudiantes();
        setLoading(false);
        setEstudiantes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarEstudiante = async (id) => {
    Swal.fire({
      title: "¿Seguro que desea eliminarlo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Confirmar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminacionConfirmada(id);
      }
    });
  };

  async function eliminacionConfirmada(id) {
    try {
      const data = await axios.delete(
        "https://render-school.onrender.com/api/estudiante/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // if (data.data.message === "Error al eliminar el acudiente") {
      //   Swal.fire({
      //     icon: "info",
      //     title: "¡Cuidado!",
      //     text: "No se puede eliminar el acudiente, porque tiene un estudiante asociado...",
      //   });
      // } else {
      Swal.fire({
        icon: "success",
        title: "¡Eliminado!",
        text: "Estudiante eliminado...",
        showConfirmButton: false,
        timer: 2000,
      });
      // }
      cargarEstudiantes();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al eliminarlo...",
        showConfirmButton: false,
        timer: 2000,
      });
      if (error.response) {
      } else if (error.request) {
        console.error("No se recibio respuesta del servidor");
      } else {
        console.log("Error al eliminar al usuario");
      }
    }
  }

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  return {
    estudiantes,
    loading,
    eliminarEstudiante,
  };
}
