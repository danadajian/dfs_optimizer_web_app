export const getPerformanceDataByDate = (date: string, state: any) => {
    const recentFantasyData = state.allRecentFantasyData?.find((fantasyData: any) => fantasyData.date === date);
    const {positions} = recentFantasyData || {};
    const optimalLineup = state.allOptimalLineups?.find((optimalLineup: any) => optimalLineup.date === date)?.optimalLineup || [];
    return {
        recentFantasyData,
        optimalLineup,
        positions
    }
}