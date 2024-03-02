import "./single.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import List from "../../components/datatable/Datatable"


const Single = () => {
  return (
    <div className="single">
      <Sidebar/>
      <div className="singleContainer">
        <Navbar/>
        <div className="arriba">
          <div className="left">
            <div className="editButton">Editar</div>
            <h1 className="titulo">Informacion</h1>
            <div className="item">
              <img alt="" className="itemImg" />
              <div className="detalles">
                <h1 className="nombre">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email</span>
                  <span className="itemValue">janedoe@gmail.com</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telefono</span>
                  <span className="itemValue">+57 312 456 6789</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">Direccion</span>
                  <span className="itemValue">Cll 290 / 20 # 34-98</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pais</span>
                  <span className="itemValue">Colombia</span>  
                </div>
              </div>
            </div>
          </div>
          <div className="right">
          <div className="editButton">Editar</div>
          <h1 className="titulo">Informacion Institucion</h1>
          <div className="item">
              <div className="detalles">
                <h1 className="nombre">I. E. los Colores</h1>
                <div className="detailItem">
                  <span className="itemKey">Grado actual</span>
                  <span className="itemValue">1° Primero</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">Acudiente</span>
                  <span className="itemValue">Margarita sanchez</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telfono</span>
                  <span className="itemValue">+57 322 354 5655</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ciudad</span>
                  <span className="itemValue">Monteria -</span>  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="calificaciones">Calificaciones</h1>
          <List/>
        </div>
      </div>
    </div>
  )
}

export default Single