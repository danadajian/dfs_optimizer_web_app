import {retrieveObjectFromS3} from "../../../aws/aws";
import {FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import {PerformanceState} from "../../../types";
import {getPerformanceDataByDate} from "../../../helpers/getPerformanceDataByDate/getPerformanceDataByDate";
import * as _ from "lodash";

export const handleSportChange = async (sport: string, state: PerformanceState,
                                        setState: (state: PerformanceState) => void) => {
    return Promise.resolve(setState({
        ...state,
        isLoading: true,
        sport
    })).then(() => {
        return Promise.all([
            retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`).catch(() => []),
            retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentOptimalLineups.json`).catch(() => [])
        ]);
    }).then(([allRecentFantasyData, allOptimalLineups]) => {
        const rollingOverallPercentile = _.chain(allRecentFantasyData).meanBy('avgOverallPercentile').round(1).value();
        setState({
            ...state,
            isLoading: false,
            sport,
            allRecentFantasyData,
            allOptimalLineups,
            rollingOverallPercentile,
            ...getPerformanceDataByDate(state.date, {allRecentFantasyData, allOptimalLineups})
        });
    });
};