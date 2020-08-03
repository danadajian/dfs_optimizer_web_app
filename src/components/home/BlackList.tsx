import * as React from 'react';
import Table from 'react-bootstrap/Table'
import '../../css/home/BlackList.css'
import {PlayerPoolAttributes} from "../../types";
import {PlayerPoolPlayerCell} from "./PlayerPoolPlayerCell";

export const BlackList = (props: {
    blackList: number[],
    playerPool: PlayerPoolAttributes[]
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
