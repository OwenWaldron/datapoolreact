import React, {useEffect, useState} from 'react';



const getClubsFromAPI = async (search) => {
    let url = `http://127.0.0.1:8000/api/clubs?search=${search}`
    const res = await fetch(`${url}`);
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
        console.log(name)
        setShowingClubs(false)
    }

    useEffect(() => {
        getClubsFromAPI(props.value).then((clubs) => {
            setClubs(clubs);
        })
    }, [props.value])

    let club_list = clubs.map((club) => { return (
        <>
            <b className="club" onClick={(e) => (handleClick(club.name))} value={club.name} key={club.id}>{ club.name }</b><br/>
        </>
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
