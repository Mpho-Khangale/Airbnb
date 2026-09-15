import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function AdminListings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://localhost:5000/api/accommodations"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                            "Unable to load listings."
                    );
                }

                setListings(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    return (
        <>
            <AdminNavbar />

            <main className="admin-page">
                <div className="admin-page-heading">
                    <div>
                        <h1>My Listings</h1>
                        <p>
                            Manage your Airbnb properties.
                        </p>
                    </div>

                    <Link
                        to="/admin/create-listing"
                        className="admin-create-button"
                    >
                        Create listing
                    </Link>
                </div>

                {loading && (
                    <div className="admin-message">
                        <p>Loading listings...</p>
                    </div>
                )}

                {error && (
                    <div className="admin-message admin-error">
                        <h2>Something went wrong</h2>
                        <p>{error}</p>
                    </div>
                )}

                {!loading &&
                    !error &&
                    listings.length === 0 && (
                        <div className="admin-message">
                            <h2>No listings yet</h2>

                            <p>
                                Create your first property
                                listing.
                            </p>
                        </div>
                    )}

                {!loading &&
                    !error &&
                    listings.length > 0 && (
                        <div className="admin-listings-grid">
                            {listings.map((listing) => (
                                <article
                                    className="admin-listing-card"
                                    key={listing._id}
                                >
                                    <div className="admin-listing-image">
                                        {listing.images?.[0] ? (
                                            <img
                                                src={
                                                    listing
                                                        .images[0]
                                                }
                                                alt={
                                                    listing.title
                                                }
                                            />
                                        ) : (
                                            <span>
                                                Property image
                                            </span>
                                        )}
                                    </div>

                                    <div className="admin-listing-content">
                                        <p className="admin-listing-location">
                                            {listing.location}
                                        </p>

                                        <h2>
                                            {listing.title}
                                        </h2>

                                        <p>
                                            {listing.guests}{" "}
                                            {listing.guests === 1
                                                ? "guest"
                                                : "guests"}
                                            {" · "}
                                            {listing.bedrooms}{" "}
                                            {listing.bedrooms === 1
                                                ? "bedroom"
                                                : "bedrooms"}
                                            {" · "}
                                            {listing.bathrooms}{" "}
                                            {listing.bathrooms === 1
                                                ? "bathroom"
                                                : "bathrooms"}
                                        </p>

                                        <div className="admin-listing-price">
                                            <strong>
                                                R
                                                {Number(
                                                    listing.price
                                                ).toLocaleString()}
                                            </strong>
                                            <span> / night</span>
                                        </div>

                                        <div className="admin-listing-actions">
                                            <Link
                                                to={`/listing/${listing._id}`}
                                                className="admin-view-button"
                                            >
                                                View
                                            </Link>

                                            <Link
                                                to={`/admin/edit-listing/${listing._id}`}
                                                className="admin-edit-button"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
            </main>
        </>
    );
}

export default AdminListings;