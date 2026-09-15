import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo">
                airbnb
            </Link>

            <nav className="navbar-links">
                <Link to="/">Stays</Link>
                <Link to="/">Experiences</Link>
            </nav>

            <div className="navbar-right">
                <button className="host-button">
                    Airbnb your home
                </button>

                <button className="profile-button">
                    ☰
                    <span>●</span>
                </button>
            </div>
        </header>
    );
}

export default Navbar;