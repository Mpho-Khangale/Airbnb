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