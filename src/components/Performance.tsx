import React, {useState} from 'react';
import * as _ from 'lodash';
import {Line} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';
import '../css/Performance.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../env'
import {invokeLambdaFunction} from "../aws/aws";
import {
    INITIAL_PERFORMANCE_STATE,
    NUMBER_OF_SEASONS_AGO,
    NUMBER_OF_WEEKS_IN_SEASON,
    SUPPORTED_SITES
} from "../constants";
import {getLineOptions} from "../helpers/getLineOptions/getLineOptions";
import {getChartData} from "../helpers/getChartData/getChartData";
import {StateProps} from "../types";
import {NavBar} from "./NavBar";
import Jumbotron from "react-bootstrap/Jumbotron";
import {SUPPORTED_SPORTS} from "@dadajian/shared-fantasy-constants";

export const Performance = (props: StateProps) => {
    const [state, setState] = useState(INITIAL_PERFORMANCE_STATE);

    const {isLoading, currentWeek, week, currentSeason, season, fantasyData, site, sport, date}: any = state;

    const getFantasyData = () => {
        setState({
            ...state,
            isLoading: true
        });
        const dateString = date.toISOString().slice(0, 10);
        invokeLambdaFunction(process.env.REACT_APP_GET_FANTASY_DATA_LAMBDA, {sport, season, date: dateString, week})
            .then((fantasyData: any) => {
                setState({
                    ...state,
                    isLoading: false,
                    fantasyData
                });
            });
    };

    const toggleWeek = (event: any) => {
        setState({
            ...state,
            week: Number(event.target.value)
        });
    };

    const toggleSeason = (event: any) => {
        setState({
            ...state,
            season: Number(event.target.value)
        });
    };

    const toggleSite = (event: any) => {
        setState({
            ...state,
            site: event.target.value
        });
    };

    const toggleSport = (event: any) => {
        const sport = event.target.value;
        invokeLambdaFunction(process.env.REACT_APP_GET_CURRENT_DATA_LAMBDA, {sport})
            .then((currentData: any) => {
                const {currentWeek, currentSeason} = currentData;
                setState({
                    ...state,
                    sport,
                    currentWeek,
                    currentSeason,
                    week: currentWeek,
                    season: currentSeason
                });
            })
    };

    const toggleDate = (newDate: any) => {
        setState({
            ...state,
            date: newDate
        })
    }

    let weekOptions = [];
    const numberOfWeekOptions = (season === currentSeason) ? currentWeek : NUMBER_OF_WEEKS_IN_SEASON;
    for (let i = 1; i < (numberOfWeekOptions); i++) {
        weekOptions.push(<option key={i}>{i}</option>);
    }

    let seasonOptions = [];
    if (currentSeason) {
        for (let i = 0; i < NUMBER_OF_SEASONS_AGO; i++) {
            seasonOptions.push(<option key={i}>{currentSeason - i}</option>)
        }
    }

    const sortedFantasyData = _.sortBy(fantasyData, site);
    const datasets = getChartData(site, sortedFantasyData);
    let chartData = {
        labels: sortedFantasyData.map((playerObject: any) => playerObject.name),
        datasets
    };

    let dateSection;
    if (sport === 'nfl') {
        dateSection = weekOptions.length > 0 ?
            <>
                <h4>Week:</h4>
                <select onChange={toggleWeek} value={week}>{weekOptions}</select>
            </> :
            <h4>No data available.</h4>
    } else {
        dateSection =
            <>
                <h4>Date:</h4>
                <DatePicker className="Date-section text-center"
                            selected={date}
                            onChange={(newDate: any) => toggleDate(newDate)}/>
            </>
    }

    const seasonSection =
        <>
            <h4>Season:</h4>
            <select onChange={toggleSeason} value={season}>{seasonOptions}</select>
        </>

    const goButton = isLoading ?
        <>
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
            </Button>{' '}
        </> :
        <Button variant="success" onClick={() => getFantasyData()}>Go!</Button>

    return (
        <>
            <NavBar {...props}/>
            <Jumbotron className="mt-2">
                <h1>Performance</h1>
                <div className="Performance mt-5">
                    <ButtonGroup className="mt-1" aria-label="Site buttons">
                        {SUPPORTED_SITES.map(supportedSite =>
                            <Button key={supportedSite}
                                    value={supportedSite}
                                    variant="info"
                                    active={site === supportedSite}
                                    onClick={toggleSite}>{supportedSite}</Button>)
                        }
                    </ButtonGroup>
                    <ButtonGroup className="mt-3 mb-3" aria-label="Sport buttons">
                        {SUPPORTED_SPORTS.map((supportedSport, index) =>
                            <Button key={index}
                                    value={supportedSport}
                                    active={sport === supportedSport}
                                    onClick={toggleSport}>{supportedSport.toUpperCase()}</Button>)
                        }
                    </ButtonGroup>
                    {sport && dateSection}
                    {sport && seasonSection}
                    {sport && goButton}
                </div>
                <div>
                    <Line data={chartData}
                          width={1000}
                          height={500}
                          options={getLineOptions(site)}/>
                </div>
            </Jumbotron>
        </>
    );
};
