import {LineupAttributes} from "../../types";

export const playerIsInOptimalLineup = (optimalLineup: LineupAttributes[], context: any): boolean => {
    const name = context.chart.data.labels[context.dataIndex];
    return optimalLineup?.map((player: LineupAttributes) => player.name).includes(name);
}