// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import TrackReport from "./pages/TrackReport";
 

// import UserDashboard from "./pages/UserDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
 
// import Analytics from "./pages/Analytics";
// import ReportForm from "./pages/ReportForm";
 

// import ProtectedRoute from "./routes/ProtectedRoute";
// import AdminRoute from "./routes/AdminRoute";
 
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/"          element={<Landing />} />
//         <Route path="/login"     element={<Login />} />
//         <Route path="/register"  element={<Register />} />
//         <Route path="/track"     element={<TrackReport />} />

//         <Route element={<ProtectedRoute />}>
//           <Route path="/dashboard"  element={<UserDashboard />} />
//           <Route path="/report"     element={<ReportForm />} />
//           <Route path="/analytics"  element={<Analytics />} />
//         </Route>
 
      
//         <Route element={<AdminRoute />}>
//           <Route path="/admin"            element={<AdminDashboard />} />
//           <Route path="/admin/analytics"  element={<Analytics />} />
     
//         </Route>
 
       
//         <Route path="*" element={<Navigate to="/" replace />} />
 
//       </Routes>
//     </BrowserRouter>
//   );
// }
 
// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* التوجيه التلقائي لصفحة الـ login أول ما تفتحي الموقع */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* مسارات تشغيل الصفحات */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;