import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrackReport from "./pages/TrackReport";
import UserDashboard from "./pages/UserDashboard"; 
import Analytics from "./pages/Analytics";
import ReportForm from "./pages/ReportForm";
import ProtectedRoute from "./routes/ProtectedRoute";

 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Landing />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/track"     element={<TrackReport />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard"  element={<UserDashboard />} />
          <Route path="/report"     element={<ReportForm />} />
          <Route path="/analytics"  element={<Analytics />} />
        </Route>       
        <Route path="*" element={<Navigate to="/" />} />
 
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
