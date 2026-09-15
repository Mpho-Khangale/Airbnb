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
                <a href="#experiences">Experiences</a>
            </nav>

            <div className="navbar-right">
                <Link
                    to="/admin/login"
                    className="host-button"
                >
                    Airbnb your home
                </Link>

                <Link
                    to="/login"
                    className="profile-button"
                >
                    ☰
                    <span>●</span>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;