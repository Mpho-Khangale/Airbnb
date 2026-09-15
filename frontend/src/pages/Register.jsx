import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from "../api";

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!username || !email || !password) {
            setError("Please complete all fields.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/users/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed."
                );
            }

            console.log("Registered user:", data);

            navigate("/login");
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
                        <h1>Create an account</h1>

                        <p>
                            Join Airbnb and start exploring.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="username">
                                Name
                            </label>

                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your name"
                                value={username}
                                onChange={(event) =>
                                    setUsername(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="register-email">
                                Email
                            </label>

                            <input
                                id="register-email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="register-password">
                                Password
                            </label>

                            <input
                                id="register-password"
                                type="password"
                                placeholder="Create a password"
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
                                ? "Creating account..."
                                : "Sign up"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account?{" "}
                        <Link to="/login">
                            Log in
                        </Link>
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Register;