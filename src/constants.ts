import {PerformanceState, State} from "./types";

export const INITIAL_STATE: State = {
    isLoading: false,
    isOptimizing: false,
    date: new Date(),
    playerPool: [],
    filteredPool: [],
    whiteList: [],
    blackList: [],
    lineup: [],
    contests: [],
};

export const INITIAL_PERFORMANCE_STATE: PerformanceState = {
    isLoading: false,
    date: new Date()
}

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
export const SUPPORTED_SITES = ['Fanduel', 'DraftKings'];
export const MAX_COMBINATIONS = 1000000;
export const DESKTOP_VIEW_THRESHOLD = 1200;