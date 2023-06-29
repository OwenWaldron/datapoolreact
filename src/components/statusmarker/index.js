import React, {useState, useEffect} from 'react'
import Swal from "sweetalert2";

const getVersion = async () => {
    let url = 'https://apis.data-pool.ca/api/version';
    const res = await fetch(url);
    const data = await res.json();
    return data
}

const StatusMarker = (props) => {
    const [version, setStatus] = useState({status: 'Loading...', complete: true});

    const Alert = () => {
        Swal.fire({
            title:"Are you sure?",
            text: "A refresh can take over an hour and the recent year's data will not be available until it is complete. If it fails you will need to contact admin",
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            showDenyButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                triggerRefresh();
            }
        })
      };
      const triggerRefresh = () => {
        fetch('https://apis.data-pool.ca/api/refresh')
        getVersion().then((version) => {
            setStatus(version)
            props.changer(version.complete)
        })
    }
    
    useEffect(() => {
        getVersion().then((version) => {
            setStatus(version)
            props.changer(version.complete)
        })
    }, [props])

    return (
        <div className='statusMarker'>
            <h5>Data Status:</h5>
            <div className={version.status.includes('ERROR')? 'statusFailed' : version.complete? 'statusSuccess' : 'statusLoading'}>
                {version.status.includes('ERROR')? 'Error refreshing, contact admin' : version.complete? <>{`Last updated: ${version.date}`}<br/><button className='refreshButton' onClick={Alert}>Refresh?</button></> : <>Updating recent year...</>}
            </div>
        </div>
    );
}

export default StatusMarker;