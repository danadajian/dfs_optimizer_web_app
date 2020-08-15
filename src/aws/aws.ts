import {Lambda, S3} from "../aws";
import {delay, isDevelopment} from "../constants";

const mockFanduelData = require('../fixtures/fanduelDataResponse.json');
const mockProjectionsData = require('../fixtures/nflProjectionsResponse.json');
const mockOpponentRanksData = require('../fixtures/opponentRanksResponse.json');
const mockInjuriesData = require('../fixtures/nflInjuriesResponse.json');
const mockOptimalLineupResponse = require('../fixtures/optimalLineupResponse.json');
const mockStartTimesData = require('../fixtures/startTimes.json');
const mockRecentFantasyData = require('../fixtures/recentFantasyDataResponse.json');
const mockOptimalLineups = require('../fixtures/recentOptimalLineupsResponse.json');

export const invokeLambdaFunction = async (functionName: any, payload: any = {}) => {
    const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload)
    };
    if (isDevelopment()) {
        const mockResponseMap: any = {
            REACT_APP_FANDUEL_LAMBDA: mockFanduelData,
            REACT_APP_PROJECTIONS_LAMBDA: mockProjectionsData,
            REACT_APP_OPPONENT_RANKS_LAMBDA: mockOpponentRanksData,
            REACT_APP_INJURIES_LAMBDA: mockInjuriesData,
            REACT_APP_OPTIMAL_LINEUP_LAMBDA: mockOptimalLineupResponse
        };
        return delay(250).then(() => mockResponseMap[functionName])
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
        const mockResponseMap: any = {
            'startTimes.json': mockStartTimesData,
            'mlbRecentOptimalLineups.json': mockOptimalLineups,
            'mlbRecentFantasyData.json': mockRecentFantasyData
        };
        return delay(250).then(() => mockResponseMap[fileName])
    }
    const data: any = await S3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
};
