import {getDfsData} from "../../helpers/getDfsData/getDfsData";
import {extractContestsFromDfsData} from "../../helpers/extractContestsFromDfsData/extractContestsFromDfsData";
import {invokeLambdaFunction} from "../../aws/aws";
import {State} from "../../types";
import {INITIAL_STATE} from "../../constants";

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
    updateLoadingText(`${site} data`);
    const dfsData = await getDfsData(site, sport, date) || [];
    const contests = extractContestsFromDfsData(dfsData, site, sport, date);
    updateLoadingText(`${sport.toUpperCase()} projections`);
    const projectionsData = await invokeLambdaFunction(process.env.REACT_APP_PROJECTIONS_LAMBDA, {sport});
    updateLoadingText(`${sport.toUpperCase()} opponent ranks`);
    const opponentRanks = await invokeLambdaFunction(process.env.REACT_APP_OPPONENT_RANKS_LAMBDA, {sport});
    updateLoadingText(`${sport.toUpperCase()} injury data`);
    const injuries = await invokeLambdaFunction(process.env.REACT_APP_INJURIES_LAMBDA, {sport});
    updateLoadingText('player history');
    const playerHistory = await invokeLambdaFunction(process.env.REACT_APP_ROLLING_FANTASY_AVERAGES_LAMBDA, {site, sport});
    let playerStatuses = [];
    if (sport === 'nhl') {
        updateLoadingText('player statuses');
        playerStatuses = await invokeLambdaFunction(process.env.REACT_APP_GOALIE_SCRAPER_LAMBDA);
    }
    setState({
        ...state,
        isLoading: false,
        sport,
        dfsData,
        contests,
        projectionsData: projectionsData.body,
        playerHistory,
        opponentRanks,
        injuries,
        playerStatuses,
        contest: '',
        playerPool: [],
        filteredPool: [],
        whiteList: [],
        blackList: []
    });
};
