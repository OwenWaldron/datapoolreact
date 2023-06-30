import React from 'react';
import cap from './images/cap.png';
 
const Home = () => {
    return (
        <div className='content'>
            <img src={cap} style={{height: '10rem', aspectRatio: 'initial'}} alt="logo"/>
            <h1>Welcome to DataPool!</h1>
            <p>
                DataPool is an app designed to provide insight into the performance of Canadian competitve swimming clubs.
                Use the navigation bar to access various features.
                <br/><br/>
                All data is derived form <a href='https://swimrankings.net'>swimrankings.net</a>'s database, and DataPool does not guarantee correctness of its analytics.
                DataPool is designed for use on a computer and may be limited on mobile.
            </p>     
        </div>
    );
};
 
export default Home;