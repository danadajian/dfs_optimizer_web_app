import {PlayerPoolAttributes, State} from "../../types";

export const handleAddPlayerToBlackList = (playerIdToAdd: number, state: State, setState: (state: State) => void) => {
    const {playerPool, lineup, whiteList, blackList, lineupPositions, displayMatrix} = state;
    const blackListedPlayer = playerPool.find((player: PlayerPoolAttributes) => player.playerId === playerIdToAdd)!;
    if (blackList.includes(blackListedPlayer.playerId)) {
        blackList.splice(blackList.indexOf(blackListedPlayer.playerId), 1);
    } else {
        blackList.push(blackListedPlayer.playerId);
        if (whiteList.includes(blackListedPlayer.playerId)) {
            whiteList.splice(whiteList.indexOf(blackListedPlayer.playerId), 1);
        }
        const playerInLineup = lineup.find(player => player.playerId === blackListedPlayer.playerId);
        if (playerInLineup) {
            const lineupIndex = lineup.indexOf(playerInLineup);
            lineup[lineupIndex] = {
                lineupIndex,
                playerId: 0,
                position: lineupPositions[lineupIndex],
                displayPosition: displayMatrix[lineupIndex],
            };
        }
    }
    setState({
        ...state,
        lineup,
        whiteList,
        blackList,
        searchText: '',
        filteredPool: [],
        sortValue: 'All'
    })
};