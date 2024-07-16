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

import './App.css'
import { GenericPageWrapper } from "./pages/GenericPageWrapper";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />

        <hr />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contribute" element={<GenericPageWrapper page={<WithAuth component={<Add />} />} />} />
          <Route path="/memories" element={<GenericPageWrapper page={<Memories />} />} />
          <Route path="/explore" element={<p>Explore</p>} />
          <Route path="/home" element={<GenericPageWrapper page={<Home />} />} />
          <Route path="/secret" element={<GenericPageWrapper page={<WithAuth component={<Secret />} />} />} />
          <Route path="/login" element={<GenericPageWrapper page={<Login />} />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App
