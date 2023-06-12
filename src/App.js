import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages'
import SumRankings from './pages/sumrankings';
import ClubReport from './pages/clubreport';
import PageFooter from './components/pagefooter';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sumrankings' element={<SumRankings />} />
        <Route path='/clubreport' element={<ClubReport />} />
      </Routes>
      <PageFooter/>
    </Router>
  );
}

export default App;
