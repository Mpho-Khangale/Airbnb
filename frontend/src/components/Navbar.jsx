import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    let user = null;

    if (storedUser && token) {
        try {
            user = JSON.parse(storedUser);
        } catch {
            user = null;
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setMenuOpen(false);

        navigate("/");
        window.location.reload();
    };

    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo">
                airbnb
            </Link>

            <nav className="navbar-links">
                <Link to="/">Stays</Link>
                <a href="/#experiences">Experiences</a>
            </nav>

            <div className="navbar-right">
                <Link
                    to="/admin/login"
                    className="host-button"
                >
                    Airbnb your home
                </Link>

                <div className="profile-container">
                    <button
                        className="profile-button"
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                    >
                        ☰
                        <span>●</span>
                    </button>

                    {menuOpen && (
                        <div className="profile-menu">
                            {user ? (
                                <>
                                    <div className="profile-user">
                                        <strong>
                                            {user.username}
                                        </strong>

                                        <span>
                                            {user.email}
                                        </span>
                                    </div>

                                    <Link
                                        to="/reservations"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        My reservations
                                    </Link>

                                    {user.role === "admin" && (
                                        <Link
                                            to="/admin/listings"
                                            onClick={() =>
                                                setMenuOpen(false)
                                            }
                                        >
                                            Admin dashboard
                                        </Link>
                                    )}

                                    <button
                                        className="menu-logout"
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;