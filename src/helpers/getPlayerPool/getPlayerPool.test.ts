import {getPlayerPool} from './getPlayerPool'

describe('combineDfsAndProjectionsData', () => {
    let result: any;
    const dfsPlayers = [
        {"position": "RB", "salary": 4900, "name": "LeSean McCoy"},
        {"position": "RB", "salary": 4500, "playerId": 400947, "name": "Anthony Sherman"}
    ];
    const projectionsData = {
        "397945": {
            "overUnder": 53, "gameDate": "Sun 3:05PM EST", "opponent": "v. Ten",
            "DraftKingsProjection": 0.8460388191826829, "name": "LeSean McCoy", "FanduelProjection": 0.7579393092959834,
            "team": "KC", "spread": "-7.0"
        },
        "400947": {
            "overUnder": 53, "gameDate": "Sun 3:05PM EST", "opponent": "v. Ten",
            "DraftKingsProjection": 0.5435214312075175, "name": "Anthony Sherman", "FanduelProjection": 0.4296565759700945,
            "team": "KC", "spread": "-7.0"
        }
    };
    const playerHistory = [
        {
            "DraftKings": 69.9,
            "Fanduel": 69.6,
            "Name": "LeSean McCoy",
            "PlayerId": 397945
        },
        {
            "Name": "Anthony Sherman",
            "DraftKings": 4.0,
            "Fanduel": 5.0,
            "PlayerId": 400947
        }
    ];
    const site = 'Fanduel';
    const opponentRanks = {"Tennessee Titans": {"RB": 16, "QB": 18, "TE": 27, "D/ST": 8, "WR": 15, "K": 6}};
    const injuries = {"LeSean McCoy": "Questionable"};

    beforeEach(() => {
        result = getPlayerPool(dfsPlayers, projectionsData, playerHistory, site, opponentRanks, injuries, [])
    });

    it('combines data correctly', () => {
        expect(result).toEqual([
            {
                "name": "LeSean McCoy",
                "team": "KC",
                "opponent": "v. Ten",
                "gameDate": "Sun 3:05PM EST",
                "spread": "-7.0",
                "overUnder": 53,
                "projection": 0.7579393092959834,
                "rollingAverage": 69.6,
                "opponentRank": 16,
                "status": "Q",
                "position": "RB",
                "salary": 4900,
                "playerId": 397945
            },
            {
                "name": "Anthony Sherman",
                "team": "KC",
                "opponent": "v. Ten",
                "gameDate": "Sun 3:05PM EST",
                "spread": "-7.0",
                "overUnder": 53,
                "projection": 0.4296565759700945,
                "rollingAverage": 5.0,
                "opponentRank": 16,
                "position": "RB",
                "salary": 4500,
                "playerId": 400947
            }
        ])
    });
});