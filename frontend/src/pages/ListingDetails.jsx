import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ListingDetails() {
    const { id } = useParams();

    const listings = [
        {
            id: 1,
            title: "Modern apartment with city views",
            location: "Cape Town, South Africa",
            guests: 4,
            bedrooms: 2,
            beds: 2,
            bathrooms: 2,
            rating: 4.8,
            reviews: 124,
            price: 1450,
            cleaningFee: 350,
            serviceFee: 250
        },
        {
            id: 2,
            title: "Luxury home near the beach",
            location: "Cape Town, South Africa",
            guests: 6,
            bedrooms: 3,
            beds: 4,
            bathrooms: 2,
            rating: 4.9,
            reviews: 86,
            price: 2300,
            cleaningFee: 450,
            serviceFee: 320
        },
        {
            id: 3,
            title: "Stylish city apartment",
            location: "Johannesburg, South Africa",
            guests: 2,
            bedrooms: 1,
            beds: 1,
            bathrooms: 1,
            rating: 4.7,
            reviews: 72,
            price: 1100,
            cleaningFee: 250,
            serviceFee: 180
        },
        {
            id: 4,
            title: "Relaxing coastal stay",
            location: "Durban, South Africa",
            guests: 4,
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            rating: 4.6,
            reviews: 91,
            price: 1250,
            cleaningFee: 300,
            serviceFee: 200
        }
    ];

    const listing =
        listings.find((item) => item.id === Number(id)) || listings[0];

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

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

        return Math.ceil(difference / (1000 * 60 * 60 * 24));
    };

    const nights = calculateNights();
    const accommodationTotal = listing.price * nights;

    const total =
        nights > 0
            ? accommodationTotal +
              listing.cleaningFee +
              listing.serviceFee
            : 0;

    return (
        <>
            <Navbar />

            <main className="listing-page">

                {/* Heading */}

                <section className="listing-heading">
                    <h1>{listing.title}</h1>

                    <div className="listing-subheading">
                        <span>★ {listing.rating}</span>
                        <span>·</span>
                        <span>{listing.reviews} reviews</span>
                        <span>·</span>
                        <span>{listing.location}</span>
                    </div>
                </section>

                {/* Image Gallery */}

                <section className="image-gallery">
                    <div className="gallery-main">
                        Main property image
                    </div>

                    <div className="gallery-small">
                        <div>Property image</div>
                        <div>Property image</div>
                        <div>Property image</div>
                        <div>Property image</div>
                    </div>
                </section>

                {/* Main Information */}

                <section className="listing-main">

                    <div className="listing-information">

                        <div className="property-summary">
                            <h2>Entire place hosted by Airbnb Host</h2>

                            <p>
                                {listing.guests} guests · {listing.bedrooms} bedrooms
                                · {listing.beds} beds · {listing.bathrooms} bathrooms
                            </p>
                        </div>

                        <hr />

                        <div className="listing-feature">
                            <h3>Great location</h3>
                            <p>
                                Guests love the location and the surrounding area.
                            </p>
                        </div>

                        <div className="listing-feature">
                            <h3>Great check-in experience</h3>
                            <p>
                                Recent guests gave the check-in process a high rating.
                            </p>
                        </div>

                        <div className="listing-feature">
                            <h3>Free cancellation</h3>
                            <p>
                                Cancellation options are available for this stay.
                            </p>
                        </div>

                        <hr />

                        <div className="listing-description">
                            <h2>About this place</h2>

                            <p>
                                Enjoy a comfortable stay in this beautiful property.
                                The accommodation offers everything you need for a
                                relaxing trip and is conveniently located near popular
                                attractions.
                            </p>
                        </div>

                        <hr />

                        <div className="amenities">
                            <h2>What this place offers</h2>

                            <div className="amenities-grid">
                                <span>Wi-Fi</span>
                                <span>Kitchen</span>
                                <span>Free parking</span>
                                <span>TV</span>
                                <span>Workspace</span>
                                <span>Air conditioning</span>
                            </div>
                        </div>

                    </div>

                    {/* Cost Calculator */}

                    <aside className="booking-card">

                        <div className="booking-price">
                            <strong>
                                R{listing.price.toLocaleString()}
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
                                        setCheckIn(event.target.value)
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
                                        setCheckOut(event.target.value)
                                    }
                                />
                            </div>

                        </div>

                        <div className="booking-guests">
                            <label>GUESTS</label>

                            <select
                                value={guests}
                                onChange={(event) =>
                                    setGuests(event.target.value)
                                }
                            >
                                {Array.from(
                                    { length: listing.guests },
                                    (_, index) => (
                                        <option
                                            value={index + 1}
                                            key={index + 1}
                                        >
                                            {index + 1}{" "}
                                            {index === 0 ? "guest" : "guests"}
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
                                        R{listing.price.toLocaleString()} ×{" "}
                                        {nights} nights
                                    </span>

                                    <span>
                                        R{accommodationTotal.toLocaleString()}
                                    </span>
                                </div>

                                <div>
                                    <span>Cleaning fee</span>
                                    <span>
                                        R{listing.cleaningFee.toLocaleString()}
                                    </span>
                                </div>

                                <div>
                                    <span>Service fee</span>
                                    <span>
                                        R{listing.serviceFee.toLocaleString()}
                                    </span>
                                </div>

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