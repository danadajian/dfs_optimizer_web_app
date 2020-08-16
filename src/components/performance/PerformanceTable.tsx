import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {LineupAttributes, PerformanceStateProps} from "../../types";
import * as _ from "lodash";
import {FantasyData} from "@dadajian/shared-fantasy-constants";

export const PerformanceTable = (props: PerformanceStateProps) => {
    const {recentFantasyData, optimalLineup} = props.state;
    const {fantasyData, avgPositionPercentile, avgOverallPercentile} = recentFantasyData || {};

    const tableData = optimalLineup?.map((optimalPlayer: LineupAttributes) => {
        const fantasyDataPlayer = fantasyData?.find((player: FantasyData) => player.playerId === optimalPlayer.playerId);
        const actual = fantasyDataPlayer?.Fanduel || 0;
        const {positionPercentile, overallPercentile} = fantasyDataPlayer || {};
        return {
            ...optimalPlayer,
            actual,
            positionPercentile,
            overallPercentile
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
            formatter: (cell: any, row: any) => <p>{row.projection?.toFixed(1)}</p>,
            footer: (columnData: any) => _.chain(columnData).sum().round(2).value(),
            footerStyle
        },
        {
            dataField: 'actual',
            text: 'Actual',
            formatter: (cell: any, row: any) => <p>{row.actual?.toFixed(1)}</p>,
            footer: (columnData: any) => _.chain(columnData).sum().round(2).value(),
            footerStyle
        },
        {
            dataField: 'positionPercentile',
            text: 'Percentile (Pos)',
            formatter: (cell: any, row: any) => <p>{row.positionPercentile?.toFixed(1)}</p>,
            footer: `Avg: ${avgPositionPercentile}`,
            footerStyle
        },
        {
            dataField: 'overallPercentile',
            text: 'Percentile (Ovr)',
            formatter: (cell: any, row: any) => <p>{row.overallPercentile?.toFixed(1)}</p>,
            footer: `Avg: ${avgOverallPercentile}`,
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