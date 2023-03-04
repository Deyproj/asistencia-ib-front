import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import ModalPersona from './modalPersona';
import usePersonas from '../../hooks/usePersonas';
import useActual from '../../hooks/useActual';
import { API_URL } from '../../config/constant';


const TablePersonas = () => {

    const { now, } = useActual();

    const { personas } = usePersonas();
    const [buscador, setBuscador] = useState('')
    const [tablaPersonas, setTablaPersonas] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [personaSeleccionada, setPersonaSeleccionada] = useState({});
    const [observacion, setObservacion] = useState("");

    const buscarChange = e => {
        //Cada que hay un cambio en el input del buscador, se ejecutara esta función
        setBuscador(e.target.value);
        //Llamamos la funcion filtrar y le pasamos el valor del input
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        //Recibimos el valor a buscar
        //Filtramos el valor a buscar en la tabla
        var resultado = personas.filter((persona) => {

            if (persona.proceso.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                persona.idEmpresa.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                persona.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                persona.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())

            ) {
                return persona;
            }
        });

        // Seteamos el resultado a los datos
        setTablaPersonas(resultado);
    }

    const abrirModal = (persona, observacion) => {
        setPersonaSeleccionada(persona);
        setObservacion(observacion);
        setShowModal(true);
    };

    function downloadExcelFile() {
        fetch(`${API_URL}/file/donwload`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            method: 'GET',
        }).then(response => {
            return response.blob();
        }).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Personas Ausentes ${now}`);
            document.body.appendChild(link);
            link.click();
        });
    }


    useEffect(() => {
        setTablaPersonas(personas);
    }, [personas]);

    /*     useEffect(() => {
            tablaPersonas.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
        }, [tablaPersonas]);
     */
    return (
        <>
            <br />
            <div className='card shadow-lg'>
                <div className='row'>
                    <div className='col-12 col-lg-6 mx-4 my-2 me-4 offset-0'>
                        <h3>Personas Ausentes</h3>
                    </div>
                    <div className='col-4  col-lg-4 my-2 mx-4 mx-lg-3 me-4'>
                       {tablaPersonas.length != 0 && <button className='btn btn-outline-primary' onClick={downloadExcelFile}>Descargar Excel</button>}
                    </div>
                </div>
                    <div className='col-10'>
                        <div className="input-group my-2 mx-2 ">
                            <input type="text" className="form-control" value={buscador} onChange={buscarChange} placeholder='Buscar' />
                        </div>
                    </div>
                <table className="table  ">
                    <tbody>
                        {tablaPersonas.map((persona) => {
                            const lastAsistencia = persona.asistencias[persona.asistencias.length - 1];
                            const isCurrentDate = lastAsistencia && lastAsistencia.fecha === now;
                            const isAbsent = isCurrentDate && lastAsistencia.estado === "0";
                            const observacion = lastAsistencia && lastAsistencia.observacion;
                            return (
                                isAbsent &&
                                <tr key={persona.idEmpresa}>
                                    <td><b>{persona.nombre}</b> <br />
                                        <b className='text-primary'>{observacion}</b>
                                    </td>
                                    <td className='text-center'><br />
                                        <button onClick={() => abrirModal(persona, observacion)} className="btn btn-outline-primary"> <FontAwesomeIcon icon={faPersonCircleExclamation} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                        <ModalPersona show={showModal} onHide={() => setShowModal(false)} persona={personaSeleccionada} observacion={observacion} />
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TablePersonas;