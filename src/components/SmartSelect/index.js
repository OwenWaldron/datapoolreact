import React from "react";
import { FormControl, Select, MenuItem, InputLabel} from '@mui/material/'; 

const SmartSelect = (props) => {
    return (
        <FormControl>
            <InputLabel>{props.label}</InputLabel>
            <Select 
                value={props.value} 
                onChange={(e) => props.changer(e.target.value)} 
                label={props.label} >
                {props.options.map((row) => (
                    <MenuItem value={row.value} key={row.value}>{row.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default SmartSelect;

