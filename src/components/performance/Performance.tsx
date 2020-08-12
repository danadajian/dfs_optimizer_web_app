import React, {useState} from 'react';
import '../../css/performance/Performance.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Jumbotron from "react-bootstrap/Jumbotron";
import {StateProps} from "../../types";
import {INITIAL_PERFORMANCE_STATE} from "../../constants";
import {NavBar} from "../home/NavBar";
import {SportButtons} from "./SportButtons";
import {PerformanceChart} from "./PerformanceChart";
import {PerformanceTable} from "./PerformanceTable";
import {PositionButtons} from "./PositionButtons";
import {DateButtons} from "./DateButtons";

export const Performance = (props: StateProps) => {
    const [state, setState] = useState(INITIAL_PERFORMANCE_STATE);
    const performanceProps = {state, setState};

    return (
        <>
            <NavBar {...props}/>
            <Jumbotron className="mt-2">
                <h1>Performance</h1>
                <section className="Performance-header mt-5 mb-2">
                    <DateButtons {...performanceProps}/>
                    <SportButtons {...performanceProps}/>
                </section>
                <section className="Performance-data">
                    <PerformanceTable {...performanceProps}/>
                    <div className="Performance-chart-section">
                        <PositionButtons {...performanceProps}/>
                        <PerformanceChart {...performanceProps}/>
                    </div>
                </section>
            </Jumbotron>
        </>
    );
};