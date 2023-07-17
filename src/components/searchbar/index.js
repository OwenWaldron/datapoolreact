import React, {useEffect, useState} from 'react';



const getClubsFromAPI = async (search, searchPath) => {
    let url = searchPath? `${searchPath}${search}` : `https://apis.data-pool.ca//api/clubs?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const SearchBar = (props) => {
    const [clubs, setClubs] = useState([]);
    const [showingClubs, setShowingClubs] = useState(false);
    const handleChange = (e) => {
        props.changer(e.target.value)
        setShowingClubs(true);
    }
    const handleClick = (name) => {
        props.changer(name)
        setShowingClubs(false)
    }

    useEffect(() => {
        getClubsFromAPI(props.value, props.searchPath).then((clubs) => {
            setClubs(clubs);
        })
    }, [props.value, props.searchPath])

    let club_list = clubs.map((club) => { return (
        <div key={club.id}>
            <b className="club" onClick={(e) => (handleClick(club.name))} value={club.name}>{ club.name }</b><br/>
        </div>
    )})

    return (
        <>
            <input 
                type="text" 
                placeholder="Search..." 
                id="clubSearch" 
                className="searchBar" 
                value={props.value}
                onChange={handleChange} />
            <div className="clubs" id="dropdown">
                {showingClubs? club_list : <></>}
            </div>
        </>
    );

}

export default SearchBar;
