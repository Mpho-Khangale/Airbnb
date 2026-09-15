import Navbar from "../components/Navbar";

function Home() {
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
                            <span>Where</span>
                            <p>Search destinations</p>
                        </div>

                        <div className="search-item">
                            <span>Check in</span>
                            <p>Add dates</p>
                        </div>

                        <div className="search-item">
                            <span>Check out</span>
                            <p>Add dates</p>
                        </div>

                        <div className="search-item">
                            <span>Guests</span>
                            <p>Add guests</p>
                        </div>

                        <button className="search-button">Search</button>
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
        </>
    );
}

export default Home;