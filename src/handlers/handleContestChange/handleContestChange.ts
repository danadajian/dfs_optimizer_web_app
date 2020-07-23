import {LINEUP_RULES} from "../../constants";
import {getPlayerPool} from "../../helpers/getPlayerPool/getPlayerPool";
import {createEmptyLineup} from "../../helpers/createEmptyLineup/createEmptyLineup";
import {State} from "../../interfaces";

export const handleContestChange = async (contest: string, state: State, setState: (state: State) => void) => {
    const {site, sport, dfsData, projectionsData, playerHistory, opponentRanks, injuries, playerStatuses} = state;
    if (!dfsData || dfsData.length === 0) {
        alert(`${site} data is currently unavailable.`);
        return
    }
    const gameType = contest.includes('@') || contest.includes('vs') ? 'Single Game' : 'Classic';
    const contestRules = LINEUP_RULES[site][sport][gameType];
    const {lineupPositions, displayMatrix, salaryCap, lineupRestrictions} = contestRules;
    const dfsPlayers = dfsData.filter((contestJson: any) => contestJson.contest === contest)[0]['players'];
    const playerPool = getPlayerPool(dfsPlayers, projectionsData, playerHistory, site, opponentRanks, injuries, playerStatuses);
    setState({
        ...state,
        contest,
        playerPool,
        filteredPool: [],
        whiteList: [],
        blackList: [],
        lineup: createEmptyLineup(lineupPositions, displayMatrix),
        lineupPositions,
        displayMatrix,
        salaryCap,
        lineupRestrictions
    });
};