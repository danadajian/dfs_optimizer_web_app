export interface State {
    isLoading: boolean,
    isOptimizing?: boolean,
    date: Date,
    maxCombinations?: number,
    salaryCap?: number,
    whiteList?: number[],
    blackList?: number[],
    site?: string,
    sport?: string,
    contest?: string,
    loadingText?: string,
    searchText?: string,
    sortValue?: string,
    playerPool?: PlayerPoolAttributes[],
    filteredPool?: PlayerPoolAttributes[],
    lineup?: LineupAttributes[],
    lineupPositions?: string[],
    displayMatrix?: string[],
    dfsData?: DfsContest[],
    injuries?: any,
    lineupRestrictions?: any,
    opponentRanks?: any,
    projectionsData?: any,
    contests?: any[],
    playerStatuses?: any[],
    rollingAverages?: any[]
}

export interface StateProps {
    state: State,
    setState: (state: State) => void,
    isDesktopView?: boolean,
    isHome?: boolean
}

export interface LineupAttributes {
    lineupIndex: number,
    playerId: number,
    displayPosition: string,
    position?: string,
    team?: string,
    name?: string,
    status?: string,
    opponent?: string,
    gameDate?: string,
    projection?: number,
    salary?: number,
    opponentRank?: number,
    spread?: string,
    overUnder?: number
}

export interface PlayerPoolAttributes {
    playerId: number,
    position: string,
    displayPosition: string,
    team: string,
    name: string,
    status: string,
    opponent: string,
    gameDate: string,
    projection: number,
    salary: number,
    rollingAverage: number,
    opponentRank: number,
    spread: string,
    overUnder: number,
    weather?: Weather

    [key: string]: any
}

export interface Weather {
    forecast: string,
    details: string
}

export interface DfsContest {
    contest: string,
    players: any[],
    sport?: string
}

export interface StartTime {
    sport: string,
    time: string
}

export interface PerformanceState {
    isLoading: boolean,
    date: Date,
    fantasyData?: any,
    optimalLineup?: LineupAttributes[],
    site?: string,
    sport?: string
}

export interface PerformanceStateProps {
    state: PerformanceState,
    setState: (state: PerformanceState) => void,
}