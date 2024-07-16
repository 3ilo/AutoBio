import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { checkToken } from '../services/authService'

import './styles/NavBar.css';

export default function NavBar() {
  const [ signedIn, setSignedIn ] = useState(false);
  useEffect(() => {
    checkToken().then(
      (res) => res.status === 200 ? setSignedIn(true) : setSignedIn(false)
    ).catch(
      (err) => console.error(err)
    )
  }, [])
  return (
    <>
      <div className="topnav">
        <div className="navComponents">
          <Link className="name" to="/">AutoBio</Link>
          <span className="links">
            <Link to="/contribute">Contribute</Link>
            <Link to="/memories">Memories</Link>
            <Link to="/explore">Explore</Link>
            { signedIn ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
          </span>
        </div>
      </div>
    </>
  );
}
