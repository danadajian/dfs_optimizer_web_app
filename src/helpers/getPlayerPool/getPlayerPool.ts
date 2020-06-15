import {INJURY_ABBREVIATIONS, TEAM_ABBREVIATIONS} from "../../constants";

export const getPlayerPool = (dfsPlayers: any[], projectionsData: any, playerHistory: any, site: string,
                              opponentRanks: any, injuries: any, playerStatuses: any) => {
    return dfsPlayers.filter(player => {
        if (!player.playerId) {
            player.playerId = Number(Object.keys(projectionsData)
                .find(playerId => projectionsData[playerId].name === player.name)!);
        }
        return projectionsData[player.playerId];
    }).map((player: any) => {
        const playerData = projectionsData[player.playerId];
        if (playerData) {
            const opposingTeam = playerData.opponent.split(' ')[1];
            const teamRanks = opponentRanks[TEAM_ABBREVIATIONS[opposingTeam]];
            const playerHistoryPlayer = playerHistory.find((playerObject: any) => playerObject.playerId === player.playerId);
            const opponentRankPosition: any = Object.keys(teamRanks)
                .find(position => position.replace('/', '').includes(player.position));
            const playerStatus = playerStatuses.find((player: any) => player.name === playerData.name) ?
                playerStatuses.find((player: any) => player.name === playerData.name).status : '';
            const injuryStatus = injuries[playerData.name] ? injuries[playerData.name].toLowerCase() : '';
            return {
                ...player,
                ...playerData,
                projection: playerData[site + 'Projection'],
                rollingAverage: playerHistoryPlayer && playerHistoryPlayer[site],
                opponentRank: teamRanks[opponentRankPosition],
                status: (playerStatus || injuryStatus) &&
                    `${INJURY_ABBREVIATIONS[injuryStatus] || ''}${playerStatus ? ' ' : ''}${playerStatus}`
            };
        }
    });
};