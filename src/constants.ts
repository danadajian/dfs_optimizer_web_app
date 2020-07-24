import {State} from "./types";

export const INITIAL_STATE: State = {
    isLoading: false,
    isOptimizing: false,
    date: new Date(),
    maxCombinations: 10000000,
    salaryCap: 0,
    site: '',
    sport: '',
    contest: '',
    loadingText: '',
    searchText: '',
    sortValue: 'All',
    playerPool: [],
    filteredPool: [],
    whiteList: [],
    blackList: [],
    lineup: [],
    lineupPositions: [],
    displayMatrix: [],
    contests: [],
    playerStatuses: [],
    dfsData: [],
    injuries: {},
    lineupRestrictions: {},
    opponentRanks: {},
    projectionsData: {},
    playerHistory: []
};
export const INJURY_ABBREVIATIONS: any = {
    'questionable': 'Q',
    'out': 'O',
    'day-to-day': 'DTD',
    'suspended': 'SUSP'
};
export const TEAM_ABBREVIATIONS: any = {
    'Ari': 'Arizona Cardinals',
    'Atl': 'Atlanta Falcons',
    'Bal': 'Baltimore Ravens',
    'Buf': 'Buffalo Bills',
    'Car': 'Carolina Panthers',
    'Chi': 'Chicago Bears',
    'Cin': 'Cincinnati Bengals',
    'Cle': 'Cleveland Browns',
    'Dal': 'Dallas Cowboys',
    'Den': 'Denver Broncos',
    'Det': 'Detroit Lions',
    'GB': 'Green Bay Packers',
    'Hou': 'Houston Texans',
    'Ind': 'Indianapolis Colts',
    'Jax': 'Jacksonville Jaguars',
    'KC': 'Kansas City Chiefs',
    'LV': 'Las Vegas Raiders',
    'LAC': 'Los Angeles Chargers',
    'LAR': 'Los Angeles Rams',
    'Mia': 'Miami Dolphins',
    'Min': 'Minnesota Vikings',
    'NE': 'New England Patriots',
    'NO': 'New Orleans Saints',
    'NYG': 'New York Giants',
    'NYJ': 'New York Jets',
    'Phi': 'Philadelphia Eagles',
    'Pit': 'Pittsburgh Steelers',
    'SF': 'San Francisco 49ers',
    'Sea': 'Seattle Seahawks',
    'TB': 'Tampa Bay Buccaneers',
    'Ten': 'Tennessee Titans',
    'Was': 'Washington'
};
export const KNAPSACK_PROBLEM_LINK = "https://en.wikipedia.org/wiki/Knapsack_problem";
export const isDevelopment = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const NUMBER_OF_GAMES_FOR_ROLLING_AVG = 5;