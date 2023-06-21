import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages'
import SumRankings from './pages/sumrankings';
import ClubReport from './pages/clubreport';
import PageFooter from './components/pagefooter';
import ClubCompare from './pages/clubcompare';

function App() {
  return (
    <Router>
      <Navbar/>
      <article>
        <div className="spacer"></div>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/sumrankings' element={<SumRankings />} />
          <Route path='/clubreport' element={<ClubReport />} />
          <Route path='/clubcompare' element={<ClubCompare />} />
        </Routes>
      </article>
      <PageFooter/>
    </Router>
  );
}

export default App;
