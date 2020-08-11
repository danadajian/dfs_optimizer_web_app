import {getDfsData} from "../../../helpers/getDfsData/getDfsData";
import {invokeLambdaFunction} from "../../../aws/aws";
import {State, DfsContest} from "../../../types";
import {INITIAL_STATE} from "../../../constants";

export const handleSportChange = async (sport: string, state: State, setState: (state: State) => void) => {
    const {site, date} = state;
    const updateLoadingText = (loadingText: string) => {
        setState({
            ...INITIAL_STATE,
            date,
            site,
            isLoading: true,
            loadingText,
            sport
        });
    };
    let dfsData: DfsContest[], contests: any[], projectionsData: any, opponentRanks: any, injuries: any, playerStatuses: any[];
    return Promise.resolve(updateLoadingText(`${site} data`))
        .then(() => {
            return getDfsData(site!, sport, date)
        })
        .then((dfsDataResult: DfsContest[] = []) => {
            dfsData = dfsDataResult
            contests = dfsData.map((contestJson: DfsContest) => contestJson.contest);
        })
        .then(() => {
            updateLoadingText(`${sport.toUpperCase()} projections`);
            return invokeLambdaFunction(process.env.REACT_APP_PROJECTIONS_LAMBDA, {sport})
        })
        .then(projectionsResult => {
            projectionsData = projectionsResult;
        })
        .then(() => {
            updateLoadingText(`${sport.toUpperCase()} opponent ranks`);
            return invokeLambdaFunction(process.env.REACT_APP_OPPONENT_RANKS_LAMBDA, {sport})
        })
        .then(opponentRanksResult => {
            opponentRanks = opponentRanksResult;
        })
        .then(() => {
            updateLoadingText(`${sport.toUpperCase()} injury data`);
            return invokeLambdaFunction(process.env.REACT_APP_INJURIES_LAMBDA, {sport});
        })
        .then(injuriesResult => {
            injuries = injuriesResult;
        })
        .then(() => {
            if (sport === 'nhl') {
                updateLoadingText('player statuses');
                return invokeLambdaFunction(process.env.REACT_APP_GOALIE_SCRAPER_LAMBDA);
            }
        })
        .then((playerStatusesResult = []) => {
            playerStatuses = playerStatusesResult;
        })
        .then(() => {
            setState({
                ...state,
                isLoading: false,
                sport,
                dfsData,
                contests,
                projectionsData: projectionsData.body,
                opponentRanks,
                injuries,
                playerStatuses,
                contest: '',
                playerPool: [],
                filteredPool: [],
                whiteList: [],
                blackList: []
            });
        })
        .catch(error => {
            alert(error);
            setState({
                ...INITIAL_STATE,
                isLoading: false
            });
        })
};
