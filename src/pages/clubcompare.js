import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import SmartSelect from "../components/SmartSelect";
import SearchBar from '../components/searchbar'
import SmartSlider from "../components/smartslider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import StatusMarker from '../components/statusmarker';



const ClubCompare = () => {
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
    var colorArray = [
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    ];
    const [gender, setGender] = useState('M');
    const [course, setCourse] = useState('LCM');
    const [stroke, setStroke] = useState('FR');
    const [points, setPoints] = useState('FINA');
    const [place, setPlace] = useState(50);
    const [seasons, setSeasons] = useState([2008, 2023]);
    const [ages, setAges] = useState([10, 18]);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clubName, setClubName] = useState('');
    const [upToDate, setUpToDate] = useState(true);


    const updateResults = async () => {
        setLoading(true);
        var row_name = `${clubName} ${ages[0]}-${ages[1]} ${gender} ${stroke}`;
        let url = `https://apis.data-pool.ca/api/clubreport/general?age_min=${ages[0]}&age_max=${ages[1]}&first_season=${seasons[0]}&last_season=${seasons[1]}&club_name=${clubName}&gender=${gender}&course=${course}&stroke=${stroke}&max_place=${place}&points_style=${points}`;
        const res = await fetch(url);
        const data = await res.json();
        var row = {name: row_name, data: data};
        let new_rows = [...rows];
        new_rows.push(row)
        setRows(new_rows);
    }
    useEffect(() => {
        setLoading(false);
    }, [rows]);
    const clearRows = () => {
        setRows([]);
    }


    // Generate the tables
    var header_row = ['']
    for (let i = seasons[0]; i <= seasons[1]; i++) {
        header_row.push(i);
    }
    var data_rows = []
    var graph_data = []
    for (let index in rows) {
        var row = rows[index]
        var data_row = [<th>{row.name}</th>]
        for (let year in row.data) {
            data_row.push(<td>{row.data[year].points}</td>)
            let found = false;
            console.log(graph_data)
            for (var i in graph_data) {
                console.log('graph', graph_data[i].year)
                console.log('number', Number(year))
                if (graph_data[i].year === Number(year)) {
                    found = true;
                    graph_data[i][row.name] = row.data[year].points
                    console.log('hi')
                }
            }
            if (!found) {
                var new_row = {year: Number(year)}
                new_row[row.name] = row.data[year].points
                graph_data.push(new_row)
            }
        }
        data_rows.push(<tr>{data_row}</tr>)
    }
    var points_table = (
        <table> 
            <thead>
                {header_row.map((year) => <th>{year}</th>)}
            </thead>
            <tbody>
                {data_rows}
            </tbody>
        </table>
    )

    return (
        <div className='content'>
            <StatusMarker
                changer={setUpToDate}/>
            <h2>Club Compare</h2>
            <SmartSelect
                label="Points"
                changer={setPoints} 
                options={POINTS} 
                value={points} />
            <br/>
            <SmartSlider
                label='Season'
                value={seasons}
                valueLabelDisplay="auto"
                step={1}
                range={[2008, upToDate? 2023 : 2022]}
                marks
                disabled={rows.length > 0}
                changer={setSeasons} />
            <br/>
            <Button variant="contained" onClick={clearRows}>Reset Table</Button>
            <br/>
            <div className="rowForm">
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
                <Button variant="contained" onClick={updateResults}>Add Row</Button>
            </div>
            <br/>
            <br/>
            <br/>
            {loading? <h4>Loading...</h4> : 
                <>
                    {rows.length === 0 ? <></> : points_table}
                    <br/>
                    {rows.length === 0 ? <></> : 
                        <>
                            <LineChart
                                width={800}
                                height={500}
                                data={graph_data} 
                                style={{margin: 'auto'}}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Legend />
                                <Tooltip />
                                {rows.map((row) => {
                                    return( <Line type="monotone" dataKey={row.name} stroke={colorArray[rows.findIndex((test) => test.name === row.name)]}/> );
                                })}
                            </LineChart>
                        </>
                    }
                    
                </>}
        </div>
    );
};
 
export default ClubCompare;