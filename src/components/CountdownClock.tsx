import React, {useEffect, useState} from "react";
import '../css/CountdownClock.css'
import Toast from "react-bootstrap/Toast";
import {calculateTimeLeft} from "../helpers/calculateTimeLeft/calculateTimeLeft";
import {SPORTS_START_DATE} from "../constants";

export const CountdownClock = () => {
    const [timeLeft, setTimeLeft]: any = useState(calculateTimeLeft(+new Date(SPORTS_START_DATE) - +new Date()));
    const [showToast, setShowToast] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft(+new Date(SPORTS_START_DATE) - +new Date()));
        }, 1000);
    });

    const timerComponents: any = [];
    Object.keys(timeLeft).forEach(interval => {
        if (timeLeft[interval])
            timerComponents.push((
                <div className="Timer">
                    <span>{timeLeft[interval]}</span>
                    <span>{interval.toUpperCase()}</span>
                </div>
            ))
    });

    return (
        <div className="Countdown-clock">
            <Toast show={showToast} onClose={() => setShowToast(!showToast)}>
                <Toast.Header>
                    <strong className="mr-auto">Countdown to Sports</strong>
                </Toast.Header>
                <Toast.Body className="Toast-body">
                    {timerComponents.length ? timerComponents : <span>SPORTS ARE LIVE!!!</span>}
                </Toast.Body>
            </Toast>
        </div>
    );
}
