import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import SmartSelect from "../components/SmartSelect";
import SearchBar from '../components/searchbar'
import SmartSlider from "../components/smartslider";
import loadingGif from './assets/loading.gif';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Title,
    Legend
  } from 'chart.js';
import { Scatter } from 'react-chartjs-2';


ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Title, Legend);

const COLORS = {
    2022: 'rgb(110, 230, 240)',
    2023: 'rgb(14, 160, 255)'
}
const SCALE = 0.3;


const avgFunc = (list, valFunc = (x) => x) => {
    let sum = 0;
    let count = 0;
    for (let i in list) {
        count++;
        sum += valFunc(list[i]);
    }
    return sum / count;
}


const stdevFunc = (list, avg, valFunc = (x) => x) => {
    let sum = 0;
    let count = 0;
    for (let i in list) {
        count++;
        sum += (valFunc(list[i]) - avg) ** 2;
    }
    return Math.sqrt(sum / count);
}


const DevMod = () => {
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
    const [yob, setYOB] = useState(2004);
    const [datasets, setDataSets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clubName, setClubName] = useState('');
    const [range, setRange] = useState([0, 0]);


    const updateResults = async () => {
        setLoading(true);
        let rowName = `${clubName} ${yob} ${gender} ${stroke} ${course}`
        let url = `https://apis.data-pool.ca/devmod/get?yob=${yob}&gender=${gender}&course=${course}&stroke=${stroke}&club_name=${clubName}`;
        const res = await fetch(url);
        const data = await res.json();

        let nextRow = {
            name: rowName,
            rows: []
        };
        let newRange = [...range];
        for (let i in data) {
            let year = data[i];
            let swimmers = new Map();
            let row = {
                label: `${i} ${rowName}`,
                data: [],
                backgroundColor: COLORS[i]
            };
            
            for (let j in year) {
                let swim = year[j];
                if (swimmers.has(swim.swimmer__id)) {
                    let old = swimmers.get(swim.swimmer__id);
                    old.push(swim.points)
                } else {
                    swimmers.set(swim.swimmer__id, [swim.points]);
                }
            }
            for (let swimmer of swimmers.values()) {
                let avg = avgFunc(swimmer);
                let stdev = stdevFunc(swimmer, avg);
                row.data.push({
                    x: avg,
                    y: stdev
                })
                if (avg + 25 > newRange[0]) {
                    newRange[0] = avg + 25;
                }
                if (stdev + 10 > newRange[1]) {
                    newRange[1] = stdev + 10;
                }
            }
            let avgX = avgFunc(row.data, (item) => item.x);
            let avgY = avgFunc(row.data, (item) => item.y);
            let stdevX = stdevFunc(row.data, avgX, (item) => item.x);
            let stdevY = stdevFunc(row.data, avgY, (item) => item.y);
            let radius = Math.sqrt(stdevX**2 + stdevY**2) * SCALE;
            nextRow.rows.push(row);
            nextRow.rows.push( {
                label: `Average ${i} ${rowName}`,
                data: [{
                    x: avgX,
                    y: avgY
                }],
                backgroundColor: COLORS[i],
                radius: radius
            });
        }
        let newRows = [...datasets];
        newRows.push(nextRow);
        setRange(newRange);
        setDataSets(newRows);
    }
    useEffect(() => {
        setLoading(false);
    }, [datasets]);
    const clearDataSets = () => {
        setDataSets([]);
    }


    // generate graphs
    let plots = [];
    for (let i in datasets) {
        plots.push(
            <div key={i} className="plotBundle" id={`d${i}`}>
                <Scatter 
                    className="canvas"
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: datasets[i].name,
                                font: {
                                    size: 24,
                                    weight: 'bold'
                                }
                            },
                            legend: {
                                labels: {
                                    filter: (item, chart) => {
                                        return !item.text.includes("Average")
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                type: 'linear',
                                position: 'bottom',
                                min: 0,
                                max: range[0],
                                title: {
                                    display: true,
                                    text: "Average of FINA Points Accross All Swims"
                                }
                            },
                            y: {
                                type: 'linear',
                                position: 'left',
                                min: 0,
                                max: range[1],
                                title: {
                                    display: true,
                                    text: "Standard Deviation of FINA Points Accross All Swims"
                                }
                            }
                        },
                        backgroundColor: '#c9fafe'
                    }}
                    data={{datasets: datasets[i].rows}} />
                    <Button
                        onClick={() => {
                            var link = document.createElement('a');
                            link.download = 'image.png';
                            var canvas = document.getElementById(`d${i}`).getElementsByClassName('canvas')[0];
                            link.href = canvas.toDataURL("image/png");
                            link.click()
                        }}>
                        Download as PNG
                    </Button>
            </div>
        )
    }


    return (
        <div className='content'>
            <h2>Development Modeling</h2>
            <Button variant="contained" onClick={clearDataSets}>Reset</Button>
            <br/>
            <div className="rowForm">
                <SearchBar
                    value={clubName}
                    searchPath='https://apis.data-pool.ca/devmod/clubs?search='
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
                    label='Year of birth'
                    value={yob}
                    valueLabelDisplay="auto"
                    step={1}
                    range={[2000, 2015]}
                    marks
                    changer={setYOB}
                    disableSwap />
                <br/><br/>
                <Button variant="contained" onClick={updateResults}>Add Graph</Button>
            </div>
            <br/>
            <br/>
            <br/>
            {loading? <img src={loadingGif} className='loading' alt="loading" /> : 
                <>
                    {datasets.length === 0 ? <></> : plots }
                    <br/>
                </>
            }
        </div>
    );
};
 
export default DevMod;