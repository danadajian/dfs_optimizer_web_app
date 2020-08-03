import React from 'react'
import '../../css/home/PlayerPoolGrid.css'
import {PlayerPoolAttributes, StateProps} from "../../types";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Button from 'react-bootstrap/Button';
import {handleAddPlayerToLineup} from "../../handlers/handleAddPlayerToLineup/handleAddPlayerToLineup";
import {handleAddPlayerToBlackList} from "../../handlers/handleAddPlayerToBlackList/handleAddPlayerToBlackList";
import {PlayerPoolPlayerCell} from "./PlayerPoolPlayerCell";
import {getOrdinalString} from "../../helpers/getOrdinalString/getOrdinalString";
import {getOpponentRankStyle} from "./LineupPlayerCell";
import {handleRemovePlayerFromLineup} from "../../handlers/handleRemovePlayerFromLineup/handleRemovePlayerFromLineup";
import {NUMBER_OF_GAMES_FOR_ROLLING_AVG} from "../../constants";
import {getWeatherImage} from "../../helpers/getWeatherImage/getWeatherImage";
import {SUPPORTED_WEATHER_SPORTS} from "@dadajian/shared-fantasy-constants";

const upIcon = require('../../icons/up.svg');
const downIcon = require('../../icons/down.svg');

export const PlayerPoolGrid: any = (props: StateProps) => {
    const {playerPool, filteredPool, lineup, whiteList, blackList, sport} = props.state;

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
                    const playerInLineup = lineup!.map(player => player.playerId).includes(playerId);
                    playerInLineup ?
                        handleRemovePlayerFromLineup(playerId, props.state, props.setState) :
                        handleAddPlayerToLineup(playerId, props.state, props.setState)
                }
            }
        },
        formatter: (cell: any, row: PlayerPoolAttributes) => {
            const playerInLineup = lineup!.map(player => player.playerId).includes(row.playerId);
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
        formatter: (cell: any, row: PlayerPoolAttributes) => {
            const blackListText = blackList!.includes(row.playerId) ? 'Unblacklist' : 'Blacklist';
            return <Button size={"sm"}
                           variant={"danger"}
                           data-player-id={row.playerId}>{blackListText}</Button>
        }
    }, {
        dataField: 'name',
        text: 'Player',
        editable: false,
        formatter: (cellContent: any, row: PlayerPoolAttributes, index: number) =>
            <PlayerPoolPlayerCell key={index} player={row}/>
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
        formatter: (cellContent: any, row: PlayerPoolAttributes) => {
            const projection = row.projection && Number(row.projection).toFixed(1);
            return <p>{projection}</p>
        }
    }, {
        dataField: 'salary',
        text: 'Salary',
        editable: false,
        sort: true,
        sortCaret: getSortIcon,
        formatter: (cellContent: any, row: PlayerPoolAttributes) =>
            <p>${row.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
    }, {
        dataField: 'pricePerPoint',
        text: '$/Point',
        editable: false,
        sort: true,
        sortCaret: (order: any) => getSortIcon(order),
        sortValue: (cell: any, row: PlayerPoolAttributes) => row.salary / row.projection,
        formatter: (cellContent: any, row: PlayerPoolAttributes) => {
            const pricePerPoint = row.salary / row.projection;
            return <p>
                {isFinite(pricePerPoint) && '$'}{(pricePerPoint)
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
        }
    }, {
        dataField: 'rollingAverage',
        text: `${NUMBER_OF_GAMES_FOR_ROLLING_AVG}-Game Avg`,
        editable: false,
        sort: true,
        sortCaret: getSortIcon,
        formatter: (cellContent: any, row: PlayerPoolAttributes) =>
            <p>{row.rollingAverage ? Number(row.rollingAverage).toFixed(1) : 'N/A'}</p>
    }, {
        dataField: 'opponent',
        text: 'Opponent',
        editable: false,
        formatter: (cellContent: any, row: PlayerPoolAttributes) =>
            <p>
                {row.opponent && row.opponent + ' '}
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

    if (SUPPORTED_WEATHER_SPORTS.includes(sport!))
        columns.push({
            dataField: 'weather',
            text: 'Weather',
            editable: false,
            formatter: (cellContent: any, row: PlayerPoolAttributes) =>
                <span>
                    {row.weather && <img src={getWeatherImage(row.weather.forecast)} alt={"weather"} style={{height: '4vmin'}}/>}
                    <p>
                        {row.weather && row.weather.details}
                    </p>
                </span>
        })

    const rowStyle = (row: PlayerPoolAttributes) => ({
        backgroundColor: (whiteList!.includes(row.playerId)) ? 'lightgreen' :
            (blackList!.includes(row.playerId)) ? 'indianred' : 'white'
    });

    return (
        <div className="Player-pool-grid">
            <BootstrapTable keyField='playerId'
                            data={filteredPool!.length > 0 ? filteredPool! : playerPool!}
                            columns={columns}
                            classes="Player-table"
                            headerWrapperClasses="Player-pool-grid-header"
                            rowClasses="Player-pool-row"
                            rowStyle={rowStyle}
                            cellEdit={cellEditFactory({
                                mode: 'click',
                                blurToSave: true,
                                autoSelectText: true,
                                afterSaveCell: (oldValue: number, newValue: string, row: PlayerPoolAttributes) =>
                                    row.projection = Number(newValue),
                            })}
            />
        </div>
    )
};
