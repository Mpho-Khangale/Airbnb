import Navbar from "../components/Navbar";

function Home() {
    return (
        <>
            <Navbar />

            <main>
                {/* Hero Section */}
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

                {/* Inspiration Section */}
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