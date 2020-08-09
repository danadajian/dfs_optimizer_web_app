import React, {useState} from 'react';
import '../../css/performance/Performance.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Jumbotron from "react-bootstrap/Jumbotron";
import {StateProps} from "../../types";
import {INITIAL_PERFORMANCE_STATE, isDevelopment} from "../../constants";
import {NavBar} from "../home/NavBar";
import {SportButtons} from "./SportButtons";
import {PerformanceChart} from "./PerformanceChart";
import {PerformanceTable} from "./PerformanceTable";
import {PositionButtons} from "./PositionButtons";
import DatePicker from "react-datepicker";
import moment from 'moment-timezone';

export const Performance = (props: StateProps) => {
    const [state, setState] = useState({
        ...INITIAL_PERFORMANCE_STATE,
        date: getYesterdayDate()
    });
    const performanceProps = {state, setState};

    const handleDateChange = (date: Date) => {
        const dateString = moment(date).format('YYYY-MM-DD');
        const fantasyData = state.allFantasyData?.find((fantasyData: any) => fantasyData.date === dateString)?.fantasyData || [];
        const playerPool = state.allPlayerPools?.find((playerPool: any) => playerPool.date === dateString)?.playerPool || [];
        const optimalLineup = state.allOptimalLineups?.find((optimalLineup: any) => optimalLineup.date === dateString)?.optimalLineup || [];
        setState({
            ...state,
            date: moment(date),
            fantasyData,
            playerPool,
            optimalLineup
        })
    }

    return (
        <>
            <NavBar {...props}/>
            <Jumbotron className="mt-2">
                <h1>Performance</h1>
                <section className="Performance-header mt-5 mb-2">
                    <DatePicker className="Date-section text-center"
                                selected={state.date.toDate()}
                                onChange={(date: Date) => handleDateChange(date)}/>
                    <SportButtons {...performanceProps}/>
                    <PositionButtons {...performanceProps}/>
                </section>
                <section className="Performance-data">
                    <PerformanceTable {...performanceProps}/>
                    <PerformanceChart {...performanceProps}/>
                </section>
            </Jumbotron>
        </>
    );
};

const getYesterdayDate = () => {
    if (isDevelopment())
        return moment('2020-08-07').tz('America/New_York');
    return moment().tz('America/New_York').subtract(1, 'days')
}