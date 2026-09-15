import { Link } from "react-router-dom";
import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

function AdminListings() {
    const [listings, setListings] = useState([
        {
            id: 1,
            title: "Modern apartment with city views",
            location: "Cape Town",
            price: 1450,
            guests: 4
        },
        {
            id: 2,
            title: "Luxury home near the beach",
            location: "Cape Town",
            price: 2300,
            guests: 6
        },
        {
            id: 3,
            title: "Stylish city apartment",
            location: "Johannesburg",
            price: 1100,
            guests: 2
        }
    ]);

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this listing?"
        );

        if (!confirmed) {
            return;
        }

        setListings(
            listings.filter((listing) => listing.id !== id)
        );
    };

    return (
        <>
            <AdminNavbar />

            <main className="admin-page">
                <div className="admin-page-heading">
                    <div>
                        <h1>My Listings</h1>
                        <p>Manage your Airbnb properties.</p>
                    </div>

                    <Link
                        to="/admin/create-listing"
                        className="admin-primary-button"
                    >
                        + Create Listing
                    </Link>
                </div>

                <div className="admin-listings">
                    {listings.length > 0 ? (
                        listings.map((listing) => (
                            <div
                                className="admin-listing-card"
                                key={listing.id}
                            >
                                <div className="admin-listing-image">
                                    Property image
                                </div>

                                <div className="admin-listing-information">
                                    <div>
                                        <h2>{listing.title}</h2>

                                        <p>{listing.location}</p>

                                        <p>
                                            Up to {listing.guests} guests
                                        </p>

                                        <strong>
                                            R{listing.price.toLocaleString()}
                                            {" "}/ night
                                        </strong>
                                    </div>

                                    <div className="admin-listing-actions">
                                        <Link
                                            to={`/admin/edit-listing/${listing.id}`}
                                            className="edit-button"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(listing.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="admin-empty">
                            <h2>No listings yet</h2>
                            <p>
                                Create your first property listing to get
                                started.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default AdminListings;