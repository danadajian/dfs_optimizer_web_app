import {SUPPORTED_CONTESTS} from "@dadajian/shared-fantasy-constants";

export const extractContestsFromDfsData = (dataArray: any[], site: string, sport: string, date: Date) => {
    if (site === 'Fanduel')
        return dataArray
            .filter((contestJson: any) => isValidFanduelContest(contestJson, sport))
            .map(contestJson => contestJson.contest);
    else
        return dataArray
            .map(contestJson => contestJson.contest)
            .filter((contestName: string) => isValidDraftKingsContest(contestName, date));
};

const isValidFanduelContest = (contestJson: any, sport: string) => {
    const contestName = contestJson.contest;
    return contestJson.sport === sport.toUpperCase() &&
        (SUPPORTED_CONTESTS.includes(contestName) ||
            (contestName.split(' ').length === 3 && contestName.includes('@')))
}

const isValidDraftKingsContest = (contestName: string, date: Date) => {
    const contestNameWords = contestName.split(' ');
    const contestDate = contestNameWords[contestNameWords.length - 1].slice(1, -1);
    const month = parseInt(contestDate.split('/')[0]);
    const day = parseInt(contestDate.split('/')[1]);
    return date.getMonth() + 1 === month && date.getDate() === day;
}