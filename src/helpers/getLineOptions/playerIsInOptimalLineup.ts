import {LineupAttributes} from "../../types";

export const playerIsInOptimalLineup = (optimalLineup: any, context: any): boolean => {
    const name = context.chart.data.labels[context.dataIndex];
    return optimalLineup?.lineup.map((player: LineupAttributes) => player.name).includes(name);
}