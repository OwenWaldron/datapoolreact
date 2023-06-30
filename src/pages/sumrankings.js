import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import SmartSelect from "../components/SmartSelect";
import SmartSlider from "../components/smartslider";
import StatusMarker from "../components/statusmarker";
import loadingGif from './assets/loading.gif';



const SumRankings = () => {
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
    const [season, setSeason] = useState(2023);
    const [ages, setAges] = useState([10, 18]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [upToDate, setUpToDate] = useState(true);


    const STEM = 'https://apis.data-pool.ca/api/sumrankings?';
    const updateResults = async () => {
        setLoading(true);
        let url = STEM + `age=${ages[0]}&age_max=${ages[1]}&season=${season}&gender=${gender}&course=${course}&stroke=${stroke}&max_place=${place}&points_style=${points}`;
        const res = await fetch(`${url}`);
        const data = await res.json();
        setData(data);
    }
    useEffect(() => {
        setLoading(false);
    }, [data]);

    var tableData = []
    for (let i = 0; i < data.length; i++) {
        tableData.push(
            <tr class="data">
                <td>{i + 1}</td>
                <td>{data[i][0]}</td>
                <td>{data[i][1]}</td>
            </tr>
        );
    }
    let table = ""
    if (tableData.length > 0) {
        table = (
            <table id="tableau">
                <thead>
                    <th>#</th>
                    <th>Club</th>
                    <th>Total Fina Points</th>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        )
    }

    return (
        <div className='content'>
            <StatusMarker changer={setUpToDate}/>
            <h2>SumRanking</h2>
            <div>
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
                    value={season}
                    valueLabelDisplay="auto"
                    step={1}
                    range={[2008, upToDate? 2023 : 2022]}
                    marks
                    changer={setSeason} />
                <br/>
                <Button variant="contained" onClick={updateResults}>Get Results</Button>
            </div>
            <br/>
            <br/>
            <br/>
            {loading? <img src={loadingGif} className='loading' alt="loading" /> : table}
        </div>
    );
};
 
export default SumRankings;