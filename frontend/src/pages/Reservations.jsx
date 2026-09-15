import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Reservations() {
    const navigate = useNavigate();

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReservations = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await fetch(
    "http://localhost:5000/api/reservations/user",
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                            "Unable to load reservations."
                    );
                }

                setReservations(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [navigate]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-ZA", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const handleCancel = async (reservationId) => {
    const confirmed = window.confirm(
        "Are you sure you want to cancel this reservation?"
    );

    if (!confirmed) {
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:5000/api/reservations/${reservationId}`,
            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message ||
                    "Unable to cancel reservation."
            );
        }

        setReservations((currentReservations) =>
            currentReservations.filter(
                (reservation) =>
                    reservation._id !== reservationId
            )
        );
    } catch (error) {
        console.error(error);
        setError(error.message);
    }
};

    return (
        <>
            <Navbar />

            <main className="reservations-page">
                <div className="reservations-heading">
                    <h1>My reservations</h1>
                    <p>
                        View your upcoming and previous stays.
                    </p>
                </div>

                {loading && (
                    <div className="reservation-message">
                        <p>Loading reservations...</p>
                    </div>
                )}

                {error && (
                    <div className="reservation-message">
                        <h2>Something went wrong</h2>
                        <p>{error}</p>
                    </div>
                )}

                {!loading &&
                    !error &&
                    reservations.length === 0 && (
                        <div className="empty-reservations">
                            <h2>No reservations yet</h2>

                            <p>
                                When you reserve a stay,
                                it will appear here.
                            </p>

                            <Link
                                to="/"
                                className="explore-stays-button"
                            >
                                Explore stays
                            </Link>
                        </div>
                    )}

                {!loading &&
                    !error &&
                    reservations.length > 0 && (
                        <div className="reservations-grid">
                            {reservations.map(
                                (reservation) => {
                                    const accommodation =
                                        reservation.accommodationId;

                                    return (
                                        <article
                                            className="reservation-card"
                                            key={reservation._id}
                                        >
                                            <div className="reservation-image">
                                                {accommodation
                                                    ?.images?.[0] ? (
                                                    <img
                                                        src={
                                                            accommodation
                                                                .images[0]
                                                        }
                                                        alt={
                                                            accommodation
                                                                .title ||
                                                            "Accommodation"
                                                        }
                                                    />
                                                ) : (
                                                    <span>
                                                        Property image
                                                    </span>
                                                )}
                                            </div>

                                            <div className="reservation-content">
                                                <p className="reservation-location">
                                                    {accommodation
                                                        ?.location ||
                                                        "Accommodation"}
                                                </p>

                                                <h2>
                                                    {accommodation
                                                        ?.title ||
                                                        "Reserved stay"}
                                                </h2>

                                                <div className="reservation-dates">
                                                    <div>
                                                        <span>
                                                            Check-in
                                                        </span>

                                                        <strong>
                                                            {formatDate(
                                                                reservation.checkIn
                                                            )}
                                                        </strong>
                                                    </div>

                                                    <div>
                                                        <span>
                                                            Check-out
                                                        </span>

                                                        <strong>
                                                            {formatDate(
                                                                reservation.checkOut
                                                            )}
                                                        </strong>
                                                    </div>
                                                </div>

                                                <p>
                                                    {reservation.guests}{" "}
                                                    {reservation.guests ===
                                                    1
                                                        ? "guest"
                                                        : "guests"}
                                                </p>

                                                <div className="reservation-total">
                                                    <span>
                                                        Total
                                                    </span>

                                                    <strong>
                                                        R
                                                        {Number(
                                                            reservation.totalPrice
                                                        ).toLocaleString()}
                                                    </strong>
                                                </div>

                                                {accommodation?._id && (
                                                    <Link
                                                        to={`/listing/${accommodation._id}`}
                                                        className="view-stay-link"
                                                    >
                                                        View stay
                                                    </Link>
                                                )}

                                                <button type="button" className="cancel-reservation-button" onClick={() =>handleCancel(reservation._id)}>
                                                  Cancel reservation
                                                </button>


                                            </div>
                                        </article>
                                    );
                                }
                            )}
                        </div>
                    )}
            </main>

            <Footer />
        </>
    );
}

export default Reservations;