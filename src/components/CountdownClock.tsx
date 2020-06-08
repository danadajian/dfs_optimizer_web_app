import React, {useEffect, useState} from "react";
import '../css/CountdownClock.css'
import Toast from "react-bootstrap/Toast";
import {SPORTS_START_DATE} from "../constants";

export const CountdownClock = () => {
    const [timeLeft, setTimeLeft]: any = useState(calculateTimeLeft());
    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        const clock = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return function cleanup() {
            clearTimeout(clock)
        };
    });

    const timerComponents: any = [];

    Object.keys(timeLeft).forEach((interval: string, index: number) => {
        if (timeLeft[interval]) {
            const element = (
                <div key={index} className="Timer">
                    <span>{timeLeft[interval]}</span>
                    <span>{interval}</span>
                </div>
            );
            timerComponents.push(element);
        }
    });

    return (
        <div id="Countdown-clock" className="Countdown-clock">
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
};

const calculateTimeLeft = () => {
    const difference = +new Date(SPORTS_START_DATE) - +new Date();
    let timeLeft = {};
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    if (difference > 0) {
        timeLeft = {
            DAYS: days,
            HOURS: `0${hours}`.slice(-2),
            MINUTES: `0${minutes}`.slice(-2),
            SECONDS: `0${seconds}`.slice(-2)
        };
    }
    return timeLeft;
};