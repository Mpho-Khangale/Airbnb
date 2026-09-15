import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ListingDetails() {
    const { id } = useParams();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    const [reservationError, setReservationError] = useState("");
    const [reservationSuccess, setReservationSuccess] = useState("");
    const [reserving, setReserving] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:5000/api/accommodations/${id}`
                );

                if (!response.ok) {
                    throw new Error("Accommodation not found.");
                }

                const data = await response.json();

                setListing(data);
            } catch (error) {
                console.error(error);
                setError(
                    "Unable to load this accommodation."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    const calculateNights = () => {
        if (!checkIn || !checkOut) {
            return 0;
        }

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        const difference = end - start;

        if (difference <= 0) {
            return 0;
        }

        return Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );
    };

    if (loading) {
        return (
            <>
                <Navbar />

                <main className="listing-page">
                    <div className="location-message">
                        Loading accommodation...
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    if (error || !listing) {
        return (
            <>
                <Navbar />

                <main className="listing-page">
                    <div className="location-message error-message">
                        <h2>Accommodation unavailable</h2>
                        <p>{error}</p>
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    const nights = calculateNights();

    const price = Number(listing.price) || 0;
    const cleaningFee =
        Number(listing.cleaningFee) || 0;
    const serviceFee =
        Number(listing.serviceFee) || 0;
    const occupancyTaxes =
        Number(listing.occupancyTaxes) || 0;

    const accommodationTotal = price * nights;

    const total =
        nights > 0
            ? accommodationTotal +
              cleaningFee +
              serviceFee +
              occupancyTaxes
            : 0;

    return (
        <>
            <Navbar />

            <main className="listing-page">
                {/* Heading */}
                <section className="listing-heading">
                    <h1>{listing.title}</h1>

                    <div className="listing-subheading">
                        <span>
                            ★ {listing.rating || "New"}
                        </span>

                        {listing.reviews > 0 && (
                            <>
                                <span>·</span>
                                <span>
                                    {listing.reviews} reviews
                                </span>
                            </>
                        )}

                        <span>·</span>

                        <span>{listing.location}</span>
                    </div>
                </section>

                {/* Image Gallery */}
                <section className="image-gallery">
                    <div className="gallery-main">
                        {listing.images?.[0] ? (
                            <img
                                src={listing.images[0]}
                                alt={listing.title}
                            />
                        ) : (
                            <span>Main property image</span>
                        )}
                    </div>

                    <div className="gallery-small">
                        {[1, 2, 3, 4].map((imageIndex) => (
                            <div key={imageIndex}>
                                {listing.images?.[imageIndex] ? (
                                    <img
                                        src={
                                            listing.images[
                                                imageIndex
                                            ]
                                        }
                                        alt={`${listing.title} ${imageIndex + 1}`}
                                    />
                                ) : (
                                    <span>Property image</span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="listing-main">
                    {/* Property Information */}
                    <div className="listing-information">
                        <div className="property-summary">
                            <h2>
                                {listing.type} in{" "}
                                {listing.location}
                            </h2>

                            <p>
                                {listing.guests} guests ·{" "}
                                {listing.bedrooms} bedrooms ·{" "}
                                {listing.bathrooms} bathrooms
                            </p>
                        </div>

                        <hr />

                        <div className="listing-feature">
                            <h3>Great location</h3>

                            <p>
                                Enjoy your stay in{" "}
                                {listing.location}.
                            </p>
                        </div>

                        <div className="listing-feature">
                            <h3>
                                Great check-in experience
                            </h3>

                            <p>
                                Everything you need for a
                                comfortable check-in experience.
                            </p>
                        </div>

                        <div className="listing-feature">
                            <h3>Free cancellation</h3>

                            <p>
                                Cancellation options may be
                                available for this stay.
                            </p>
                        </div>

                        <hr />

                        {/* Description */}
                        <div className="listing-description">
                            <h2>About this place</h2>

                            <p>{listing.description}</p>
                        </div>

                        <hr />

                        {/* Amenities */}
                        <div className="amenities">
                            <h2>What this place offers</h2>

                            {listing.amenities?.length > 0 ? (
                                <div className="amenities-grid">
                                    {listing.amenities.map(
                                        (amenity, index) => (
                                            <span key={index}>
                                                {amenity}
                                            </span>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p>
                                    No amenities have been
                                    added yet.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Booking Calculator */}
                    <aside className="booking-card">
                        <div className="booking-price">
                            <strong>
                                R{price.toLocaleString()}
                            </strong>

                            <span> / night</span>
                        </div>

                        <div className="booking-dates">
                            <div>
                                <label>CHECK-IN</label>

                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(event) =>
                                        setCheckIn(
                                            event.target.value
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <label>CHECKOUT</label>

                                <input
                                    type="date"
                                    min={checkIn}
                                    value={checkOut}
                                    onChange={(event) =>
                                        setCheckOut(
                                            event.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="booking-guests">
                            <label>GUESTS</label>

                            <select
                                value={guests}
                                onChange={(event) =>
                                    setGuests(
                                        Number(
                                            event.target.value
                                        )
                                    )
                                }
                            >
                                {Array.from(
                                    {
                                        length:
                                            Number(
                                                listing.guests
                                            ) || 1
                                    },
                                    (_, index) => (
                                        <option
                                            value={index + 1}
                                            key={index + 1}
                                        >
                                            {index + 1}{" "}
                                            {index === 0
                                                ? "guest"
                                                : "guests"}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <button className="reserve-button">
                            Reserve
                        </button>

                        <p className="booking-message">
                            You won't be charged yet
                        </p>

                        {nights > 0 && (
                            <div className="price-breakdown">
                                <div>
                                    <span>
                                        R{price.toLocaleString()} ×{" "}
                                        {nights}{" "}
                                        {nights === 1
                                            ? "night"
                                            : "nights"}
                                    </span>

                                    <span>
                                        R
                                        {accommodationTotal.toLocaleString()}
                                    </span>
                                </div>

                                {cleaningFee > 0 && (
                                    <div>
                                        <span>
                                            Cleaning fee
                                        </span>

                                        <span>
                                            R
                                            {cleaningFee.toLocaleString()}
                                        </span>
                                    </div>
                                )}

                                {serviceFee > 0 && (
                                    <div>
                                        <span>
                                            Service fee
                                        </span>

                                        <span>
                                            R
                                            {serviceFee.toLocaleString()}
                                        </span>
                                    </div>
                                )}

                                {occupancyTaxes > 0 && (
                                    <div>
                                        <span>
                                            Occupancy taxes
                                        </span>

                                        <span>
                                            R
                                            {occupancyTaxes.toLocaleString()}
                                        </span>
                                    </div>
                                )}

                                <hr />

                                <div className="booking-total">
                                    <strong>Total</strong>

                                    <strong>
                                        R{total.toLocaleString()}
                                    </strong>
                                </div>
                            </div>
                        )}
                    </aside>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default ListingDetails;