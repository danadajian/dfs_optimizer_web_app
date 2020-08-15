import {getPerformanceDataByDate} from "./getPerformanceDataByDate";

describe('getPerformanceDataByDate', () => {
    let result: any;
    const date = 'the right date';
    const allRecentFantasyData = [
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
        allRecentFantasyData,
        allOptimalLineups
    };

    beforeEach(() => {
        // @ts-ignore
        result = getPerformanceDataByDate(date, state)
    });

    it('should return expected result', () => {
        expect(result).toEqual({
            recentFantasyData: {
                date: 'the right date',
                fantasyData: 'fantasy data'
            },
            optimalLineup: 'optimal lineup',
        })
    });
});