import {getPerformanceDataByDate} from "./getPerformanceDataByDate";
import * as moment from "moment-timezone";

jest.mock('moment-timezone');

const format = jest.fn(() => 'the right date');
(moment as any).mockImplementation(() => ({
    format
}));

describe('getPerformanceDataByDate', () => {
    let result: any;
    const date = new Date();
    const playerPool = [
        {
            position: 'position1'
        },
        {
            position: 'position1'
        },
        {
            position: 'position2'
        }
    ];
    const allPlayerPools = [
        {
            date: 'the right date',
            playerPool
        }
    ];
    const allFantasyData = [
        {
            date: 'the wrong date',
            fantasyData: 'other fantasy data'
        },
        {
            date: 'the right date',
            fantasyData: 'fantasy data'
        }
    ];
    const allOptimalLineups = [
        {
            date: 'the wrong date',
            optimalLineup: 'other optimal lineup'
        },
        {
            date: 'the right date',
            optimalLineup: 'optimal lineup'
        }
    ];
    const state = {
        allFantasyData,
        allPlayerPools,
        allOptimalLineups
    };

    beforeEach(() => {
        // @ts-ignore
        result = getPerformanceDataByDate(date, state)
    })

    it('should call format with correct params', () => {
        expect(format).toHaveBeenCalledWith('YYYY-MM-DD')
    });

    it('should return expected result', () => {
        expect(result).toEqual({
            fantasyData: 'fantasy data',
            playerPool,
            optimalLineup: 'optimal lineup',
            positions: ['position1', 'position2']
        })
    });
});