import React, {useState} from 'react';

const CollapseTable = (props) => {
    const [collapsed, setCollapsed] = useState(true);

    var header_row = props.headers.map((header) => <th>{header}</th>)
    return (
        <table>
            <thead>
                {header_row}
            </thead>
            <tbody>
                {}
                {collapsed? (
                    <tr>
                        <td colSpan={props.headers.length}>
                            <button className='betterButton' onClick={() => setCollapsed(false)}>Show data</button>
                        </td>
                    </tr>
                ) : (
                    <>
                        {props.data}
                        <tr>
                            <td colSpan={props.headers.length}>
                                <button className='betterButton' onClick={() => setCollapsed(true)}>Hide data</button>
                            </td>
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    );
}


export default CollapseTable;