import {Lambda} from "../aws";
import {isDevelopment} from "../constants";

const mockFanduelData = require('../fixtures/fanduelDataResponse.json');
const mockProjectionsData = require('../fixtures/nflProjectionsResponse.json');
const mockRollingAveragesData = require('../fixtures/rollingAveragesResponse.json');
const mockOpponentRanksData = require('../fixtures/opponentRanksResponse.json');
const mockInjuriesData = require('../fixtures/nflInjuriesResponse.json');
const mockOptimalLineupResponse = require('../fixtures/optimalLineupResponse.json');
const mockStartTimesData = require('../fixtures/startTimes.json');
const mockHistoricalData = require('../fixtures/historicalDataResponse.json');
const mockCurrentData = require('../fixtures/currentDataResponse.json');

export const invokeLambdaFunction = async (functionName: any, payload = {}) => {
    const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload)
    };
    if (isDevelopment()) {
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        await delay(250);
        return mockResponseMap[functionName]
    } else {
        const response: any = await Lambda.invoke(params).promise();
        return JSON.parse(response.Payload.toString());
    }
};

const mockResponseMap: any = {
    REACT_APP_FANDUEL_LAMBDA: mockFanduelData,
    REACT_APP_PROJECTIONS_LAMBDA: mockProjectionsData,
    REACT_APP_OPPONENT_RANKS_LAMBDA: mockOpponentRanksData,
    REACT_APP_INJURIES_LAMBDA: mockInjuriesData,
    REACT_APP_OPTIMAL_LINEUP_LAMBDA: mockOptimalLineupResponse,
    REACT_APP_ROLLING_FANTASY_AVERAGES_LAMBDA: mockRollingAveragesData,
    REACT_APP_RETRIEVE_FROM_S3_LAMBDA: mockStartTimesData,
    REACT_APP_GET_FANTASY_DATA_LAMBDA: mockHistoricalData,
    REACT_APP_GET_CURRENT_DATA_LAMBDA: mockCurrentData
};