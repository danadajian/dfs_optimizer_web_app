import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {LineupAttributes, PerformanceStateProps} from "../../types";

export const PerformanceTable = (props: PerformanceStateProps) => {
    const {fantasyData, optimalLineup} = props.state;

    const tableData = optimalLineup?.map((optimalPlayer: LineupAttributes) => ({
        ...optimalPlayer,
        actual: fantasyData.find((player: any) => player.name === optimalPlayer.name)?.Fanduel || 0
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
            dataField: 'projection',
            text: 'Projection'
        },
        {
            dataField: 'actual',
            text: 'Actual'
        }
    ];

    return <>{tableData && <BootstrapTable keyField='name'
                                           data={tableData || []}
                                           columns={columns}
                                           classes="Player-table"
                                           headerWrapperClasses="Player-pool-grid-header"
                                           rowClasses="Player-pool-row"/>}</>
};