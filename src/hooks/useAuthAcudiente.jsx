import React, { useEffect, useState } from "react";
import { consultarAcudiente, consultarAcudientes } from "../services/AuthService";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuthPersona } from "./useAuthPersona";

export function useAuthAcudiente(idAcudienteActualizar) {
  const [acudientes, setAcudientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busquedaAcudiente, setBusquedaAcudiente] = useState("");
  const [persona, setPersona] = useState({});
  const [estadoBusqueda, setEstadoBusqueda] = useState("");
  const { personas } = useAuthPersona();
  const [acudiente, setAcudiente] = useState({});

  const token = localStorage.getItem("token");

  const cargarAcudientes = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarAcudientes();
        setLoading(false);
        setAcudientes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarDocente = async (id) => {
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
        "https://render-school.onrender.com/api/acudiente/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.data.message === "Error al eliminar el acudiente") {
        Swal.fire({
          icon: "info",
          title: "¡Cuidado!",
          text: "No se puede eliminar el acudiente, porque tiene un estudiante asociado...",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "¡Eliminado!",
          text: "Acudiente eliminado...",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      cargarAcudientes();
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

  const handleChangeBusqueda = ({ target }) => {
    setBusquedaAcudiente(target.value);
  };

  const buscarPersona = () => {
    if (busquedaAcudiente === "") {
      Swal.fire({
        icon: "info",
        title: "¡Cuidado!",
        text: "Todos los campos son obligatorios...",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const persona = personas.filter(
        (persona) => persona.identificacion === busquedaAcudiente
      );
      if (persona.length > 0) {
        setPersona(persona[0]);
        setBusquedaAcudiente("");
        setEstadoBusqueda("Con persona");
      } else {
        setEstadoBusqueda("Sin persona");
      }
    }
  };

  const buscarAcudienteActualizar = async () => {
    if (idAcudienteActualizar !== undefined) {
      const data = await consultarAcudiente(idAcudienteActualizar);
      if (data) {
        setPersona(data.persona);
        setAcudiente(data);
        setEstadoBusqueda("Con persona");
      } else {
        setEstadoBusqueda("Sin persona");
      }
    }
  };

  useEffect(() => {
    cargarAcudientes();
    buscarAcudienteActualizar();
  }, []);

  return {
    acudientes,
    loading,
    busquedaAcudiente,
    persona,
    estadoBusqueda,
    acudiente,
    eliminarDocente,
    handleChangeBusqueda,
    buscarPersona,
  };
}
