import {retrieveObjectFromS3} from "../../aws/aws";
import {FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import {PerformanceState, PlayerPoolAttributes} from "../../types";
import * as _ from "lodash";
import moment from "moment";

export const handleShowPerformance = async (sport: string, state: PerformanceState,
                                            setState: (state: PerformanceState) => void) => {
    return Promise.resolve(setState({
        ...state,
        isLoading: true,
        sport
    })).then(() => {
        return Promise.all([
            retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`).catch(() => []),
            retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentPlayerPools.json`).catch(() => []),
            retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentOptimalLineups.json`).catch(() => [])
        ]);
    }).then(([allFantasyData, allPlayerPools, allOptimalLineups]) => {
        const dateString = moment(state.date).format('YYYY-MM-DD');
        const fantasyData = allFantasyData?.find((fantasyData: any) => fantasyData.date === dateString)?.fantasyData || [];
        const playerPool = allPlayerPools?.find((playerPool: any) => playerPool.date === dateString)?.playerPool || [];
        const optimalLineup = allOptimalLineups?.find((optimalLineup: any) => optimalLineup.date === dateString)?.optimalLineup || [];
        const positions: string[] = _.uniq(playerPool?.map((player: PlayerPoolAttributes) => player.position));
        setState({
            ...state,
            isLoading: false,
            sport,
            allFantasyData,
            fantasyData,
            allPlayerPools,
            playerPool,
            allOptimalLineups,
            optimalLineup,
            positions
        });
    });
};