import {retrieveObjectFromS3} from "../../aws/aws";
import {DFS_PIPELINE_BUCKET_NAME, FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import {PerformanceState} from "../../types";

export const handleShowPerformance = async (sport: string, state: PerformanceState,
                                            setState: (state: PerformanceState) => void) => {
    setState({
        ...state,
        isLoading: true,
        sport
    });
    const fantasyData = await retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`);
    const optimalLineupObject = await retrieveObjectFromS3(DFS_PIPELINE_BUCKET_NAME, `${sport}OptimalLineup.json`);
    setState({
        ...state,
        isLoading: false,
        sport,
        fantasyData,
        optimalLineup: optimalLineupObject?.lineup
    });
};