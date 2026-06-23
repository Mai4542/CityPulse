import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrackReport from "./pages/TrackReport";
import UserDashboard from "./pages/UserDashboard"; 
import Analytics from "./pages/Analytics";
import ReportForm from "./pages/ReportForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";
function App() {
  const { loading } = useAuth();

  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#041626] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Landing />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/track"    element={<TrackReport />} />
        <Route path="/faq"      element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/report"    element={<ReportForm />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>       

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;