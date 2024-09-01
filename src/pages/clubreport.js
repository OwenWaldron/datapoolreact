import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import SmartSelect from "../components/SmartSelect";
import SearchBar from '../components/searchbar'
import SmartSlider from "../components/smartslider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import StatusMarker from '../components/statusmarker';
import CollapseTable from "../components/collapsetable";
import loadingGif from './assets/loading.gif';



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
    const POINTS = [
        {value: 'FINA', label: 'FINA'},
        {value: 'CAGP', label: 'CAGP'}
    ];
    const [gender, setGender] = useState('M');
    const [course, setCourse] = useState('LCM');
    const [stroke, setStroke] = useState('FR');
    const [points, setPoints] = useState('FINA');
    const [place, setPlace] = useState(50);
    const [seasons, setSeasons] = useState([2008, 2023]);
    const [ages, setAges] = useState([10, 18]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clubName, setClubName] = useState('');
    const [upToDate, setUpToDate] = useState(true);


    const updateResults = async () => {
        setLoading(true);
        let url = `https://apis.data-pool.ca/api/clubreport/general?age_min=${ages[0]}&age_max=${ages[1]}&first_season=${seasons[0]}&last_season=${seasons[1]}&club_name=${clubName}&gender=${gender}&course=${course}&stroke=${stroke}&max_place=${place}&points_style=${points}`;
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
    }
    useEffect(() => {
        setLoading(false);
    }, [data]);

    const HEADERS = ['Name', 'Birthday', 'Gender', 'Event', 'Date of swim', 'Time', 'Ranking', points];
    let header_row = []
    let data_row = []
    let graph_data = []
    let swimmer_tables = []
    for (var year in data) {
        header_row.push(<th>{year}</th>)
        data_row.push(<td>{data[year].points}</td>)
        graph_data.push({year: year, points: data[year].points})
        var swimmer_data = []
        for (var i in data[year].swims) {
            var params = []
            for (var param in data[year].swims[i]) {
                params.push(<td>{data[year].swims[i][param]}</td>)
            }
            swimmer_data.push(<tr>{params}</tr>)
        }
        swimmer_tables.push(
            <>
                <h2>{year}</h2>
                <CollapseTable
                    headers={HEADERS}
                    data={swimmer_data} />
                <br/><br/>
            </>
        )
    }
    swimmer_tables.reverse()

    var points_table = (
        <table> 
            <thead>
                <tr>{header_row}</tr>
            </thead>
            <tbody>
                <tr>{data_row}</tr>
            </tbody>
        </table>
    )


    return (
        <div className='content'>
            <StatusMarker
                changer={setUpToDate}/>
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
            <SmartSelect
                label="Points"
                changer={setPoints} 
                options={POINTS} 
                value={points} />
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
                range={[2008, upToDate? 2024 : 2023]}
                marks
                changer={setSeasons} />
            <br/>
            <Button variant="contained" onClick={updateResults}>Get Results</Button>
            <br/>
            <br/>
            <br/>
            {loading? <img src={loadingGif} className='loading' alt="loading" /> : 
                <>
                    {points_table}
                    <br/>
                    {data.length === 0 ? <></> : 
                        <>
                            <LineChart
                                width={800}
                                height={500}
                                data={graph_data} 
                                style={{margin: 'auto'}}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="points" stroke="#02bad6"/>
                            </LineChart>
                            <br/>
                            {swimmer_tables}
                        </>
                    }
                    
                </>}
        </div>
    );
};
 
export default ClubReport;