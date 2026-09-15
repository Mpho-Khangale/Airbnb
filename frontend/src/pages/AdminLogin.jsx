import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        // Temporary frontend authentication.
        // This will be replaced with the backend JWT login later.
        localStorage.setItem("adminAuthenticated", "true");

        navigate("/admin/listings");
    };

    return (
        <main className="admin-login-page">
            <div className="admin-login-card">
                <div className="admin-login-logo">
                    airbnb
                </div>

                <h1>Admin Login</h1>

                <p className="admin-login-description">
                    Log in to manage your property listings.
                </p>

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
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Log in
                    </button>
                </form>

                <button
                    className="back-home-button"
                    onClick={() => navigate("/")}
                >
                    Back to Airbnb
                </button>
            </div>
        </main>
    );
}

export default AdminLogin;