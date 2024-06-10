import { Link } from "react-router-dom";
import './styles/NavBar.css';

export default function NavBar() {
    return (
      <>
        <div className="topnav">
          <div className="navComponents">
            <Link className="name" to="/">AutoBio</Link>
            <span className="links">
              <Link to="/contribute">Contribute</Link>
              <Link to="/memories">Memories</Link>
              <Link to="/explore">Explore</Link>
            </span>
          </div>
        </div>
      </>
    );
}

