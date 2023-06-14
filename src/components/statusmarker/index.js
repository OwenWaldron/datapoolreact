import React, {useState, useEffect} from 'react'

const getVersion = async () => {
    let url = 'http://127.0.0.1:8000/api/version';
    const res = await fetch(url);
    const data = await res.json();
    return data
}

const StatusMarker = () => {
    const [version, setStatus] = useState({status: 'Loading...', complete: true});
    
    useEffect(() => {
        getVersion().then((version) => {
            setStatus(version)
        })
    }, [])

    return (
        <div className={version.complete? 'statusSuccess' : 'statusFailed'}>
            {version.complete? `Last updated: ${version.date}` : <>Updating recent year...<br/></>}
        </div>
    );
}

export default StatusMarker;