import Navbar from "../components/Navbar";

function Home() {
    return (
        <>
            <Navbar />

            <main>

                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Find your next stay</h1>
                        <p>Search for places to stay and unforgettable experiences.</p>
                    </div>

                    <div className="hero-search">
                        <div>
                            <span>Where</span>
                            <p>Search destinations</p>
                        </div>

                        <div>
                            <span>Check in</span>
                            <p>Add dates</p>
                        </div>

                        <div>
                            <span>Check out</span>
                            <p>Add dates</p>
                        </div>

                        <div>
                            <span>Guests</span>
                            <p>Add guests</p>
                        </div>

                        <button>Search</button>
                    </div>
                </section>

                <section className="home-section">
                    <h2>Inspiration for your next trip</h2>

                    <div className="destination-grid">
                        <div className="destination-card">
                            <div className="placeholder-image">Cape Town</div>
                            <h3>Cape Town</h3>
                            <p>South Africa</p>
                        </div>

                        <div className="destination-card">
                            <div className="placeholder-image">Johannesburg</div>
                            <h3>Johannesburg</h3>
                            <p>South Africa</p>
                        </div>

                        <div className="destination-card">
                            <div className="placeholder-image">Durban</div>
                            <h3>Durban</h3>
                            <p>South Africa</p>
                        </div>

                        <div className="destination-card">
                            <div className="placeholder-image">Knysna</div>
                            <h3>Knysna</h3>
                            <p>South Africa</p>
                        </div>
                    </div>
                </section>

                <section className="home-section">
                    <h2>Discover Airbnb Experiences</h2>
                    <p className="section-description">
                        Find unique activities and experiences hosted by local people.
                    </p>

                    <div className="experience-grid">
                        <div className="experience-card">
                            <div className="experience-image">Experiences</div>
                            <h3>Things to do</h3>
                            <p>Discover exciting activities wherever you travel.</p>
                        </div>

                        <div className="experience-card">
                            <div className="experience-image">Adventures</div>
                            <h3>Adventures</h3>
                            <p>Explore unforgettable experiences around the world.</p>
                        </div>
                    </div>
                </section>

                <section className="shop-section">
                    <div>
                        <h2>Shop Airbnb</h2>
                        <p>
                            Discover products inspired by travel, design and hospitality.
                        </p>

                        <button>Explore</button>
                    </div>
                </section>

                <section className="home-section">
                    <h2>Inspiration for future getaways</h2>

                    <div className="future-grid">
                        <div>Beach destinations</div>
                        <div>Mountain getaways</div>
                        <div>City breaks</div>
                        <div>Weekend escapes</div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;