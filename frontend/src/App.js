import logo from './logo.svg';
import { userContext, alertContext } from './context/context'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import NavbarComponent from './components/Navbar';
import Footer from './components/Footer/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsListingPage from './pages/EventsListingPage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/CreateEventPage';
import UpdateEventPage from './pages/UpdateEventPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import { useState } from 'react';
import AlertComponent from './components/AlertComponent';
import Dashboard from './pages/Dashboard';


function App() {
  const [user, setUser] = useState({})
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert()
    }, 1500)
  }

  return (
    <userContext.Provider value = {{user, setUser}}>
      <alertContext.Provider value={{alert, showAlert}}>
    <Router>
    <NavbarComponent user={user}/>
    <AlertComponent alert={alert} />
    <Routes>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/events' element={<EventsListingPage user={user} />}></Route>
      <Route path='/event/:id' element={<EventDetailPage/>}></Route>
      <Route path='/event/create' element={<CreateEventPage />}></Route>
      <Route path='/event/update/:id' element={<UpdateEventPage />}></Route>
      <Route path='profile/update' element={<UpdateProfilePage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/signup' element={<RegisterPage />}></Route>
    </Routes>

    <Footer/>
    </Router>
    </alertContext.Provider>
    </userContext.Provider>
  );
}

export default App;
