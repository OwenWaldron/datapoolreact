import React, { useState, useEffect } from "react";
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl'; 
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';



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
    const [gender, setGender] = useState('M');
    const [course, setCourse] = useState('LCM');
    const [stroke, setStroke] = useState('FR');
    const [place, setPlace] = useState(50);
    const [season, setSeason] = useState(2023);
    const [ages, setAges] = useState([10, 18]);
    const [data, setData] = useState([]);

    const changeVar = (changer, event) => {
        changer(event.target.value);
    }

    const STEM = 'https://www.data-pool.ca/api/sumrankings?';
    const updateResults = async () => {
        let url = STEM + `age=${ages[0]}&age_max=${ages[1]}&season=${season}&gender=${gender}&course=${course}&stroke=${stroke}&max_place=${place}`;
        const res = await fetch(`${url}`);
        console.log(res)
        const data = await res.json();
        console.log(data);
        setData(data);
    }

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
                <tr>
                    <th>#</th>
                    <th>Club</th>
                    <th>Total Fina Points</th>
                </tr>
                {tableData}
            </table>
        )
    }

    return (
        <div className='content'>
            <h2>SumRanking</h2>
            <FormControl>
                <InputLabel>Gender</InputLabel>
                <Select value={gender} onChange={(event) => changeVar(setGender, event)} label="Gender">
                    {GENDERS.map((row) => (
                        <MenuItem value={row.value} key={row.value}>{row.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Course</InputLabel>
                <Select value={course} onChange={(event) => changeVar(setCourse, event)} label="Gender">
                    {COURSES.map((row) => (
                        <MenuItem value={row.value} key={row.value}>{row.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Stroke</InputLabel>
                <Select value={stroke} onChange={(event) => changeVar(setStroke, event)} label="Gender">
                    {STROKES.map((row) => (
                        <MenuItem value={row.value} key={row.value}>{row.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br/>
            <FormControl>
                <InputLabel>Places</InputLabel>
                <div style={{ width: 300 }}>
                    <Slider
                        label='Places'
                        aria-label="Places"
                        value={place}
                        getAriaValueText={(value) => `Top ${value}`}
                        valueLabelDisplay="auto"
                        step={1}
                        min={10}
                        max={100}
                        onChange={(event) => changeVar(setPlace, event)}
                    />
                </div>
            </FormControl>
            <br/>
            <FormControl>
                <InputLabel>Ages</InputLabel>
                <div style={{ width: 300 }}>
                    <Slider
                        label='Places'
                        value={ages}
                        getAriaValueText={(value) => `${value[0]}-${value[1]}`}
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={30}
                        marks
                        onChange={(event) => changeVar(setAges, event)}
                        disableSwap
                    />
                </div>
            </FormControl>
            <br/>
            <FormControl>
                <InputLabel>Season</InputLabel>
                <div style={{ width: 300 }}>
                    <Slider
                        label='Season'
                        aria-label="Season"
                        value={season}
                        getAriaValueText={(value) => `${value}`}
                        valueLabelDisplay="auto"
                        step={1}
                        min={2008}
                        max={2023}
                        onChange={(event) => changeVar(setSeason, event)}
                    />
                </div>
            </FormControl>
            <br/>
            <Button variant="contained" onClick={updateResults}>Get Results</Button>
            <br/>
            <br/>
            <br/>
            {table}
        </div>
    );
};
 
export default SumRankings;