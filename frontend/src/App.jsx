import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Location from "./pages/Location";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminListings from "./pages/AdminListings";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import AdminLogin from "./pages/AdminLogin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location" element={<Location />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/listings" element={<AdminListings />} />
            <Route path="/admin/create-listing" element={<CreateListing />} />
            <Route path="/admin/edit-listing/:id" element={<EditListing />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/listings" element={
                    <ProtectedAdminRoute>
                        <AdminListings />
                    </ProtectedAdminRoute>
                }
            />
        </Routes>
    );
}

export default App;