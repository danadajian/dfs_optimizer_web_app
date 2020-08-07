import {LineupAttributes} from "../../types";

export const playerIsInOptimalLineup = (optimalLineup: LineupAttributes[], context: any): boolean => {
    const playerId = context.dataset.playerIds[context.dataIndex];
    return optimalLineup?.map((player: LineupAttributes) => player.playerId).includes(playerId);
}