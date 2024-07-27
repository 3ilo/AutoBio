import { Link } from "react-router-dom";
import { useEffect } from "react"
import { checkToken } from '../services/authService'

import './styles/NavBar.css';

export interface NavbarProps {
  logoutStatus: boolean;
  setLogoutStatus: (val: boolean) => void;
}

export default function NavBar(props: NavbarProps) {
  const handleCheckToken = () => {
    checkToken().then(
      (res) => res.status === 200 ? props.setLogoutStatus(true) : props.setLogoutStatus(false)
    ).catch(
      (err) => console.error(err)
    )
  }
  useEffect(() => {
    handleCheckToken()
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
            { props.logoutStatus ? <Link onClick={handleCheckToken} to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
          </span>
        </div>
      </div>
    </>
  );
}
