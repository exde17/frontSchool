import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../src/pages/login/login.jsx';
import LoginUser from '../src/pages/signUp/LoginUser.jsx'
import Home from './pages/home/Home.jsx';
import List from './pages/list/List.jsx';
import Single from './pages/single/Single.jsx';
import New from './pages/new/New.jsx';
import Followup from "./pages/followup/Followup.jsx";
import Logout from './components/logout/Logout.jsx';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<LoginUser />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="users"> 
              <Route index element={<List/>}/>
              <Route path=":userId" element={<Single/>}/>
              <Route path="new" element={<New/>}/>
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
