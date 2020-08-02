import {Lambda, S3} from "../aws";
import {isDevelopment} from "../constants";

const mockFanduelData = require('../fixtures/fanduelDataResponse.json');
const mockProjectionsData = require('../fixtures/nflProjectionsResponse.json');
const mockRollingAveragesData = require('../fixtures/rollingAveragesResponse.json');
const mockOpponentRanksData = require('../fixtures/opponentRanksResponse.json');
const mockInjuriesData = require('../fixtures/nflInjuriesResponse.json');
const mockOptimalLineupResponse = require('../fixtures/optimalLineupResponse.json');
const mockStartTimesData = require('../fixtures/startTimes.json');
const mockRecentFantasyData = require('../fixtures/recentFantasyDataResponse.json');
const mockOptimalLineupS3 = require('../fixtures/optimalLineupS3.json');

export const invokeLambdaFunction = async (functionName: any, payload: any = {}) => {
    const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload)
    };
    if (isDevelopment()) {
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        await delay(250);
        const mockResponseMap: any = {
            REACT_APP_FANDUEL_LAMBDA: mockFanduelData,
            REACT_APP_PROJECTIONS_LAMBDA: mockProjectionsData,
            REACT_APP_OPPONENT_RANKS_LAMBDA: mockOpponentRanksData,
            REACT_APP_INJURIES_LAMBDA: mockInjuriesData,
            REACT_APP_OPTIMAL_LINEUP_LAMBDA: mockOptimalLineupResponse,
            REACT_APP_ROLLING_FANTASY_AVERAGES_LAMBDA: mockRollingAveragesData,
        };
        return mockResponseMap[functionName]
    } else {
        const response: any = await Lambda.invoke(params).promise();
        return JSON.parse(response.Payload.toString());
    }
};

export const retrieveObjectFromS3 = async (bucketName: string, fileName: string): Promise<any> => {
    const params = {
        Bucket: bucketName,
        Key: fileName
    };
    if (isDevelopment()) {
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        await delay(250);
        const mockResponseMap: any = {
            'startTimes.json': mockStartTimesData,
            'mlbOptimalLineup.json': mockOptimalLineupS3,
            'mlbRecentFantasyData.json': mockRecentFantasyData
        };
        return mockResponseMap[fileName]
    }
    const data: any = await S3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
};
