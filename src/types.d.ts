export type State = {
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
    playerStatuses?: any[]
}

export type StateProps = {
    state: State,
    setState: (state: State) => void,
    isDesktopView?: boolean,
    isHome?: boolean
}

export type LineupAttributes = {
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

export type PlayerPoolAttributes = {
    playerId: number,
    position: string,
    displayPosition?: string,
    team: string,
    name: string,
    status?: string,
    opponent?: string,
    gameDate?: string,
    projection: number,
    salary: number,
    opponentRank?: number,
    spread?: string,
    overUnder?: number,
    weather?: Weather

    [key: string]: any
}

export type Weather = {
    forecast: string,
    details: string
}

export type DfsContest = {
    contest: string,
    players: any[],
    sport?: string
}

export type StartTime = {
    sport: string,
    time: string
}

export type PerformanceState = {
    isLoading: boolean,
    date: Date,
    fantasyData?: FantasyData[],
    playerPool?: PlayerPoolAttributes[],
    optimalLineup?: LineupAttributes[],
    positions?: string[],
    sport?: string,
    position?: string
}

export type PerformanceStateProps = {
    state: PerformanceState,
    setState: (state: PerformanceState) => void,
}

export type FantasyData = {
    playerId: number,
    name: string,
    Fanduel: number,
    DraftKings: number
}