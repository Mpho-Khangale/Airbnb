import { useEffect, useRef, useState } from "react";
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const currentLocation = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    const menuRef = useRef(null);

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

    // Close profile menu when clicking outside it
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [currentLocation.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setMenuOpen(false);

        navigate("/");

        window.location.reload();
    };

    const handleExperiencesClick = () => {
        setMenuOpen(false);

        if (currentLocation.pathname !== "/") {
            navigate("/");

            setTimeout(() => {
                document
                    .getElementById("experiences")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });
            }, 100);

            return;
        }

        document
            .getElementById("experiences")
            ?.scrollIntoView({
                behavior: "smooth"
            });
    };

    return (
        <header className="navbar">
            <div className="navbar-inner">

                {/* Logo */}
                <Link
                    to="/"
                    className="navbar-logo"
                    aria-label="Airbnb home"
                >
                    <span className="navbar-logo-icon">
                        ◇
                    </span>

                    <span className="navbar-logo-text">
                        airbnb
                    </span>
                </Link>

                {/* Main navigation */}
                <nav
                    className="navbar-links"
                    aria-label="Main navigation"
                >
                    <Link
                        to="/"
                        className={
                            currentLocation.pathname === "/"
                                ? "navbar-link active"
                                : "navbar-link"
                        }
                    >
                        Stays
                    </Link>

                    <button
                        type="button"
                        className="navbar-link navbar-link-button"
                        onClick={handleExperiencesClick}
                    >
                        Experiences
                    </button>
                </nav>

                {/* Right navigation */}
                <div className="navbar-right">
                    <Link
                        to="/admin/login"
                        className="host-button"
                    >
                        Airbnb your home
                    </Link>

                    <div
                        className="profile-container"
                        ref={menuRef}
                    >
                        <button
                            type="button"
                            className="profile-button"
                            onClick={() =>
                                setMenuOpen(
                                    (current) => !current
                                )
                            }
                            aria-expanded={menuOpen}
                            aria-label="Open profile menu"
                        >
                            <span className="menu-icon">
                                ☰
                            </span>

                            <span className="profile-icon">
                                ●
                            </span>
                        </button>

                        {menuOpen && (
                            <div className="profile-menu">

                                {user ? (
                                    <>
                                        <div className="profile-user">
                                            <strong>
                                                {user.username ||
                                                    "User"}
                                            </strong>

                                            <span>
                                                {user.email}
                                            </span>
                                        </div>

                                        <Link
                                            to="/reservations"
                                        >
                                            My reservations
                                        </Link>

                                        {user.role ===
                                            "admin" && (
                                            <Link to="/admin/listings">
                                                Admin dashboard
                                            </Link>
                                        )}

                                        <div className="profile-menu-divider" />

                                        <Link to="/">
                                            Explore stays
                                        </Link>

                                        <button
                                            type="button"
                                            className="menu-logout"
                                            onClick={
                                                handleLogout
                                            }
                                        >
                                            Log out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="profile-login"
                                        >
                                            Log in
                                        </Link>

                                        <Link to="/register">
                                            Sign up
                                        </Link>

                                        <div className="profile-menu-divider" />

                                        <Link to="/admin/login">
                                            Airbnb your home
                                        </Link>
                                    </>
                                )}

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;