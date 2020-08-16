import {RecentFantasyData} from "@dadajian/shared-fantasy-constants";

export type State = {
    isLoading: boolean,
    isOptimizing?: boolean,
    date: string,
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

export type PerformanceState = {
    isLoading: boolean,
    date: string,
    sport?: string,
    allRecentFantasyData?: RecentFantasyData[],
    recentFantasyData?: RecentFantasyData,
    allOptimalLineups?: any[],
    optimalLineup?: LineupAttributes[],
    position?: string
    positions?: string[],
    rollingOverallPercentile?: number
}

export type PerformanceStateProps = {
    state: PerformanceState,
    setState: (state: PerformanceState) => void,
}