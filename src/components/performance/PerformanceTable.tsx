import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {FantasyData, LineupAttributes, PerformanceStateProps} from "../../types";

export const PerformanceTable = (props: PerformanceStateProps) => {
    const {fantasyData, optimalLineup} = props.state;

    const tableData = optimalLineup?.map((optimalPlayer: LineupAttributes) => ({
        ...optimalPlayer,
        actual: fantasyData!.find((player: FantasyData) => player.playerId === optimalPlayer.playerId)?.Fanduel || 0
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
        }
    ];

    return <>{tableData && <BootstrapTable keyField='name'
                                           data={tableData}
                                           columns={columns}
                                           classes="Player-table"
                                           headerWrapperClasses="Player-pool-grid-header"
                                           rowClasses="Player-pool-row"/>}</>
};