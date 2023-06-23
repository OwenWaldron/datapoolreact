import React from 'react';
 
const Home = () => {
    return (
        <div className='content'>
            <h1>Welcome to DataPool!</h1>
            <p>
                DataPool is an app designed to provide insight into the performance of Canadian competitve swimming clubs. 
                All data is derived form <a href='https://swimrankings.net'>swimrankings.net</a>'s database, and DataPool does not guarantee correctness of its analytics. 
                Use the navigation bar to access various features.
                <br/><br/>
                DataPool is designed for use on a computer.
            </p>     
        </div>
    );
};
 
export default Home;