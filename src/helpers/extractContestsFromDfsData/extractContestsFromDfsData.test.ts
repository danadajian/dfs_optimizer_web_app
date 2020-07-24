import {extractContestsFromDfsData} from './extractContestsFromDfsData'

describe('extract contests from data', () => {
    const sport = 'a sport';
    const date = new Date('4/20/2020');

    describe('fanduel case', () => {
        let result: any;
        const dataArray: any = [
            {
                contest: 'CAT @ HAT',
                sport: 'A SPORT'
            },
            {
                contest: 'Main',
                sport: 'A SPORT'
            },
            {
                contest: 'different contest',
                sport: 'A SPORT'
            },
            {
                contest: 'Main',
                sport: 'DIFFERENT SPORT'
            }
        ];
        const site = 'Fanduel';

        beforeEach(() => {
            result = extractContestsFromDfsData(dataArray, site, sport, date)
        })

        it('should return expected result', () => {
            expect(result).toEqual(['CAT @ HAT', 'Main'])
        });
    })

    describe('draftkings case', () => {
        let result: any;
        const dataArray: any = [
            {
                contest: 'contest1 (4/20)'
            },
            {
                contest: 'contest2'
            }
        ];
        const site = 'DraftKings';

        beforeEach(() => {
            result = extractContestsFromDfsData(dataArray, site, sport, date)
        })

        it('should return expected result', () => {
            expect(result).toEqual(['contest1 (4/20)'])
        });
    })

    describe('no data case', () => {
        let result: any;
        const dataArray: any = [];
        const site = 'Fanduel';

        beforeEach(() => {
            result = extractContestsFromDfsData(dataArray, site, sport, date)
        })

        it('should return expected result', () => {
            expect(result).toEqual([])
        });
    })
});