import {retrieveObjectFromS3} from "../../../aws/aws";
import {FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import {PerformanceState} from "../../../types";
import {getPerformanceDataByDate} from "../../../helpers/getPerformanceDataByDate/getPerformanceDataByDate";

export const handleSportChange = async (sport: string, state: PerformanceState,
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
        setState({
            ...state,
            isLoading: false,
            sport,
            allFantasyData,
            allPlayerPools,
            allOptimalLineups,
            ...getPerformanceDataByDate(state.date, {allFantasyData, allPlayerPools, allOptimalLineups})
        });
    });
};