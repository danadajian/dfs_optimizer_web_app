import React from 'react'
import '../css/PlayerPoolGrid.css'
import {StateProps} from "../interfaces";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Button from 'react-bootstrap/Button';
import {handleAddPlayerToLineup} from "../handlers/handleAddPlayerToLineup/handleAddPlayerToLineup";
import {handleAddPlayerToBlackList} from "../handlers/handleAddPlayerToBlackList/handleAddPlayerToBlackList";
import {PlayerPoolPlayerCell} from "./PlayerPoolPlayerCell";
import {getOrdinalString} from "../helpers/getOrdinalString/getOrdinalString";
import {getOpponentRankStyle} from "./LineupPlayerCell";
import {handleRemovePlayerFromLineup} from "../handlers/handleRemovePlayerFromLineup/handleRemovePlayerFromLineup";
import {NUMBER_OF_GAMES_FOR_ROLLING_AVG} from "../constants";

const upIcon = require('../icons/up.svg');
const downIcon = require('../icons/down.svg');

export const PlayerPoolGrid: any = (props: StateProps) => {
    const {playerPool, filteredPool, lineup, whiteList, blackList} = props.state;

    const getSortIcon = (sortOrder: string) => {
        if (sortOrder) {
            return <img src={sortOrder === 'asc' ? upIcon : downIcon} alt={"sort"}/>
        } else {
            return <div className="Up-down-buttons">
                <img src={upIcon} alt={"up"}/>
                <img src={downIcon} alt={"down"}/>
            </div>
        }
    };

    const columns = [{
        dataField: 'add/remove',
        text: '',
        editable: false,
        events: {
            onClick: (event: any) => {
                const playerId = Number(event.target.getAttribute('data-player-id'));
                if (playerId) {
                    const playerInLineup = lineup.map(player => player.playerId).includes(playerId);
                    playerInLineup ?
                        handleRemovePlayerFromLineup(playerId, props.state, props.setState) :
                        handleAddPlayerToLineup(playerId, props.state, props.setState)
                }
            }
        },
        formatter: (cell: any, row: any) => {
            const playerInLineup = lineup.map(player => player.playerId).includes(row.playerId);
            return <Button size={"sm"}
                           variant={playerInLineup ? "warning" : "success"}
                           data-player-id={row.playerId}>{playerInLineup ? 'Remove' : 'Add'}</Button>
        }
    }, {
        dataField: 'blacklist',
        text: '',
        editable: false,
        events: {
            onClick: (event: any) => {
                const playerId = Number(event.target.getAttribute('data-player-id'));
                if (playerId) {
                    handleAddPlayerToBlackList(playerId, props.state, props.setState)
                }
            }
        },
        formatter: (cell: any, row: any) => {
            const blackListText = blackList.includes(row.playerId) ? 'Unblacklist' : 'Blacklist';
            return <Button size={"sm"}
                    variant={"danger"}
                    data-player-id={row.playerId}>{blackListText}</Button>
        }
    }, {
        dataField: 'name',
        text: 'Player',
        editable: false,
        formatter: (cellContent: any, row: any, index: number) => <PlayerPoolPlayerCell key={index} player={row}/>
    }, {
        dataField: 'projection',
        text: 'Projection',
        editable: true,
        validator: (newValue: any) => {
            if (isNaN(newValue) || !newValue) {
                return {
                    valid: false,
                    message: 'Price should be numeric'
                };
            }
            return true;
        },
        sort: true,
        sortCaret: getSortIcon,
        formatter: (cellContent: any, row: any) => {
            const projection = row.projection && Number(row.projection).toFixed(1);
            return <p>{projection}</p>
        }
    }, {
        dataField: 'salary',
        text: 'Salary',
        editable: false,
        sort: true,
        sortCaret: getSortIcon,
        formatter: (cellContent: any, row: any) =>
            <p>${row.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
    }, {
        dataField: 'pricePerPoint',
        text: '$/Point',
        editable: false,
        sort: true,
        sortCaret: (order: any) => getSortIcon(order),
        sortValue: (cell: any, row: any) => row.salary / row.projection,
        formatter: (cellContent: any, row: any) =>
            <p>
                ${(row.salary / row.projection)
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
    }, {
        dataField: 'rollingAverage',
        text: `${NUMBER_OF_GAMES_FOR_ROLLING_AVG}-Game Avg`,
        editable: false,
        sort: true,
        sortCaret: getSortIcon,
        formatter: (cellContent: any, row: any) =>
            <p>{row.rollingAverage ? Number(row.rollingAverage).toFixed(1) : 'N/A'}</p>
    }, {
        dataField: 'opponent',
        text: 'Opponent',
        editable: false,
        formatter: (cellContent: any, row: any) =>
            <p>
                {row.opponent + ' '}
                <b style={getOpponentRankStyle(row.opponentRank)}>
                    {row.opponentRank && getOrdinalString(row.opponentRank)}
                </b>
            </p>
    }, {
        dataField: 'spread',
        text: 'Spread',
        editable: false
    }, {
        dataField: 'overUnder',
        text: 'O/U',
        editable: false
    }, {
        dataField: 'gameDate',
        text: 'Game Date',
        editable: false
    }];

    const rowStyle = (row: any) => ({
        backgroundColor: (whiteList.includes(row.playerId)) ? 'lightgreen' :
            (blackList.includes(row.playerId)) ? 'indianred' : 'white'
    });

    return (
        <div className="Player-pool-grid">
            <BootstrapTable keyField='playerId'
                            data={filteredPool.length > 0 ? filteredPool : playerPool}
                            columns={columns}
                            classes="Player-table"
                            headerWrapperClasses="Player-pool-grid-header"
                            rowClasses="Player-pool-row"
                            rowStyle={rowStyle}
                            cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true, autoSelectText: true }) }
            />
        </div>
    )
};
