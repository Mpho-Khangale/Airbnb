import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Location() {
    const [searchParams] = useSearchParams();

    const location = searchParams.get("location") || "";
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";
    const guests = Number(searchParams.get("guests")) || 1;

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

                if (!response.ok) {
                    throw new Error("Failed to load accommodations.");
                }

                const data = await response.json();

                setListings(data);
            } catch (error) {
                console.error(error);
                setError(
                    "Unable to load accommodations. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    const filteredListings = listings.filter((listing) => {
        const matchesLocation =
            !location ||
            listing.location
                ?.toLowerCase()
                .includes(location.toLowerCase());

        const matchesGuests =
            Number(listing.guests) >= guests;

        return matchesLocation && matchesGuests;
    });

    return (
        <>
            <Navbar />

            <main className="location-page">
                <section className="location-heading">
                    {!loading && !error && (
                        <p>
                            {filteredListings.length}{" "}
                            {filteredListings.length === 1
                                ? "stay"
                                : "stays"}

                            {checkIn && checkOut
                                ? ` · ${checkIn} - ${checkOut}`
                                : ""}
                        </p>
                    )}

                    <h1>
                        {location
                            ? `Stays in ${location}`
                            : "Available stays"}
                    </h1>
                </section>

                <section className="filter-buttons">
                    <button>Price</button>
                    <button>Type of place</button>
                    <button>Bedrooms</button>
                    <button>Amenities</button>
                </section>

                {loading && (
                    <div className="location-message">
                        <p>Loading accommodations...</p>
                    </div>
                )}

                {error && (
                    <div className="location-message error-message">
                        <h2>Something went wrong</h2>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <section className="location-results">
                        {filteredListings.length > 0 ? (
                            filteredListings.map((listing) => (
                                <Link
                                    to={`/listing/${listing._id}`}
                                    className="location-card"
                                    key={listing._id}
                                >
                                    <div className="location-card-image">
                                        {listing.images &&
                                        listing.images.length > 0 ? (
                                            <img
                                                src={listing.images[0]}
                                                alt={listing.title}
                                            />
                                        ) : (
                                            <span>
                                                Property image
                                            </span>
                                        )}
                                    </div>

                                    <div className="location-card-content">
                                        <div>
                                            <p className="listing-type">
                                                {listing.type} in{" "}
                                                {listing.location}
                                            </p>

                                            <h2>
                                                {listing.title}
                                            </h2>

                                            <div className="listing-line"></div>

                                            <p className="listing-details">
                                                {listing.guests} guests ·{" "}
                                                {listing.bedrooms} bedrooms ·{" "}
                                                {listing.bathrooms} bathrooms
                                            </p>
                                        </div>

                                        <div className="listing-bottom">
                                            <span>
                                                ★{" "}
                                                {listing.rating || "New"}
                                            </span>

                                            <p>
                                                <strong>
                                                    R
                                                    {Number(
                                                        listing.price
                                                    ).toLocaleString()}
                                                </strong>{" "}
                                                / night
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="no-results">
                                <h2>No stays found</h2>

                                <p>
                                    There are currently no properties
                                    matching your search.
                                </p>
                            </div>
                        )}
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
}

export default Location;