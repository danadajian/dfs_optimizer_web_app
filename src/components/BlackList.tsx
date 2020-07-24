import * as React from 'react';
import Table from 'react-bootstrap/Table'
import '../css/BlackList.css'
import {playerPoolAttributes} from "../types";
import {PlayerPoolPlayerCell} from "./PlayerPoolPlayerCell";

export const BlackList = (props: {
    blackList: number[],
    playerPool: playerPoolAttributes[]
}) => {
    return (
        <Table size={"sm"} className="Blacklist">
            <tbody>
            <tr>
                <td>
                    {props.blackList.map(
                        (playerId: number) =>
                            <PlayerPoolPlayerCell
                                key={playerId}
                                player={props.playerPool.find(player => player.playerId === playerId)!}/>
                    )}
                </td>
            </tr>
            </tbody>
        </Table>
    )
};
