import {retrieveObjectFromS3} from "../../aws/aws";
import {DFS_PIPELINE_BUCKET_NAME, FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import {PerformanceState, PlayerPoolAttributes} from "../../types";
import * as _ from "lodash";

export const handleShowPerformance = async (sport: string, state: PerformanceState,
                                            setState: (state: PerformanceState) => void) => {
    return Promise.resolve(setState({
        ...state,
        isLoading: true,
        sport
    })).then(() => {
        return Promise.all([
            retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`),
            retrieveObjectFromS3(DFS_PIPELINE_BUCKET_NAME, `${sport}PlayerPool.json`),
            retrieveObjectFromS3(DFS_PIPELINE_BUCKET_NAME, `${sport}OptimalLineup.json`)
        ]);
    }).then(([fantasyData, playerPool, optimalLineupObject]) => {
        const positions: string[] = _.uniq(playerPool?.map((player: PlayerPoolAttributes) => player.position));
        setState({
            ...state,
            isLoading: false,
            sport,
            fantasyData,
            playerPool,
            optimalLineup: optimalLineupObject?.lineup,
            positions
        });
    });
};