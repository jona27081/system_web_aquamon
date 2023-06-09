import '../styles/App.css';
import Footer from './Footer';
import ListPersonalAdmins from './ListPersonalAdmins';
import ListPersonalEmpleados from './ListPersonalEmpleados';
import Login from './Login';
import Menu from './Menu';
import Registro from './Registro';
import { Route, Routes } from "react-router-dom";
import RegistroWaterPumps from './RegistroWaterPumps';
import ListWaterPumps from './ListWaterPums';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
  const logout = () =>{
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    !user ? (
      <Login />
    ) : (
      <div className='container'>
        <Menu />
        <div class="logout-button">
          <button className='logout' onClick={logout}>Logout</button>
        </div>
        <div className="container-body">
          <Routes>
            <Route exact path="/personalemps" element={<ListPersonalEmpleados />} />
            <Route exact path="/personaladms" element={<ListPersonalAdmins />} />
            <Route exact path="/addpersonal" element={<Registro />} />
            <Route exact path="/addwaterpump" element={<RegistroWaterPumps />} />
            <Route exact path='/' element={<ListWaterPumps />} />
          </Routes>
        </div>

        <Footer />
      </div>
    )
  );
}


export default App;
