import React from "react";
import swimmer from './swimmer.png'; 


const Navbar = () => {
     return (
        <header>
            <h1 style={{padding: '0 10rem 0'}}>
                <img src={swimmer} className="icon" alt="logo"/>
                Data<b style={{color: "#a4f4f8"}}>Pool</b>
            </h1>
            <nav className="nav" style={{padding: '0 10rem 0'}}>
                <a className="nav-link" href="/"><b>Home</b></a>
                <a className="nav-link" href="/sumrankings">Sum Rankings</a>
                <a className="nav-link" href="/clubreport">Club Reports</a>
                <a className="nav-link" href="/clubcompare">Club Compare</a>
            </nav>  
        </header>
     );
}

export default Navbar;