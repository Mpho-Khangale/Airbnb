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

    // Filters
    const [maxPrice, setMaxPrice] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [amenity, setAmenity] = useState("");

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://localhost:5000/api/accommodations"
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to load accommodations."
                    );
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

    // Get property types from the actual database
    const propertyTypes = [
        ...new Set(
            listings
                .map((listing) => listing.type)
                .filter(Boolean)
        )
    ];

    // Get amenities from the actual database
    const availableAmenities = [
        ...new Set(
            listings.flatMap((listing) =>
                Array.isArray(listing.amenities)
                    ? listing.amenities
                    : []
            )
        )
    ];

    const filteredListings = listings.filter((listing) => {
        const matchesLocation =
            !location ||
            listing.location
                ?.toLowerCase()
                .includes(location.toLowerCase());

        const matchesGuests =
            Number(listing.guests) >= guests;

        const matchesPrice =
            !maxPrice ||
            Number(listing.price) <= Number(maxPrice);

        const matchesType =
            !propertyType ||
            listing.type === propertyType;

        const matchesBedrooms =
            !bedrooms ||
            Number(listing.bedrooms) >=
                Number(bedrooms);

        const matchesAmenity =
            !amenity ||
            listing.amenities?.some(
                (item) =>
                    item.toLowerCase() ===
                    amenity.toLowerCase()
            );

        return (
            matchesLocation &&
            matchesGuests &&
            matchesPrice &&
            matchesType &&
            matchesBedrooms &&
            matchesAmenity
        );
    });

    const clearFilters = () => {
        setMaxPrice("");
        setPropertyType("");
        setBedrooms("");
        setAmenity("");
    };

    const filtersActive =
        maxPrice ||
        propertyType ||
        bedrooms ||
        amenity;

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

                {/* Functional filters */}
                <section className="filter-buttons">
                    <select
                        value={maxPrice}
                        onChange={(event) =>
                            setMaxPrice(event.target.value)
                        }
                    >
                        <option value="">
                            Price
                        </option>

                        <option value="1000">
                            Up to R1 000
                        </option>

                        <option value="1500">
                            Up to R1 500
                        </option>

                        <option value="2000">
                            Up to R2 000
                        </option>

                        <option value="3000">
                            Up to R3 000
                        </option>

                        <option value="5000">
                            Up to R5 000
                        </option>
                    </select>

                    <select
                        value={propertyType}
                        onChange={(event) =>
                            setPropertyType(
                                event.target.value
                            )
                        }
                    >
                        <option value="">
                            Type of place
                        </option>

                        {propertyTypes.map((type) => (
                            <option
                                key={type}
                                value={type}
                            >
                                {type}
                            </option>
                        ))}
                    </select>

                    <select
                        value={bedrooms}
                        onChange={(event) =>
                            setBedrooms(event.target.value)
                        }
                    >
                        <option value="">
                            Bedrooms
                        </option>

                        <option value="1">
                            1+ bedroom
                        </option>

                        <option value="2">
                            2+ bedrooms
                        </option>

                        <option value="3">
                            3+ bedrooms
                        </option>

                        <option value="4">
                            4+ bedrooms
                        </option>

                        <option value="5">
                            5+ bedrooms
                        </option>
                    </select>

                    <select
                        value={amenity}
                        onChange={(event) =>
                            setAmenity(event.target.value)
                        }
                    >
                        <option value="">
                            Amenities
                        </option>

                        {availableAmenities.map(
                            (item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            )
                        )}
                    </select>

                    {filtersActive && (
                        <button
                            type="button"
                            className="clear-filters-button"
                            onClick={clearFilters}
                        >
                            Clear filters
                        </button>
                    )}
                </section>

                {loading && (
                    <div className="location-message">
                        <p>
                            Loading accommodations...
                        </p>
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
                            filteredListings.map(
                                (listing) => (
                                    <Link
                                        to={`/listing/${listing._id}`}
                                        className="location-card"
                                        key={listing._id}
                                    >
                                        <div className="location-card-image">
                                            {listing.images &&
                                            listing.images
                                                .length >
                                                0 ? (
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
                                                    Property
                                                    image
                                                </span>
                                            )}
                                        </div>

                                        <div className="location-card-content">
                                            <div>
                                                <p className="listing-type">
                                                    {
                                                        listing.type
                                                    }{" "}
                                                    in{" "}
                                                    {
                                                        listing.location
                                                    }
                                                </p>

                                                <h2>
                                                    {
                                                        listing.title
                                                    }
                                                </h2>

                                                <div className="listing-line"></div>

                                                <p className="listing-details">
                                                    {
                                                        listing.guests
                                                    }{" "}
                                                    guests ·{" "}
                                                    {
                                                        listing.bedrooms
                                                    }{" "}
                                                    bedrooms ·{" "}
                                                    {
                                                        listing.bathrooms
                                                    }{" "}
                                                    bathrooms
                                                </p>

                                                {listing
                                                    .amenities
                                                    ?.length >
                                                    0 && (
                                                    <p className="listing-amenities">
                                                        {listing.amenities
                                                            .slice(
                                                                0,
                                                                4
                                                            )
                                                            .join(
                                                                " · "
                                                            )}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="listing-bottom">
                                                <span>
                                                    ★{" "}
                                                    {listing.rating ||
                                                        "New"}
                                                </span>

                                                <p>
                                                    <strong>
                                                        R
                                                        {Number(
                                                            listing.price
                                                        ).toLocaleString()}
                                                    </strong>{" "}
                                                    /
                                                    night
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            )
                        ) : (
                            <div className="no-results">
                                <h2>
                                    No stays found
                                </h2>

                                <p>
                                    There are currently
                                    no properties matching
                                    your search and filters.
                                </p>

                                {filtersActive && (
                                    <button
                                        type="button"
                                        className="clear-filters-button"
                                        onClick={
                                            clearFilters
                                        }
                                    >
                                        Clear filters
                                    </button>
                                )}
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