import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {FantasyData, LineupAttributes, PerformanceStateProps, PlayerPoolAttributes} from "../../types";
import {getPlayerPercentile} from "../../helpers/getPlayerPercentile/getPlayerPercentile";

export const PerformanceTable = (props: PerformanceStateProps) => {
    const {fantasyData, playerPool, optimalLineup} = props.state;

    const tableData = optimalLineup?.map((optimalPlayer: LineupAttributes) => ({
        ...optimalPlayer,
        actual: fantasyData!.find((player: FantasyData) => player.playerId === optimalPlayer.playerId)?.Fanduel || 0,
    }));

    const columns = [
        {
            dataField: 'position',
            text: 'Position'
        },
        {
            dataField: 'name',
            text: 'Player'
        },
        {
            dataField: 'team',
            text: 'Team'
        },
        {
            dataField: 'projection',
            text: 'Projected',
            formatter: (cell: any, row: any) => <p>{row.projection.toFixed(1)}</p>
        },
        {
            dataField: 'actual',
            text: 'Actual',
            formatter: (cell: any, row: any) => <p>{row.actual.toFixed(1)}</p>
        },
        {
            dataField: 'positionPercentile',
            text: 'Percentile (Position)',
            formatter: (cell: any, row: any) => <p>{getPlayerPercentile(row.actual, fantasyData!.filter((player: FantasyData) => playerPool?.find((playerPoolPlayer: PlayerPoolAttributes) => playerPoolPlayer.playerId === player.playerId)?.position === row.position)).toFixed(1)}</p>
        },
        {
            dataField: 'overallPercentile',
            text: 'Percentile (Overall)',
            formatter: (cell: any, row: any) => <p>{getPlayerPercentile(row.actual, fantasyData!).toFixed(1)}</p>
        }
    ];

    return <>{tableData && <BootstrapTable keyField='name'
                                           data={tableData}
                                           columns={columns}
                                           classes="Player-table"
                                           headerWrapperClasses="Player-pool-grid-header"
                                           rowClasses="Player-pool-row"/>}</>
};