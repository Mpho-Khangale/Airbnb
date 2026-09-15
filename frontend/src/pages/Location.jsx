import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Location() {
    const [searchParams] = useSearchParams();

    const location = searchParams.get("location") || "South Africa";
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const guests = searchParams.get("guests") || "1";

    const listings = [
        {
            id: 1,
            title: "Modern apartment with city views",
            location: "Cape Town",
            type: "Entire apartment",
            guests: 4,
            bedrooms: 2,
            bathrooms: 2,
            rating: 4.8,
            price: 1450
        },
        {
            id: 2,
            title: "Luxury home near the beach",
            location: "Cape Town",
            type: "Entire home",
            guests: 6,
            bedrooms: 3,
            bathrooms: 2,
            rating: 4.9,
            price: 2300
        },
        {
            id: 3,
            title: "Stylish city apartment",
            location: "Johannesburg",
            type: "Entire apartment",
            guests: 2,
            bedrooms: 1,
            bathrooms: 1,
            rating: 4.7,
            price: 1100
        },
        {
            id: 4,
            title: "Relaxing coastal stay",
            location: "Durban",
            type: "Entire apartment",
            guests: 4,
            bedrooms: 2,
            bathrooms: 1,
            rating: 4.6,
            price: 1250
        }
    ];

    const filteredListings = listings.filter((listing) => {
        const matchesLocation =
            !location ||
            location === "South Africa" ||
            listing.location
                .toLowerCase()
                .includes(location.toLowerCase());

        const matchesGuests =
            listing.guests >= Number(guests);

        return matchesLocation && matchesGuests;
    });

    return (
        <>
            <Navbar />

            <main className="location-page">

                <section className="location-heading">
                    <p>
                        {filteredListings.length} stays
                        {checkIn && checkOut
                            ? ` · ${checkIn} - ${checkOut}`
                            : ""}
                    </p>

                    <h1>Stays in {location}</h1>
                </section>

                <section className="filter-buttons">
                    <button>Price</button>
                    <button>Type of place</button>
                    <button>Bedrooms</button>
                    <button>Amenities</button>
                </section>

                <section className="location-results">

                    {filteredListings.length > 0 ? (
                        filteredListings.map((listing) => (
                            <Link
                                to={`/listing/${listing.id}`}
                                className="location-card"
                                key={listing.id}
                            >
                                <div className="location-card-image">
                                    Property image
                                </div>

                                <div className="location-card-content">
                                    <div>
                                        <p className="listing-type">
                                            {listing.type} in {listing.location}
                                        </p>

                                        <h2>{listing.title}</h2>

                                        <div className="listing-line"></div>

                                        <p className="listing-details">
                                            {listing.guests} guests ·{" "}
                                            {listing.bedrooms} bedrooms ·{" "}
                                            {listing.bathrooms} bathrooms
                                        </p>
                                    </div>

                                    <div className="listing-bottom">
                                        <span>★ {listing.rating}</span>

                                        <p>
                                            <strong>
                                                R{listing.price.toLocaleString()}
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
                                Try searching for another location or changing
                                the number of guests.
                            </p>
                        </div>
                    )}

                </section>

            </main>

            <Footer />
        </>
    );
}

export default Location;