import React from "react";
import swimmer from './swimmer.png'; 


const Navbar = () => {
     return (
        <>
            <header>
                <h1 style={{padding: '0 10rem 0'}}>
                    <img src={swimmer} class="icon" alt="logo"/>
                    Data<b style={{color: "#a4f4f8"}}>Pool</b>
                </h1>
                <nav class="nav" style={{padding: '0 10rem 0'}}>
                    <a class="nav-link" href="/"><b>Home</b></a>
                    <a class="nav-link" href="/sumrankings">Sum Rankings</a>
                    <a class="nav-link" href="/clubreport">Club Reports</a>
                </nav>  
            </header>
            <div class="spacer"></div>
        </>
     );
}

export default Navbar;