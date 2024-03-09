import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AuthLogin from './context/authlogin.jsx';
import Login from '../src/pages/login/login.jsx';
import LoginUser from '../src/pages/signUp/LoginUser.jsx'
import Home from './pages/home/Home.jsx';
import List from './pages/list/List.jsx';
import Single from './pages/single/Single.jsx';
import New from './pages/new/New.jsx';
import Followup from "./pages/followup/Followup.jsx";
import Logout from './components/logout/Logout.jsx';
import EditUser from './pages/editUser/EditUser.jsx';



function App() {
  const [count, setCount] = useState(0);
  const isAuthenticated = localStorage.getItem('token');

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<LoginUser />}  />
          <Route path="/logout" element={<Logout />}  />
          <Route path="/home" element={<Home />}  />
          <Route path="users"> 
            <Route index element={<List/>}/>
            <Route path=":userId" element={<Single/>}/>
            <Route path="new" element={<New/>}/>
            <Route path='edit'element={<EditUser/>}/>
          </Route>
          <Route path="academico"> 
            <Route index element={<Followup/>}/>
            <Route path=":seguimiento" element={<Followup/>}/>
            <Route path="new" element={<New/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
