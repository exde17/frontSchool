import React from 'react'
import './areaacademica.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Academica from '../../components/areaacademica/Academica';

const AreaAcademica = () => {
  return (
    <div className='areaacademica'>
        <Sidebar/>
        <div className='container'>
            <Navbar/>
            <div>
                <Academica/>
            </div>
        </div>
    </div>
  )
}

export default AreaAcademica