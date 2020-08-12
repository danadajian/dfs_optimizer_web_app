import React from "react";
import '../../css/home/Lineup.css'
import '../../css/home/LineupPlayer.css'
import {LineupPlayerCell} from "./LineupPlayerCell";
import {getFormattedSalary} from "../../helpers/getFormattedSalary/getFormattedSalary";
import {getAdjustedDraftKingsSalary} from "../../helpers/getAdjustedDraftKingsSalary/getAdjustedDraftKingsSalary";
import {handleRemovePlayerFromLineup} from "../../handlers/home/handleRemovePlayerFromLineup/handleRemovePlayerFromLineup";
import {StateProps} from "../../types";
import BootstrapTable from "react-bootstrap-table-next";
import * as _ from 'lodash';

const removeIcon = require('../../icons/remove.svg');

export const LineupGrid = (props: StateProps) => {
    const {site, lineup, whiteList, salaryCap} = props.state;

    const lineupHeaderClass = (site === 'Fanduel') ? "Fanduel-header" : "DraftKings-header";

    const projectionSum = _.chain(lineup).sumBy('projection').value() || 0;
    const salarySum = _.chain(lineup).sumBy('salary').value() || 0;
    const salaryStyle = {
        color: (salarySum > salaryCap!) ? 'indianred' : 'black'
    };

    const rowStyle = (row: any) => ({
        backgroundColor: whiteList!.includes(row.playerId) ? 'lightgreen' : 'white'
    });

    const columns = [{
        dataField: 'remove',
        text: '',
        footer: '',
        events: {
            onClick: (event: any) => {
                const playerId = Number(event.target.getAttribute('data-player-id'));
                if (playerId > 0) {
                    handleRemovePlayerFromLineup(playerId, props.state, props.setState)
                }
            }
        },
        formatter: (cell: any, row: any) =>
            row.name && <img data-player-id={row.playerId} src={removeIcon} alt={"remove"}/>
    }, {
        dataField: 'displayPosition',
        text: 'Position',
        footer: '',
    }, {
        dataField: 'name',
        text: 'Player',
        footer: 'Total',
        formatter: (cellContent: any, row: any, index: number) => <LineupPlayerCell key={index} player={row}/>
    }, {
        dataField: 'projection',
        text: 'Projection',
        footer: projectionSum.toFixed(1),
        formatter: (cellContent: any, row: any) => {
            const projection = row.projection && Number(row.projection).toFixed(1);
            return <p>{projection}</p>
        }
    }, {
        dataField: 'salary',
        text: 'Salary',
        footer: getFormattedSalary(salarySum),
        footerStyle: salaryStyle,
        formatter: (cellContent: any, row: any) =>
            <p>{site === 'DraftKings' ?
                getAdjustedDraftKingsSalary(row.salary, row.displayPosition) : getFormattedSalary(row.salary)}</p>
    }];

    return <BootstrapTable keyField='lineupIndex'
                           data={lineup!}
                           columns={columns}
                           headerWrapperClasses={lineupHeaderClass}
                           footerClasses="Lineup-footer"
                           rowClasses="Player-row"
                           rowStyle={rowStyle}
    />
};