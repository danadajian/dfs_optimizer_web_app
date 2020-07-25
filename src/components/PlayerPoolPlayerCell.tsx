import React from "react";
import Table from 'react-bootstrap/Table'
import '../css/PlayerCell.css'
import {PlayerPoolAttributes} from "../types";

export const PlayerPoolPlayerCell = (props: {
    player: PlayerPoolAttributes
}) => {
    const {name, status, team, position} = props.player;

    return (
        <Table className="Player-cell">
            <tbody>
            <tr className="Player-cell-row">
                <td>{name} <b>{status}</b></td>
            </tr>
            <tr>
                <td>{team} {position}</td>
            </tr>
            </tbody>
        </Table>
    )
};