import moment from "moment-timezone";
import {PlayerPoolAttributes} from "../../types";
import * as _ from "lodash";

export const getPerformanceDataByDate = (date: Date, state: any) => {
    const dateString = moment(date).format('YYYY-MM-DD');
    const fantasyData = state.allFantasyData?.find((fantasyData: any) => fantasyData.date === dateString)?.fantasyData || [];
    const playerPool = state.allPlayerPools?.find((playerPool: any) => playerPool.date === dateString)?.playerPool || [];
    const optimalLineup = state.allOptimalLineups?.find((optimalLineup: any) => optimalLineup.date === dateString)?.optimalLineup || [];
    const positions: string[] = _.uniq(playerPool?.map((player: PlayerPoolAttributes) => player.position));
    return {
        fantasyData,
        playerPool,
        optimalLineup,
        positions
    }
}