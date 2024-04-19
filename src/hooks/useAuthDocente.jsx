import React, { useEffect, useState } from "react";
import { consultarDocente, consultarDocentes } from "../services/AuthService";
import { useAuthPersona } from "./useAuthPersona";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useAuthDocente(idDocenteActualizar) {
  const navigate = useNavigate();
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [busquedaDocente, setBusquedaDocente] = useState("");
  const [persona, setPersona] = useState({});
  const [docente, setDocente] = useState({
    persona: "",
    categoriaFuncionario: "",
  });
  const [estadoBusqueda, setEstadoBusqueda] = useState("");
  const { personas } = useAuthPersona();
  const [idcategoria, setIdCategoria] = useState({
    categoriaFuncionario: "",
  });
  const [selectedOptionPersonas, setSelectedOptionPersonas] = useState(null);

  // const persons = Array.from(new Set(personas.map((persona) => persona)));

  const personasNoDocentes = personas.filter(
    (persona) => !docentes.some((docente) => docente.idPersona === persona.id)
  );

  const personaOptions = personasNoDocentes.map((persona) => ({
    value: persona.identificacion,
    label: persona.nombre + " " + persona.apellido,
  }));

  const handleChangeFiltro = (selectedOption) => {
    setSelectedOptionPersonas(selectedOption);
  };
  const handleChangeBusqueda = ({ target }) => {
    setBusquedaDocente(target.value);
  };

  const handleChange = ({ target }) => {
    setIdCategoria({
      ...idcategoria,
      [target.name]: target.value,
    });
  };

  const cargarDocentes = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarDocentes();
        setLoading(false);
        setDocentes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buscarPersona = () => {
    if (selectedOptionPersonas === null) {
      Swal.fire({
        icon: "info",
        title: "¡Cuidado!",
        text: "Todos los campos son obligatorios...",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const persona = personas.filter(
        (persona) => persona.identificacion === selectedOptionPersonas.value
      );
      if (persona.length > 0) {
        setPersona(persona[0]);
        setSelectedOptionPersonas(null);
        setEstadoBusqueda("Con persona");
      } else {
        setEstadoBusqueda("Sin persona");
      }
    }
  };
  const registrarDocente = async (id) => {
    if (id === "" || idcategoria.categoriaFuncionario === "") {
      Swal.fire({
        icon: "info",
        title: "¡Cuidado!",
        text: "Todos los campos son obligatorios...",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      try {
        const docente = {
          persona: id,
          categoriaFuncionario: idcategoria.categoriaFuncionario,
        };
        const data = await axios.post(
          "https://render-school.onrender.com/api/docente",
          docente,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.data.message == "Docente creado correctamente") {
          Swal.fire({
            icon: "success",
            title: "Funcionario registrado!",
            text: "Registro exitoso...",
            showConfirmButton: false,
            timer: 2000,
          });
          setBusquedaDocente("");
          setEstadoBusqueda("Persona registrada");
          cargarDocentes();
          navigate("/teacher");
        } else {
          Swal.fire({
            icon: "warning",
            title: "¡No completado!",
            text: "Ya existe un funcionario con estos datos...",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {}
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
      await axios.delete(
        "https://render-school.onrender.com/api/docente/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "¡Eliminado!",
        text: "Funcionario eliminado...",
        showConfirmButton: false,
        timer: 2000,
      });
      cargarDocentes();
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

  const buscarDocenteActualizar = async () => {
    if (idDocenteActualizar !== undefined) {
      const data = await consultarDocente(idDocenteActualizar);
      if (data) {
        setPersona(data.persona);
        setDocente(data);
        setEstadoBusqueda("Con persona");
      } else {
        setEstadoBusqueda("Sin persona");
      }
    }
  };

  const actualizarDocente = async () => {
    if (idcategoria.categoriaFuncionario !== "") {
      try {
        const docenteActualizar = {
          persona: persona.id,
          categoriaFuncionario: idcategoria.categoriaFuncionario,
        };
        const data = await axios.patch(
          "https://render-school.onrender.com/api/docente/" +
            idDocenteActualizar,
            docenteActualizar,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.data.message == "Docente actualizado correctamente") {
          Swal.fire({
            icon: "success",
            title: "¡Actualizado!",
            text: "Funcionario actualizado...",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/teacher");
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Error al actualizar...",
          showConfirmButton: false,
          timer: 2000,
        });
        if (error.response) {
        } else if (error.request) {
          console.error("No se recibio respuesta del servidor");
        } else {
          console.log("Error al actualizar al usuario");
        }
      }
    } else {
      try {
        const docenteActualizar = {
          persona: persona.id,
          categoriaFuncionario: docente.categoriaFuncionario.id,
        };
        const data = await axios.patch(
          "https://render-school.onrender.com/api/docente/" +
            idDocenteActualizar,
          docenteActualizar,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.data.message == "Docente actualizado correctamente") {
          Swal.fire({
            icon: "success",
            title: "¡Actualizado!",
            text: "Funcionario actualizado...",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/teacher");
        } else {
          Swal.fire({
            icon: "info",
            title: "¡Cuidado!",
            text: "Esta persona ya tiene un cargo definido..",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Error al actualizar...",
          showConfirmButton: false,
          timer: 2000,
        });
        if (error.response) {
        } else if (error.request) {
          console.error("No se recibio respuesta del servidor");
        } else {
          console.log("Error al actualizar al usuario");
        }
      }
    }
  };

  useEffect(() => {
    cargarDocentes();
    buscarDocenteActualizar();
  }, []);

  return {
    docentes,
    loading,
    busquedaDocente,
    persona,
    docente,
    estadoBusqueda,
    personaOptions,
    selectedOptionPersonas,
    handleChangeBusqueda,
    buscarPersona,
    registrarDocente,
    eliminarDocente,
    actualizarDocente,
    handleChange,
    handleChangeFiltro,
  };
}
