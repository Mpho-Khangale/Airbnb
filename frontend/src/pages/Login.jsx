import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_URL from "../api";

function Login() {
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

            localStorage.setItem("token", data.token);

            localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

            navigate("/");

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
                        <h1>Log in</h1>

                        <p>
                            Welcome back to Airbnb
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
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
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
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
                                : "Log in"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account?{" "}
                        <Link to="/register">
                            Sign up
                        </Link>
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Login;