import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
    const navigate = useNavigate();

    const [location, setLocation] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    const [locations, setLocations] = useState([]);
    const [locationError, setLocationError] = useState("");

    useEffect(() => {
    const fetchLocations = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/accommodations"
            );

            if (!response.ok) {
                throw new Error("Failed to load locations.");
            }

            const accommodations = await response.json();

            const uniqueLocations = [
                ...new Set(
                    accommodations
                        .map((accommodation) => accommodation.location)
                        .filter(Boolean)
                )
            ];

            setLocations(uniqueLocations);
        } catch (error) {
            console.error(error);
            setLocationError("Unable to load locations.");
        }
    };

    fetchLocations();
}, []);

    const handleSearch = () => {
        const searchParams = new URLSearchParams({
            location,
            checkIn,
            checkOut,
            guests
        });

        navigate(`/location?${searchParams.toString()}`);
    };
    




    return (
        <>
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-content">
                        <h1>Find a place you'll love to stay</h1>
                        <p>Discover homes and experiences around the world.</p>
                    </div>

<div className="search-bar">

    <div className="search-item">
        <label htmlFor="location">Where</label>
        <input
            id="location"
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
        />
    </div>

    <div className="search-item">
        <label htmlFor="checkIn">Check in</label>
        <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
        />
    </div>

    <div className="search-item">
        <label htmlFor="checkOut">Check out</label>
        <input
            id="checkOut"
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(event) => setCheckOut(event.target.value)}
        />
    </div>

    <div className="search-item">
        <label htmlFor="guests">Guests</label>
        <select
            id="guests"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
        >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
            <option value="5">5 guests</option>
            <option value="6">6 guests</option>
            <option value="7">7 guests</option>
            <option value="8">8 guests</option>
            <option value="9">9 guests</option>
            <option value="10">10 guests</option>
        </select>
    </div>

    <button
        className="search-button"
        onClick={handleSearch}
    >
        Search
    </button>

</div>
                </section>

                {/* Inspiration */}
                <section className="home-section">
                    <h2>Inspiration for your next trip</h2>

                    <div className="destination-grid">
                        <div className="destination-card">
                            <div className="card-image cape-town">
                                <span>Cape Town</span>
                            </div>
                            <h3>Cape Town</h3>
                            <p>South Africa</p>
                        </div>

                        <div className="destination-card">
                            <div className="card-image johannesburg">
                                <span>Johannesburg</span>
                            </div>
                            <h3>Johannesburg</h3>
                            <p>South Africa</p>
                        </div>

                        <div className="destination-card">
                            <div className="card-image durban">
                                <span>Durban</span>
                            </div>
                            <h3>Durban</h3>
                            <p>South Africa</p>
                        </div>

                        <div className="destination-card">
                            <div className="card-image knysna">
                                <span>Knysna</span>
                            </div>
                            <h3>Knysna</h3>
                            <p>South Africa</p>
                        </div>
                    </div>
                </section>

                {/* Experiences */}
                <section className="home-section">
                    <h2>Discover Airbnb Experiences</h2>
                    <p className="section-description">
                        Find unique activities and experiences hosted by local people.
                    </p>

                    <div className="experience-grid">
                        <div className="experience-card">
                            <div className="experience-image experiences">
                                <span>Experiences</span>
                            </div>

                            <div className="experience-content">
                                <h3>Things to do</h3>
                                <p>
                                    Discover exciting activities wherever you travel.
                                </p>
                            </div>
                        </div>

                        <div className="experience-card">
                            <div className="experience-image adventures">
                                <span>Adventures</span>
                            </div>

                            <div className="experience-content">
                                <h3>Adventures</h3>
                                <p>
                                    Explore unforgettable experiences around the world.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Shop Airbnb */}
                <section className="shop-section">
                    <div className="shop-content">
                        <span className="shop-label">AIRBNB SHOP</span>

                        <h2>Bring the Airbnb feeling home.</h2>

                        <p>
                            Discover products inspired by travel, design and
                            hospitality.
                        </p>

                        <button>Explore the shop</button>
                    </div>
                </section>

                {/* Future Getaways */}
                <section className="home-section">
                    <h2>Inspiration for future getaways</h2>

                    <div className="future-grid">
                        <div>
                            <h3>Beach destinations</h3>
                            <p>Relax beside beautiful coastlines.</p>
                        </div>

                        <div>
                            <h3>Mountain getaways</h3>
                            <p>Escape to peaceful mountain locations.</p>
                        </div>

                        <div>
                            <h3>City breaks</h3>
                            <p>Experience exciting cities and cultures.</p>
                        </div>

                        <div>
                            <h3>Weekend escapes</h3>
                            <p>Find your next short adventure.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Home;