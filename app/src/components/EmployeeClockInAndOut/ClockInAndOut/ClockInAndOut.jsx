import React from 'react';

function ClockInAndOut(props) {
    const { clockIn, clockOut } = props.clockInAndOut;
    const clockInTime = new Date(clockIn).toLocaleString();
    let clockOutTime = undefined;

    if(clockOut) {
        clockOutTime = new Date(clockOut).toLocaleString();
    }

    return(
        <div>
            <h3>Shift</h3>
            <p>Clocked in at {clockInTime}</p>
            {clockOutTime &&
                <p>Clocked out at {clockOutTime}</p>
            }
        </div>
    );
}

export default ClockInAndOut;
