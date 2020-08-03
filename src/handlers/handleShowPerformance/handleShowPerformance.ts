import {retrieveObjectFromS3} from "../../aws/aws";
import {DFS_PIPELINE_BUCKET_NAME, FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import {PerformanceState} from "../../types";

export const handleShowPerformance = async (sport: string, state: PerformanceState,
                                            setState: (state: PerformanceState) => void) => {
    return Promise.resolve(setState({
        ...state,
        isLoading: true,
        sport
    })).then(() => {
        return Promise.all([
            retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`),
            retrieveObjectFromS3(DFS_PIPELINE_BUCKET_NAME, `${sport}OptimalLineup.json`)
        ]);
    }).then(([fantasyData, optimalLineupObject]) => {
        setState({
            ...state,
            isLoading: false,
            sport,
            fantasyData,
            optimalLineup: optimalLineupObject?.lineup
        });
    });
};