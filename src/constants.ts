import {PerformanceState, State} from "./types";
import moment from "moment-timezone";

export const isDevelopment = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

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
    date: isDevelopment() ? '2020-08-07' : moment().tz('America/New_York').format('YYYY-MM-DD')
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
export const SUPPORTED_SITES = ['Fanduel', 'DraftKings'];
export const MAX_COMBINATIONS = 1000000;
export const DESKTOP_VIEW_THRESHOLD = 1200;

export const CHART_CONFIG = {
    label: 'Fanduel Points',
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: 'gray',
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
};

export const CHART_OPTIONS = {
    title: {
        display: true,
        fontSize: 24,
        fontColor: "black",
        text: 'Fanduel Points'
    },
    legend: {
        display: false
    },
    scales: {
        xAxes: [
            {
                ticks: {
                    display: false
                },
                gridLines: {
                    display: false
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    suggestedMin: -5,
                    suggestedMax: 50,
                    fontColor: "black"
                },
                gridLines: {
                    zeroLineColor: "black",
                    color: "rgba(200, 200, 200, 0.25)"
                }
            }
        ]
    },
    tooltips: {
        displayColors: false
    },
    responsive: true,
    maintainAspectRatio: false
};