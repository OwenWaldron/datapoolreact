import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import SmartSelect from "../components/SmartSelect";
import SearchBar from '../components/searchbar'
import SmartSlider from "../components/smartslider";
 
const ClubReport = () => {
    const GENDERS = [
        {value: "M", label: "Men"},
        {value: 'F', label: "Women"},
        {value: 'B', label: 'Both'}
    ];
    const COURSES = [
        {value: 'LCM', label: 'Long course'},
        {value: 'SCM', label: 'Short course'},
        {value: 'ALL', label: 'Both'}
    ];
    const STROKES = [
        {value: 'NA', label: 'All strokes'},
        {value: 'FR', label: 'Freestyle'},
        {value: 'BK', label: 'Backstroke'},
        {value: 'FL', label: 'Fly'},
        {value: 'BR', label: 'Breaststroke'},
        {value: 'IM', label: 'IM'}
    ];
    const [gender, setGender] = useState('M');
    const [course, setCourse] = useState('LCM');
    const [stroke, setStroke] = useState('FR');
    const [place, setPlace] = useState(50);
    const [seasons, setSeasons] = useState([2008, 2023]);
    const [ages, setAges] = useState([10, 18]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clubName, setClubName] = useState('');


    const updateResults = async () => {
        setLoading(true);
        let url = `https://www.data-pool.ca/api/clubreport/general?age_min=${ages[0]}&age_max=${ages[1]}&first_season=${seasons[0]}&last_season=${seasons[1]}&club_name=${clubName}&gender=${gender}&course=${course}&stroke=${stroke}&max_place=${place}`;
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
    }
    useEffect(() => {
        setLoading(false);
    }, [data]);


    let header_row = []
    let data_row = []
    for (var year in data) {
        header_row.push(<th>{year}</th>)
        data_row.push(<td>{data[year].points}</td>)
    }
    var table = 
        <table> 
            <thead>
                <tr>{header_row}</tr>
            </thead>
            <tbody>
                <tr>{data_row}</tr>
            </tbody>
        </table>
    


    return (
        <div className='content'>
            <h2>Club Report</h2>
            <SearchBar
                value={clubName}
                changer={setClubName} />
            <br/>
            <SmartSelect
                label="Gender"
                changer={setGender} 
                options={GENDERS} 
                value={gender} />
            <SmartSelect
                label="Course"
                changer={setCourse} 
                options={COURSES} 
                value={course} />
            <SmartSelect
                label="Stroke"
                changer={setStroke} 
                options={STROKES} 
                value={stroke} />
            <br/>
            <SmartSlider
                label='Places'
                value={place}
                valueLabelDisplay="auto"
                step={1}
                range={[10,100]}
                changer={setPlace} />
            <br/>
            <SmartSlider
                label='Ages'
                value={ages}
                valueLabelDisplay="auto"
                step={1}
                range={[0,30]}
                marks
                changer={setAges}
                disableSwap />
            <br/>
            <SmartSlider
                label='Season'
                value={seasons}
                valueLabelDisplay="auto"
                step={1}
                range={[2008, 2023]}
                marks
                changer={setSeasons} />
            <br/>
            <Button variant="contained" onClick={updateResults}>Get Results</Button>
            <br/>
            <br/>
            <br/>
            {loading? <h4>Loading...</h4> : table}
        </div>
    );
};
 
export default ClubReport;