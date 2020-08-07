import {Line} from "react-chartjs-2";
import React from "react";
import {FantasyData, PerformanceStateProps, PlayerPoolAttributes} from "../../types";
import * as _ from "lodash";
import {CHART_CONFIG, CHART_OPTIONS} from "../../constants";
import {playerIsInOptimalLineup} from "../../helpers/playerIsInOptimalLineup/playerIsInOptimalLineup";

export const PerformanceChart = (props: PerformanceStateProps) => {
    const {fantasyData, playerPool, optimalLineup, position}: any = props.state;

    const sortedFantasyData: FantasyData[] = _.sortBy(fantasyData, 'Fanduel');
    const filteredFantasyData = sortedFantasyData.filter((player: FantasyData) => {
        const playerHasCurrentPosition = !position ||
            playerPool.find((playerPoolPlayer: PlayerPoolAttributes) =>
                playerPoolPlayer.playerId === player.playerId)?.position === position;
        return playerHasCurrentPosition && player.Fanduel !== 0
    });
    const labels = filteredFantasyData.map((player: any) => player.name);
    const datasets = [{
        ...CHART_CONFIG,
        data: filteredFantasyData.map((player: any) => player.Fanduel),
        playerIds: filteredFantasyData.map((player: any) => player.playerId)
    }];
    const chartData = {
        labels,
        datasets
    };

    const chartOptions = {
        ...CHART_OPTIONS,
        elements: {
            point: {
                radius: (context: any) => playerIsInOptimalLineup(optimalLineup, context) ? 10 : 2,
                pointStyle: (context: any) => playerIsInOptimalLineup(optimalLineup, context) ? 'star' : 'circle',
                borderWidth: (context: any) => playerIsInOptimalLineup(optimalLineup, context) ? 3 : 1
            }
        },
    };

    return (
        <div className="Performance-chart mr-2">
            <Line data={chartData}
                  width={1000}
                  height={500}
                  options={chartOptions}/>
        </div>
    )
};