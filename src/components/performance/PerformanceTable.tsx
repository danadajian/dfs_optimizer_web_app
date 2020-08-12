import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {FantasyData, LineupAttributes, PerformanceStateProps, PlayerPoolAttributes} from "../../types";
import {getPlayerPercentile} from "../../helpers/getPlayerPercentile/getPlayerPercentile";
import * as _ from "lodash";

export const PerformanceTable = (props: PerformanceStateProps) => {
    const {fantasyData, playerPool, optimalLineup} = props.state;

    const tableData = optimalLineup?.map((optimalPlayer: LineupAttributes) => {
        const actual = fantasyData!.find((player: FantasyData) => player.playerId === optimalPlayer.playerId)?.Fanduel || 0;
        return {
        ...optimalPlayer,
            actual,
            positionPercentile: Number(getPlayerPercentile(actual, fantasyData!.filter((player: FantasyData) =>
                playerPool?.find((playerPoolPlayer: PlayerPoolAttributes) => playerPoolPlayer.playerId === player.playerId)?.position === optimalPlayer.position)).toFixed(1)),
            overallPercentile: Number(getPlayerPercentile(actual, fantasyData!).toFixed(1))
        }
    }) || [];

    const footerStyle = {
        textAlign: 'center'
    }

    const columns: any = [
        {
            dataField: 'position',
            text: 'Position',
            footer: ''
        },
        {
            dataField: 'name',
            text: 'Player',
            footer: ''
        },
        {
            dataField: 'team',
            text: 'Team',
            footer: ''
        },
        {
            dataField: 'projection',
            text: 'Projected',
            formatter: (cell: any, row: any) => <p>{row.projection.toFixed(1)}</p>,
            footer: (columnData: any) => _.chain(columnData).sum().round(2).value(),
            footerStyle
        },
        {
            dataField: 'actual',
            text: 'Actual',
            formatter: (cell: any, row: any) => <p>{row.actual.toFixed(1)}</p>,
            footer: (columnData: any) => _.chain(columnData).sum().round(2).value(),
            footerStyle
        },
        {
            dataField: 'positionPercentile',
            text: 'Percentile (Pos)',
            footer: (columnData: any) => `Avg: ${_.chain(columnData).mean().round(2).value()}`,
            footerStyle
        },
        {
            dataField: 'overallPercentile',
            text: 'Percentile (Ovr)',
            footer: (columnData: any) => `Avg: ${_.chain(columnData).meanBy().round(2).value()}`,
            footerStyle
        }
    ];

    return <>{tableData && (fantasyData && fantasyData.length > 0) && <BootstrapTable keyField='name'
                                                                                      data={tableData}
                                                                                      columns={columns}
                                                                                      classes="Player-table"
                                                                                      headerWrapperClasses="Player-pool-grid-header"
                                                                                      rowClasses="Player-pool-row"/>}</>
};