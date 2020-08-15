import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {FantasyData, LineupAttributes, PerformanceStateProps} from "../../types";
import * as _ from "lodash";

export const PerformanceTable = (props: PerformanceStateProps) => {
    const {recentFantasyData, optimalLineup} = props.state;
    const {fantasyData, positionPercentile, overallPercentile, positions} = recentFantasyData || {};

    const tableData = optimalLineup?.map((optimalPlayer: LineupAttributes) => {
        const actual = fantasyData!.find((player: FantasyData) => player.playerId === optimalPlayer.playerId)?.Fanduel || 0;
        return {
            ...optimalPlayer,
            actual,
            positionPercentile,
            overallPercentile,
            positions
        }
    });

    const footerStyle = {
        textAlign: 'center'
    };

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
            footer: (columnData: any) => `Avg: ${_.chain(columnData).mean().round(2).value()}`,
            footerStyle
        }
    ];

    return <>{tableData && (recentFantasyData) && <BootstrapTable keyField='name'
                                                                  data={tableData}
                                                                  columns={columns}
                                                                  classes="Player-table"
                                                                  headerWrapperClasses="Player-pool-grid-header"
                                                                  rowClasses="Player-pool-row"/>}</>
};