import React, {useState} from 'react';
import * as _ from 'lodash';
import {Line} from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';
import '../css/Performance.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../env'
import {retrieveObjectFromS3} from "../aws/aws";
import {INITIAL_PERFORMANCE_STATE, SUPPORTED_SITES} from "../constants";
import {getLineOptions} from "../helpers/getLineOptions/getLineOptions";
import {getChartData} from "../helpers/getChartData/getChartData";
import {StateProps} from "../types";
import {NavBar} from "./NavBar";
import Jumbotron from "react-bootstrap/Jumbotron";
import {
    DFS_PIPELINE_BUCKET_NAME,
    FANTASY_ANALYTICS_BUCKET_NAME,
    SUPPORTED_SPORTS
} from "@dadajian/shared-fantasy-constants";

export const Performance = (props: StateProps) => {
    const [state, setState] = useState(INITIAL_PERFORMANCE_STATE);

    const {isLoading, fantasyData, optimalLineup, site, sport}: any = state;

    const getFantasyData = async (event: any) => {
        const sport = event.target.value;
        setState({
            ...state,
            isLoading: true,
            sport
        });
        const fantasyData = await retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`);
        const optimalLineup = await retrieveObjectFromS3(DFS_PIPELINE_BUCKET_NAME, `${sport}OptimalLineup.json`);
        setState({
            ...state,
            isLoading: false,
            fantasyData,
            optimalLineup
        });
    };

    const toggleSite = (event: any) => {
        setState({
            ...state,
            site: event.target.value
        });
    };

    const sortedFantasyData = _.sortBy(fantasyData, site).filter((player: any) => player.Fanduel !== 0);
    const datasets = getChartData(site, sortedFantasyData);
    let chartData = {
        labels: sortedFantasyData.map((playerObject: any) => playerObject.name),
        datasets
    };

    return (
        <>
            <NavBar {...props}/>
            <Jumbotron className="mt-2">
                <h1>Performance</h1>
                <div className="Performance mt-5 mb-2">
                    <ButtonGroup className="mt-1" aria-label="Site buttons">
                        {SUPPORTED_SITES.map((supportedSite: string) =>
                            <Button key={supportedSite}
                                    value={supportedSite}
                                    variant="info"
                                    active={site === supportedSite}
                                    onClick={toggleSite}>{supportedSite}</Button>)
                        }
                    </ButtonGroup>
                    <ButtonGroup className="mt-3 mb-3" aria-label="Sport buttons">
                        {SUPPORTED_SPORTS.map((supportedSport: string) =>
                            isLoading && sport === supportedSport ?
                                <Button key={supportedSport} variant="primary" disabled>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        key={supportedSport}
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                </Button> : <Button key={supportedSport}
                                                    value={supportedSport}
                                                    active={sport === supportedSport}
                                                    onClick={getFantasyData}>{supportedSport.toUpperCase()}</Button>)
                        }
                    </ButtonGroup>
                </div>
                <div>
                    <Line data={chartData}
                          width={1000}
                          height={500}
                          options={getLineOptions(site, optimalLineup)}/>
                </div>
            </Jumbotron>
        </>
    );
};
