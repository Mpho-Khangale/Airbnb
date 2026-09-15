import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import API_URL from "../api";

function CreateListing() {
    const navigate = useNavigate();

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
        occupancyTaxes: "",
        amenities: "",
        images: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

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

        // Convert comma-separated amenities into an array
        const amenitiesArray =
            formData.amenities
                .split(",")
                .map((amenity) =>
                    amenity.trim()
                )
                .filter(Boolean);

        // Convert comma-separated image URLs into an array
        const imagesArray =
            formData.images
                .split(",")
                .map((image) =>
                    image.trim()
                )
                .filter(Boolean);

        const listingData = {
            title: formData.title.trim(),
            location:
                formData.location.trim(),
            description:
                formData.description.trim(),
            type: formData.type,

            bedrooms: Number(
                formData.bedrooms
            ),

            bathrooms: Number(
                formData.bathrooms
            ),

            guests: Number(
                formData.guests
            ),

            price: Number(
                formData.price
            ),

            cleaningFee:
                Number(
                    formData.cleaningFee
                ) || 0,

            serviceFee:
                Number(
                    formData.serviceFee
                ) || 0,

            occupancyTaxes:
                Number(
                    formData.occupancyTaxes
                ) || 0,

            amenities: amenitiesArray,

            images: imagesArray
        };

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/accommodations`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify(
                        listingData
                    )
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Unable to create listing."
                );
            }

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
            <AdminNavbar />

            <main className="admin-page">
                <div className="admin-form-heading">
                    <h1>
                        Create Listing
                    </h1>

                    <p>
                        Add a new property
                        to Airbnb.
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

                    <div className="form-group">
                        <label htmlFor="title">
                            Listing title *
                        </label>

                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="e.g. Modern apartment with city views"
                            value={
                                formData.title
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">
                            Location *
                        </label>

                        <input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="e.g. Cape Town, South Africa"
                            value={
                                formData.location
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">
                            Description *
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            rows="6"
                            placeholder="Describe the property..."
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">
                            Property type *
                        </label>

                        <select
                            id="type"
                            name="type"
                            value={
                                formData.type
                            }
                            onChange={
                                handleChange
                            }
                        >
                            <option value="">
                                Select property
                                type
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
                            <label htmlFor="guests">
                                Guests
                            </label>

                            <input
                                id="guests"
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
                            <label htmlFor="bedrooms">
                                Bedrooms
                            </label>

                            <input
                                id="bedrooms"
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
                            <label htmlFor="bathrooms">
                                Bathrooms
                            </label>

                            <input
                                id="bathrooms"
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
                            <label htmlFor="price">
                                Price per night
                                (R) *
                            </label>

                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                placeholder="1450"
                                value={
                                    formData.price
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cleaningFee">
                                Cleaning fee (R)
                            </label>

                            <input
                                id="cleaningFee"
                                name="cleaningFee"
                                type="number"
                                min="0"
                                placeholder="350"
                                value={
                                    formData.cleaningFee
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="serviceFee">
                                Service fee (R)
                            </label>

                            <input
                                id="serviceFee"
                                name="serviceFee"
                                type="number"
                                min="0"
                                placeholder="250"
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
                        <label htmlFor="occupancyTaxes">
                            Occupancy taxes (R)
                        </label>

                        <input
                            id="occupancyTaxes"
                            name="occupancyTaxes"
                            type="number"
                            min="0"
                            placeholder="150"
                            value={
                                formData.occupancyTaxes
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="amenities">
                            Amenities
                        </label>

                        <input
                            id="amenities"
                            name="amenities"
                            type="text"
                            placeholder="Wi-Fi, Kitchen, Parking, TV, Pool"
                            value={
                                formData.amenities
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <small>
                            Separate amenities
                            with commas.
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="images">
                            Property image URLs
                        </label>

                        <textarea
                            id="images"
                            name="images"
                            rows="6"
                            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg, https://example.com/image3.jpg"
                            value={
                                formData.images
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <small>
                            Add up to 5 image URLs
                            and separate each URL
                            with a comma. The first
                            image will be used as
                            the main property image.
                        </small>
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
                            disabled={
                                loading
                            }
                        >
                            {loading
                                ? "Creating..."
                                : "Create Listing"}
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default CreateListing;