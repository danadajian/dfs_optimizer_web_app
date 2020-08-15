import * as _ from 'lodash';

export const getPerformanceDataByDate = (date: string, state: any) => {
    const recentFantasyData = state.allRecentFantasyData?.find((fantasyData: any) => fantasyData.date === date);
    const rollingOverallPercentile = _.chain(recentFantasyData).meanBy('overallPercentile').round(1).value();
    const optimalLineup = state.allOptimalLineups?.find((optimalLineup: any) => optimalLineup.date === date)?.optimalLineup || [];
    return {
        recentFantasyData,
        rollingOverallPercentile,
        optimalLineup,
    }
}