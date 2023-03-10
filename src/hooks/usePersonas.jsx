import { useState, useEffect } from 'react';
import {API_URL} from '../config/constant';

const usePersonas = (update) => {
  const [personas, setPersonas] = useState([]);
  const [search, setSearch] = useState("");

  // Función para actualizar la búsqueda de procesos
  const onProceso = (event) => {
    setSearch(event.target.value);
  };

  const cargarPersonas = () => {
    fetch(`${API_URL}/personas`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(res => { setPersonas(res) });
  }

  
  const dataArr = [];
  personas.forEach(persona => {
    dataArr.push(persona.proceso);
  });
  const result = new Set(dataArr);
  let procesos = [...result];
  procesos.sort();

  let totalPersonas = personas.length;
  
  // Arreglo para almacenar los resultados de búsqueda
  let results = [];
  if (search !== "") {
    results = personas.filter(personas => personas.proceso === search);
  }
  useEffect(() => {
    cargarPersonas();
  }, [update]);

  
  return { personas, totalPersonas, procesos, onProceso, results, search, setPersonas };
};

export default usePersonas;
