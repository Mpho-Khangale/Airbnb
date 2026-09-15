import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from "../api";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/users/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed."
                );
            }

            if (data.user?.role !== "admin") {
                throw new Error(
                    "You do not have administrator access."
                );
            }

            localStorage.setItem(
                "adminToken",
                data.token
            );

            localStorage.setItem(
                "adminUser",
                JSON.stringify(data.user)
            );

            navigate("/admin/listings");
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="auth-page">
                <div className="auth-card">
                    <div className="auth-heading">
                        <h1>Admin login</h1>

                        <p>
                            Log in to manage your Airbnb listings.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="admin-email">
                                Email
                            </label>

                            <input
                                id="admin-email"
                                type="email"
                                placeholder="Enter admin email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="admin-password">
                                Password
                            </label>

                            <input
                                id="admin-password"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Logging in..."
                                : "Admin login"}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default AdminLogin;