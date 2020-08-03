import {Line} from "react-chartjs-2";
import {getLineOptions} from "../../helpers/getLineOptions/getLineOptions";
import React from "react";
import {PerformanceStateProps} from "../../types";
import * as _ from "lodash";
import {getChartData} from "../../helpers/getChartData/getChartData";

export const PerformanceChart = (props: PerformanceStateProps) => {
    const {site, fantasyData, optimalLineup}: any = props.state;

    const sortedFantasyData = _.sortBy(fantasyData, site).filter((player: any) => player.Fanduel !== 0);
    const labels = sortedFantasyData.map((playerObject: any) => playerObject.name);
    const datasets = getChartData(site, sortedFantasyData);
    const chartData = {
        labels,
        datasets
    };

    return (
        <div className="Performance-chart mr-2">
            <Line data={chartData}
                  width={1000}
                  height={500}
                  options={getLineOptions(site, optimalLineup)}/>
        </div>
    )
};