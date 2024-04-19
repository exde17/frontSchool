import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLogin from "./context/authlogin.jsx";
import Login from "../src/pages/login/login.jsx";
import LoginUser from "../src/pages/signUp/LoginUser.jsx";
import Home from "./pages/home/Home.jsx";
import List from "./pages/list/List.jsx";
import Single from "./pages/single/Single.jsx";
import New from "./pages/new/New.jsx";
import Followup from "./pages/followup/Followup.jsx";
import Logout from "./components/logout/Logout.jsx";
import EditUser from "./pages/editUser/EditUser.jsx";
import DeleteUser from "./pages/deleteUser/DeleteUser.jsx";
import DeleteDocente from "./components/createdocente/DeleteDocente.jsx";
import DeleteStudent from "./components/createstudent/DeleteStudent.jsx";
import ViewStudent from "./components/createstudent/ViewStudent.jsx";
import ViewDocente from "./components/createdocente/ViewDocente.jsx";
import CreateStudent from "./components/createstudent/CreateStudent.jsx";
import CreateDocente from "./components/createdocente/CreateDocente.jsx";
import EditStudent from "./components/createstudent/EditStudent.jsx";
import EditDocente from "./components/createdocente/EditDocente.jsx";
import ListStudent from "./pages/liststudent/ListStudent.jsx";
import ListDocente from "./pages/listdocente/ListDocente.jsx";
import ListAcudiente from "./pages/listacudiente/ListAcudiente.jsx";
import Company from "./pages/company/Company.jsx";
import { ListEducationLevels } from "./pages/educationLevel/ListEducationLevels.jsx";
import AreaAcademica from "./pages/areaacademica/AreaAcademica.jsx";
import Academica from "./components/areaacademica/Academica.jsx";
import DeleteAcademica from "./components/areaacademica/DeleteAcademica.jsx";
import ViewAcademica from "./components/areaacademica/ViewAcademica.jsx";
import EditAcademica from "./components/areaacademica/EditAcademica.jsx";
import ListAsignatura from "./pages/listasignatura/ListAsignatura.jsx";
import CreateAsignatura from "./components/asignatura/CreateAsignatura.jsx";
import ViewAsignatura from "./components/asignatura/ViewAsignatura.jsx";
import EditAsignatura from "./components/asignatura/EditAsignatura.jsx";
import DeleteAsignatura from "./components/asignatura/DeleteAsignatura.jsx";
import CreateAcudiente from "./components/createacudiente/CreateAcudiente.jsx";
import ViewAcudiente from "./components/createacudiente/ViewAcudiente.jsx";

function App() {
  const [count, setCount] = useState(0);
  const isAuthenticated = localStorage.getItem("token");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<LoginUser />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Home />} />
          <Route path="users">
            <Route index element={<List />} />
            <Route path="test/:id" element={<Single />} />
            <Route path="new" element={<New />} />
            <Route path="edit/:id" element={<EditUser />} />
            <Route path="delete/:id" element={<DeleteUser />} />
          </Route>
          <Route path="student">
            <Route index element={<ListStudent />} />
            <Route path="view/:id" element={<ViewStudent />} />
            <Route path="new" element={<CreateStudent />} />
            <Route path="edit/:id" element={<EditStudent />} />
            <Route path="delete/:id" element={<DeleteStudent />} />
          </Route>
          <Route path="teacher">
            <Route index element={<ListDocente />} />
            <Route path="view/:id" element={<ViewDocente />} />
            <Route path="new" element={<CreateDocente />} />
            <Route path="new/:id" element={<CreateDocente />} />
            <Route path="edit/:id" element={<EditDocente />} />
            <Route path="delete/:id" element={<DeleteDocente />} />
          </Route>
          <Route path="attendant">
            <Route index element={<ListAcudiente />} />
            <Route path="view/:id" element={<ViewAcudiente />} />
            <Route path="new" element={<CreateAcudiente />} />
            <Route path="new/:id" element={<CreateAcudiente />} />
            <Route path="edit/:id" element={<EditDocente />} />
            <Route path="delete/:id" element={<DeleteDocente />} />
          </Route>
          <Route path="academico">
            <Route index element={<Followup />} />
            <Route path=":seguimiento" element={<Followup />} />
            <Route path="new" element={<New />} />
          </Route>
          <Route path="company">
            <Route index element={<Company />} />
            <Route path=":seguimiento" element={<Company />} />
          </Route>
          <Route path="/educationLevel" element={<ListEducationLevels />} />
          <Route path="other">
            <Route index element={<AreaAcademica />} />
            <Route path="new" element={<Academica />} />
            <Route path="view/:id" element={<ViewAcademica />} />
            <Route path="edit/:id" element={<EditAcademica />} />
            <Route path="delete/:id" element={<DeleteAcademica />} />
          </Route>
          <Route path="asignatura">
            <Route index element={<ListAsignatura />} />
            <Route path="new" element={<CreateAsignatura />} />
            <Route path="view/:id" element={<ViewAsignatura />} />
            <Route path="edit/:id" element={<EditAsignatura />} />
            <Route path="delete/:id" element={<DeleteAsignatura />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
