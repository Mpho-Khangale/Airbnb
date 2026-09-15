import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function EditListing() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        description: "",
        type: "",
        bedrooms: 1,
        bathrooms: 1,
        guests: 1,
        price: "",
        cleaningFee: "",
        serviceFee: "",
        amenities: "",
        images: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Load the selected listing from MongoDB
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:5000/api/accommodations/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                            "Unable to load listing."
                    );
                }

                setFormData({
                    title: data.title || "",
                    location: data.location || "",
                    description: data.description || "",
                    type: data.type || "",

                    bedrooms: data.bedrooms ?? 1,
                    bathrooms: data.bathrooms ?? 1,
                    guests: data.guests ?? 1,

                    price: data.price ?? "",
                    cleaningFee:
                        data.cleaningFee ?? "",
                    serviceFee:
                        data.serviceFee ?? "",

                    amenities: Array.isArray(
                        data.amenities
                    )
                        ? data.amenities.join(", ")
                        : "",

                    images: Array.isArray(data.images)
                        ? data.images[0] || ""
                        : ""
                });
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    // Update listing in MongoDB
    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.title ||
            !formData.location ||
            !formData.description ||
            !formData.type ||
            !formData.price
        ) {
            setError(
                "Please complete all required fields."
            );
            return;
        }

        const token =
            localStorage.getItem("adminToken");

        if (!token) {
            navigate("/admin/login");
            return;
        }

        const updatedListing = {
            title: formData.title.trim(),

            location: formData.location.trim(),

            description:
                formData.description.trim(),

            type: formData.type,

            bedrooms: Number(
                formData.bedrooms
            ),

            bathrooms: Number(
                formData.bathrooms
            ),

            guests: Number(formData.guests),

            price: Number(formData.price),

            cleaningFee:
                Number(formData.cleaningFee) || 0,

            serviceFee:
                Number(formData.serviceFee) || 0,

            amenities: formData.amenities
                .split(",")
                .map((amenity) =>
                    amenity.trim()
                )
                .filter(Boolean),

            images: formData.images.trim()
                ? [formData.images.trim()]
                : []
        };

        try {
            setSaving(true);

            const response = await fetch(
                `http://localhost:5000/api/accommodations/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify(
                        updatedListing
                    )
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Unable to update listing."
                );
            }

            setSuccess(
                "Listing updated successfully."
            );

            setTimeout(() => {
                navigate("/admin/listings");
            }, 800);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <>
                <AdminNavbar />

                <main className="admin-page">
                    <div className="admin-message">
                        <p>
                            Loading listing...
                        </p>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <AdminNavbar />

            <main className="admin-page">
                <div className="admin-form-heading">
                    <h1>Update Listing</h1>

                    <p>
                        Edit the information for this
                        property.
                    </p>
                </div>

                <form
                    className="listing-form"
                    onSubmit={handleSubmit}
                >
                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="form-success">
                            {success}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="edit-title">
                            Listing title *
                        </label>

                        <input
                            id="edit-title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-location">
                            Location *
                        </label>

                        <input
                            id="edit-location"
                            name="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-description">
                            Description *
                        </label>

                        <textarea
                            id="edit-description"
                            name="description"
                            rows="6"
                            value={
                                formData.description
                            }
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-type">
                            Property type *
                        </label>

                        <select
                            id="edit-type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select property type
                            </option>

                            <option value="Entire apartment">
                                Entire apartment
                            </option>

                            <option value="Entire home">
                                Entire home
                            </option>

                            <option value="Private room">
                                Private room
                            </option>

                            <option value="Guest house">
                                Guest house
                            </option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="edit-guests">
                                Guests
                            </label>

                            <input
                                id="edit-guests"
                                name="guests"
                                type="number"
                                min="1"
                                value={
                                    formData.guests
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-bedrooms">
                                Bedrooms
                            </label>

                            <input
                                id="edit-bedrooms"
                                name="bedrooms"
                                type="number"
                                min="0"
                                value={
                                    formData.bedrooms
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-bathrooms">
                                Bathrooms
                            </label>

                            <input
                                id="edit-bathrooms"
                                name="bathrooms"
                                type="number"
                                min="0"
                                value={
                                    formData.bathrooms
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="edit-price">
                                Price per night (R) *
                            </label>

                            <input
                                id="edit-price"
                                name="price"
                                type="number"
                                min="0"
                                value={
                                    formData.price
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-cleaning">
                                Cleaning fee (R)
                            </label>

                            <input
                                id="edit-cleaning"
                                name="cleaningFee"
                                type="number"
                                min="0"
                                value={
                                    formData.cleaningFee
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-service">
                                Service fee (R)
                            </label>

                            <input
                                id="edit-service"
                                name="serviceFee"
                                type="number"
                                min="0"
                                value={
                                    formData.serviceFee
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-amenities">
                            Amenities
                        </label>

                        <input
                            id="edit-amenities"
                            name="amenities"
                            type="text"
                            placeholder="Wi-Fi, Kitchen, Parking, TV"
                            value={
                                formData.amenities
                            }
                            onChange={handleChange}
                        />

                        <small>
                            Separate amenities with
                            commas.
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-images">
                            Image URL
                        </label>

                        <input
                            id="edit-images"
                            name="images"
                            type="url"
                            placeholder="https://example.com/property.jpg"
                            value={formData.images}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="listing-form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() =>
                                navigate(
                                    "/admin/listings"
                                )
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="admin-primary-button form-submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default EditListing;