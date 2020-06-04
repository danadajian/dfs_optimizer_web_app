import * as React from 'react';
import Table from 'react-bootstrap/Table'
import '../css/BlackList.css'
import {playerPoolAttributes} from "../interfaces";
import {PlayerPoolPlayerCell} from "./PlayerPoolPlayerCell";

export const BlackList = (props: {
    blackList: number[],
    playerPool: playerPoolAttributes[]
}) => {
    return (
        <Table size={"sm"} className="Blacklist">
            <tbody>
            {props.blackList.map(
                (playerId: number) =>
                    <PlayerPoolPlayerCell
                        player={props.playerPool.find(player => player.playerId === playerId)!}/>
            )}
            </tbody>
        </Table>
    )
};
