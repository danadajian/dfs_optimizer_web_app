export interface State {
    isLoading: boolean,
    isOptimizing: boolean,
    date: Date,
    maxCombinations: number,
    salaryCap: number,
    whiteList: number[],
    blackList: number[],
    site: string,
    sport: string,
    contest: string,
    loadingText: string,
    searchText: string,
    sortValue: string,
    playerPool: PlayerPoolAttributes[],
    filteredPool: PlayerPoolAttributes[],
    lineup: LineupAttributes[],
    lineupPositions: string[],
    displayMatrix: string[],
    dfsData: any[],
    injuries: any,
    lineupRestrictions: any,
    opponentRanks: any,
    projectionsData: any,
    contests: any[],
    playerStatuses: any[],
    playerHistory: any[]
}

export interface StateProps {
    state: State,
    setState: (state: State) => void
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
    opponentRank: number,
    spread: string,
    overUnder: number

    [key: string]: any
}

export interface DfsContest {
    contest: string,
    players: any[],
    sport?: string
}