import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Location from "./pages/Location";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminListings from "./pages/AdminListings";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/location" element={<Location />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/listings" element={<AdminListings />} />
        </Routes>
    );
}

export default App;