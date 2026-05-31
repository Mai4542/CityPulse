import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import ReportForm from './pages/ReportForm';
import TrackPage from './pages/TrackPage';
import RatePage from './pages/RatePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/track" element={<TrackPage />} />
        <Route path="/rate" element={<RatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
