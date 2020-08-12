import {invokeLambdaFunction} from "../../aws/aws";
import {DfsContest} from "../../types";
import {SUPPORTED_CONTESTS} from "@dadajian/shared-fantasy-constants";

export const getDfsData = async (site: string, sport: string, date: string) => {
    if (site === 'Fanduel') {
        return invokeLambdaFunction(process.env.REACT_APP_FANDUEL_LAMBDA, {date})
            .then(fanduelData => {
                return fanduelData.filter((contestJson: DfsContest) => isValidFanduelContest(contestJson, sport));
            })
    } else {
        return invokeLambdaFunction(process.env.REACT_APP_DRAFTKINGS_LAMBDA, {sport})
            .then(draftKingsData => {
                return draftKingsData.filter((contestJson: DfsContest) => isValidDraftKingsContest(contestJson.contest, date));
            })
    }
};

const isValidFanduelContest = (contestJson: DfsContest, sport: string) => {
    const contestName = contestJson.contest;
    return contestJson.sport === sport.toUpperCase() &&
        (SUPPORTED_CONTESTS.includes(contestName) ||
            (contestName.split(' ').length === 3 && contestName.includes('@')))
};

const isValidDraftKingsContest = (contestName: string, date: string) => {
    const contestNameWords = contestName.split(' ');
    const contestDate = contestNameWords[contestNameWords.length - 1].slice(1, -1);
    const month = contestDate.split('/')[0];
    const day = contestDate.split('/')[1];
    return Number(date.split('-')[1]) === Number(month) && Number(date.split('-')[2]) === Number(day);
};