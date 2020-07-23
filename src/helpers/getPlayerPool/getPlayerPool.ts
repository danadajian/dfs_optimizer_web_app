import {INJURY_ABBREVIATIONS, TEAM_ABBREVIATIONS} from "../../constants";

export const getPlayerPool = (dfsPlayers: any[], projectionsData: any, playerHistory: any, site: string,
                              opponentRanks: any, injuries: any, playerStatuses: any) => {
    if (!projectionsData || Object.keys(projectionsData).length === 0 || projectionsData['errorMessage']) {
        alert('Projection data is currently unavailable.');
        return dfsPlayers.map(player => ({
                ...player,
                playerId: player.playerId || Math.random(),
                projection: 0
            })
        )
    }
    return dfsPlayers.filter(player => {
        if (!player.playerId) {
            player.playerId = Number(Object.keys(projectionsData)
                .find(playerId => projectionsData[playerId].name === player.name)!);
        }
        return projectionsData[player.playerId];
    }).map(player => {
        const playerData = projectionsData[player.playerId];
        const opposingTeam = playerData.opponent.split(' ')[1];
        const teamRanks = opponentRanks[TEAM_ABBREVIATIONS[opposingTeam]];
        const playerHistoryPlayer = playerHistory.find((playerObject: any) => playerObject.playerId === player.playerId);
        const opponentRankPosition: any = teamRanks && Object.keys(teamRanks)
            .find(position => position.replace('/', '').includes(player.position));
        const playerStatus = playerStatuses.find((player: any) => player.name === playerData.name) ?
            playerStatuses.find((player: any) => player.name === playerData.name).status : '';
        const injuryStatus = injuries[playerData.name] ? injuries[playerData.name].toLowerCase() : '';
        return {
            ...player,
            ...playerData,
            projection: playerData[site + 'Projection'],
            rollingAverage: playerHistoryPlayer && playerHistoryPlayer[site],
            opponentRank: teamRanks && opponentRankPosition && teamRanks[opponentRankPosition],
            status: (playerStatus || injuryStatus) &&
                `${INJURY_ABBREVIATIONS[injuryStatus] || ''}${playerStatus ? ' ' : ''}${playerStatus}`
        };
    });
};