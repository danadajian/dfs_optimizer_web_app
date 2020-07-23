import {getPlayerPool} from './getPlayerPool'

jest.spyOn(window, 'alert').mockImplementation(() => jest.fn());

global.Math.random = () => 0.5;

describe('combineDfsAndProjectionsData', () => {
    let result: any;

    describe('projections data exists case', () => {
        const dfsPlayers = [
            {"position": "RB", "salary": 4900, "name": "LeSean McCoy", "team": "KC"},
            {"position": "RB", "salary": 4500, "playerId": 400947, "name": "Anthony Sherman", "team": "KC"}
        ];
        const site = 'Fanduel';
        const playerHistory = [
            {
                "DraftKings": 69.9,
                "Fanduel": 69.6,
                "name": "LeSean McCoy",
                "playerId": 397945
            },
            {
                "name": "Anthony Sherman",
                "DraftKings": 4.0,
                "Fanduel": 5.0,
                "playerId": 400947
            }
        ];
        const opponentRanks = {"Tennessee Titans": {"RB": 16, "QB": 18, "TE": 27, "D/ST": 8, "WR": 15, "K": 6}};
        const injuries = {"LeSean McCoy": "Questionable"};
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
                    "DraftKingsProjection": 0.8460388191826829,
                    "FanduelProjection": 0.7579393092959834,
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
                    "DraftKingsProjection": 0.5435214312075175,
                    "FanduelProjection": 0.4296565759700945,
                    "projection": 0.4296565759700945,
                    "rollingAverage": 5.0,
                    "opponentRank": 16,
                    "position": "RB",
                    "salary": 4500,
                    "playerId": 400947,
                    "status": ""
                }
            ])
        });
    })

    describe('projections data does not exist case', () => {
        const dfsPlayers = [
            {"position": "RB", "salary": 4900, "name": "LeSean McCoy", "team": "KC"},
            {"position": "RB", "salary": 4500, "playerId": 400947, "name": "Anthony Sherman", "team": "KC"}
        ];
        const site = 'Fanduel';
        const playerHistory = [
            {
                "DraftKings": 69.9,
                "Fanduel": 69.6,
                "name": "LeSean McCoy",
                "playerId": 397945
            },
            {
                "name": "Anthony Sherman",
                "DraftKings": 4.0,
                "Fanduel": 5.0,
                "playerId": 400947
            }
        ];
        const opponentRanks = {"Tennessee Titans": {"RB": 16, "QB": 18, "TE": 27, "D/ST": 8, "WR": 15, "K": 6}};
        const injuries = {"LeSean McCoy": "Questionable"};
        const projectionsData = {};

        beforeEach(() => {
            result = getPlayerPool(dfsPlayers, projectionsData, playerHistory, site, opponentRanks, injuries, [])
        });

        it('should call window alert', () => {
            expect(window.alert).toHaveBeenCalledWith('Projection data is currently unavailable.');
        });

        it('combines data correctly', () => {
            expect(result).toEqual([
                {
                    "name": "LeSean McCoy",
                    "team": "KC",
                    "projection": 0,
                    "position": "RB",
                    "salary": 4900,
                    "playerId": 0.5
                },
                {
                    "name": "Anthony Sherman",
                    "team": "KC",
                    "projection": 0,
                    "position": "RB",
                    "salary": 4500,
                    "playerId": 400947
                }
            ])
        });
    })
});