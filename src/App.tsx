import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from './pages/Home';
import Secret from './components/Secret';
import Logout from './components/Logout';
import Login from './pages/Login';
import Memories from './pages/Memories';
import Add from './pages/Add';
import { Landing } from './pages/Landing';
import WithAuth from './wrappers/WithAuth';
import { useState } from "react"
import { GenericPageWrapper } from "./pages/GenericPageWrapper";

import './App.css'

function App() {
  const [ logoutStatus, setLogoutStatus ] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar logoutStatus={logoutStatus} setLogoutStatus={setLogoutStatus} />

        <hr />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contribute" element={<GenericPageWrapper page={<WithAuth component={<Add />} />} />} />
          <Route path="/memories" element={<GenericPageWrapper page={<Memories />} />} />
          <Route path="/explore" element={<p>Explore</p>} />
          <Route path="/home" element={<GenericPageWrapper page={<Home />} />} />
          <Route path="/secret" element={<GenericPageWrapper page={<WithAuth component={<Secret />} />} />} />
          <Route path="/login" element={<GenericPageWrapper page={<Login />} />} />
          <Route path="/logout" element={<Logout setLogoutStatus={setLogoutStatus}/>} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App
