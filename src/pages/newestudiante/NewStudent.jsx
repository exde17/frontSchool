import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import CreateStudent from '../../components/createstudent/CreateStudent'

const NewStudent = () => {
  return (
    <div className='newStudent'>
        <Sidebar/>
        <div className='container'>
            <Navbar/>
            <CreateStudent/>
        </div>

    </div>
  )
}

export default NewStudent