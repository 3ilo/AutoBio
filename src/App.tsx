import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from './components/Home';
import Secret from './components/Secret';
import Login from './pages/Login';
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
          <Route path="/" element={<p>Landing</p>} />
          <Route path="/contribute" element={<p>Contribute a memory</p>} />
          <Route path="/memories" element={<p>Memories</p>} />
          <Route path="/explore" element={<p>Explore</p>} />
          <Route path="/home" element={<GenericPageWrapper page={<Home />} />} />
          <Route path="/secret" element={<GenericPageWrapper page={<WithAuth component={<Secret />} />} />} />
          <Route path="/login" element={<GenericPageWrapper page={<Login />} />} />
        </Routes>
        <div>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/secret">Secret</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>

      </div>
    </BrowserRouter>
  )
}

export default App
