import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellerDashboard from "../pages/SellerDashboard";
import MyListings from "../pages/MyListings";
import Rentals from "../pages/Rentals";
import SalesHistory from "../pages/SalesHistory";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Support from "../pages/Support";
function Dashboard() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<SellerDashboard />} />
        <Route path="/listings" element={<MyListings />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/sales" element={<SalesHistory />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  )
}

export default Dashboard