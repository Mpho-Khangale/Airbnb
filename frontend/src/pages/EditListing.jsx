import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function EditListing() {
    const navigate = useNavigate();
    const { id } = useParams();

    const sampleListings = [
        {
            id: 1,
            title: "Modern apartment with city views",
            location: "Cape Town",
            description:
                "A modern apartment with beautiful views of the city.",
            type: "Entire apartment",
            bedrooms: 2,
            bathrooms: 2,
            guests: 4,
            price: 1450,
            cleaningFee: 350,
            serviceFee: 250,
            amenities: "Wi-Fi, Kitchen, Parking, TV",
            images: ""
        },
        {
            id: 2,
            title: "Luxury home near the beach",
            location: "Cape Town",
            description:
                "A luxury home located close to the beach.",
            type: "Entire home",
            bedrooms: 3,
            bathrooms: 2,
            guests: 6,
            price: 2300,
            cleaningFee: 450,
            serviceFee: 320,
            amenities: "Wi-Fi, Kitchen, Parking, TV, Pool",
            images: ""
        },
        {
            id: 3,
            title: "Stylish city apartment",
            location: "Johannesburg",
            description:
                "A stylish apartment in the heart of the city.",
            type: "Entire apartment",
            bedrooms: 1,
            bathrooms: 1,
            guests: 2,
            price: 1100,
            cleaningFee: 250,
            serviceFee: 180,
            amenities: "Wi-Fi, Kitchen, TV",
            images: ""
        }
    ];

    const selectedListing =
        sampleListings.find(
            (listing) => listing.id === Number(id)
        ) || sampleListings[0];

    const [formData, setFormData] = useState({
        ...selectedListing
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
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
            setError("Please complete all required fields.");
            return;
        }

        console.log("Updated listing:", formData);

        setSuccess("Listing updated successfully.");

        // PUT request to backend will be added later.

        setTimeout(() => {
            navigate("/admin/listings");
        }, 1000);
    };

    return (
        <>
            <AdminNavbar />

            <main className="admin-page">
                <div className="admin-form-heading">
                    <h1>Update Listing</h1>
                    <p>
                        Edit the information for this property.
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
                            value={formData.description}
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
                                value={formData.guests}
                                onChange={handleChange}
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
                                value={formData.bedrooms}
                                onChange={handleChange}
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
                                value={formData.bathrooms}
                                onChange={handleChange}
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
                                value={formData.price}
                                onChange={handleChange}
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
                                value={formData.cleaningFee}
                                onChange={handleChange}
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
                                value={formData.serviceFee}
                                onChange={handleChange}
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
                            value={formData.amenities}
                            onChange={handleChange}
                        />

                        <small>
                            Separate amenities with commas.
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
                                navigate("/admin/listings")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="admin-primary-button form-submit"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default EditListing;