import React from "react";
import Table from 'react-bootstrap/Table'
import '../../css/home/PlayerCell.css'
import {LineupAttributes} from "../../types";

export const LineupPlayerCell = (props: {
    player: LineupAttributes
}) => {
    const {name, status, team, opponent, opponentRank} = props.player;
    return (
        <Table className="Player-cell">
            <tbody>
            <tr className="Player-cell-row">
                <td>
                    {name && name + ' '}
                    <b>{status}</b>
                </td>
            </tr>
            <tr className="Player-team-row">
                <td>
                    {team && <b>{team + '    '}</b>}
                    <p style={getOpponentRankStyle(opponentRank!)}>
                        {opponent}
                    </p>
                </td>
            </tr>
            </tbody>
        </Table>
    )
};

export const getOpponentRankStyle = (opponentRank: number) => ({
    color: opponentRank < 9 ? 'red' : opponentRank > 22 ? 'green' : 'black'
});