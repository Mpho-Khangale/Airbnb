import { Link } from "react-router-dom";

function AdminNavbar() {
    return (
        <header className="admin-navbar">
            <Link to="/admin/listings" className="admin-logo">
                airbnb
            </Link>

            <nav className="admin-nav-links">
                <Link to="/admin/listings">My Listings</Link>
                <Link to="/admin/create-listing">Create Listing</Link>
                <Link to="/">View Website</Link>
            </nav>

            <div className="admin-profile">
                <span>Admin</span>
                <button>Log out</button>
            </div>
        </header>
    );
}

export default AdminNavbar;