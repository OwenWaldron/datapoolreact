import React from "react";
import cap from './capshadow.png'; 


const Navbar = () => {
    let applefonts = ['-apple-system', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'];

     return (
        <header>
            <h1 style={{padding: '0 10rem 0'}}>
                <img src={cap} className="icon" alt="logo"/>
                <b style={{ fontFamily: ["Courier New", "monospace"], fontWeight: "900"}}>Data</b>
                <b style={{color: "#a4f4f8", fontFamily: applefonts}}>Pool</b>
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