import React from 'react'
import './listasignatura.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DatatableAsignatura from '../../components/datatableasignatura/DatatableAsignatura';


const ListAsignatura = () => {
  return (
    <div className='listAsignatura'>
        <Sidebar/>
        <div className='container'>
            <Navbar/>
            <DatatableAsignatura/>
        </div>
    </div>
  )
}

export default ListAsignatura