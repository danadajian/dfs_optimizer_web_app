import {PlayerPoolAttributes} from "../../types";
import * as _ from "lodash";

export const getPerformanceDataByDate = (date: string, state: any) => {
    const fantasyData = state.allFantasyData?.find((fantasyData: any) => fantasyData.date === date)?.fantasyData || [];
    const playerPool = state.allPlayerPools?.find((playerPool: any) => playerPool.date === date)?.playerPool || [];
    const optimalLineup = state.allOptimalLineups?.find((optimalLineup: any) => optimalLineup.date === date)?.optimalLineup || [];
    const positions: string[] = _.uniq(playerPool?.map((player: PlayerPoolAttributes) => player.position));
    return {
        fantasyData,
        playerPool,
        optimalLineup,
        positions
    }
}