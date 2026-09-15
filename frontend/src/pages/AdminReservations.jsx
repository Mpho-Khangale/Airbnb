import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function AdminReservations() {
    const navigate = useNavigate();

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReservations = async () => {
            const token = localStorage.getItem("adminToken");

            if (!token) {
                navigate("/admin/login");
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://localhost:5000/api/reservations/host",
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

    return (
        <>
            <AdminNavbar />

            <main className="admin-page">
                <div className="admin-page-heading">
                    <div>
                        <h1>Reservations</h1>
                        <p>
                            View reservations made for your
                            properties.
                        </p>
                    </div>
                </div>

                {loading && (
                    <div className="admin-message">
                        <p>Loading reservations...</p>
                    </div>
                )}

                {error && (
                    <div className="admin-message admin-error">
                        <h2>Something went wrong</h2>
                        <p>{error}</p>
                    </div>
                )}

                {!loading &&
                    !error &&
                    reservations.length === 0 && (
                        <div className="admin-message">
                            <h2>No reservations yet</h2>

                            <p>
                                Reservations for your
                                properties will appear here.
                            </p>
                        </div>
                    )}

                {!loading &&
                    !error &&
                    reservations.length > 0 && (
                        <div className="admin-reservations-list">
                            {reservations.map(
                                (reservation) => {
                                    const accommodation =
                                        reservation.accommodationId;

                                    const guest =
                                        reservation.userId;

                                    return (
                                        <article
                                            className="admin-reservation-card"
                                            key={reservation._id}
                                        >
                                            <div className="admin-reservation-image">
                                                {accommodation
                                                    ?.images?.[0] ? (
                                                    <img
                                                        src={
                                                            accommodation
                                                                .images[0]
                                                        }
                                                        alt={
                                                            accommodation.title
                                                        }
                                                    />
                                                ) : (
                                                    <span>
                                                        Property
                                                        image
                                                    </span>
                                                )}
                                            </div>

                                            <div className="admin-reservation-content">
                                                <p className="admin-listing-location">
                                                    {accommodation
                                                        ?.location ||
                                                        "Location unavailable"}
                                                </p>

                                                <h2>
                                                    {accommodation
                                                        ?.title ||
                                                        "Property"}
                                                </h2>

                                                <div className="admin-reservation-details">
                                                    <p>
                                                        <strong>
                                                            Check-in:
                                                        </strong>{" "}
                                                        {formatDate(
                                                            reservation.checkIn
                                                        )}
                                                    </p>

                                                    <p>
                                                        <strong>
                                                            Check-out:
                                                        </strong>{" "}
                                                        {formatDate(
                                                            reservation.checkOut
                                                        )}
                                                    </p>

                                                    <p>
                                                        <strong>
                                                            Guests:
                                                        </strong>{" "}
                                                        {
                                                            reservation.guests
                                                        }
                                                    </p>

                                                    {guest && (
                                                        <p>
                                                            <strong>
                                                                Guest:
                                                            </strong>{" "}
                                                            {guest.username ||
                                                                guest.email ||
                                                                "Guest"}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="admin-reservation-bottom">
                                                    <p>
                                                        <strong>
                                                            R
                                                            {Number(
                                                                reservation.totalPrice
                                                            ).toLocaleString()}
                                                        </strong>{" "}
                                                        total
                                                    </p>

                                                    {accommodation?._id && (
                                                        <Link
                                                            to={`/listing/${accommodation._id}`}
                                                            className="admin-view-button"
                                                        >
                                                            View
                                                            property
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    );
                                }
                            )}
                        </div>
                    )}
            </main>
        </>
    );
}

export default AdminReservations;