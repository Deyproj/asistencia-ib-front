import React from 'react';
import { faPersonCircleMinus, faPersonChalkboard, faPeopleGroup, faPersonCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Card from '../components/actual/card';
import usePersonas from '../hooks/usePersonas';
import useAsistencias from '../hooks/useAsistencia';
import TableProcesos from '../components/actual/tableProcesos';
import TablePersonas from '../components/actual/tablePersonas';
import TableObservaciones from '../components/actual/tableObservaciones';
import { API_URL } from '../config/constant';


const Actual = () => {

    const { totalPersonas, } = usePersonas();
    const { ausentes, presentes, totalasistencias } = useAsistencias()

    return (
        <>
            <div className='container principal'>
                <div className='row pt-4 '>
                    <div className='col-12 col-lg-3  my-1 my-lg-0'>
                        <Card numero={totalPersonas} titulo="Total Personas" background="card bg-primary" icon={faPeopleGroup} />
                    </div>
                    <div className='col-12 col-lg-3  my-1 my-lg-0'>
                        <Card numero={totalPersonas && presentes.length} titulo="Personas Presentes" background="card bg-success" icon={faPersonCircleCheck} />
                    </div>
                    <div className='col-12 col-lg-3 my-1 my-lg-0'>
                        <Card numero={totalPersonas && ausentes.length} titulo="Personas Ausentes" background="card bg-danger" icon={faPersonCircleMinus} />
                    </div>
                    <div className='col-12 col-lg-3   my-1 my-lg-0'>
                        <Card numero={totalPersonas && totalPersonas - totalasistencias} titulo="Personas Por Validar" background="card bg-secondary" icon={faPersonChalkboard} />
                    </div>
                    
                </div>
                <div className='row  '>
                    <div className='col-12 col-lg-7 order-3 order-lg-1'>
                        <br />
                        <div>
                            <TableProcesos />
                        </div>
                    </div>
                    <div className='col-12 col-lg-5 order-1 order-lg-2'>
                        <TableObservaciones />
                        <TablePersonas />
                    </div>

                </div>
            </div>
        </>
    );
}

export default Actual;

