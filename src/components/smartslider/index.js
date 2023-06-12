import React from "react";
import { FormControl, Slider, InputLabel} from '@mui/material/'; 

const SmartSlider = (props) => {
    return (
        <FormControl>
            <InputLabel>{props.label}</InputLabel>
            <div style={{ width: 300 }}>
                <Slider
                    label={props.label}
                    value={props.value}
                    valueLabelDisplay={props.valueLabelDisplay}
                    step={props.step}
                    min={props.range[0]}
                    max={props.range[1]}
                    marks={props.marks}
                    onChange={(event) => props.changer(event.target.value)}
                    disableSwap={props.disableSwap}
                />
            </div>
        </FormControl>
    );
}

export default SmartSlider;

