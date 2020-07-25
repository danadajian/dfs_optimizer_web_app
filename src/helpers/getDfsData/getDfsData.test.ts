import {getDfsData} from './getDfsData'
import {invokeLambdaFunction} from "../../aws/aws";
import {formatDate} from "../formatDate/formatDate";

jest.mock('../../aws/aws');
jest.mock('../formatDate/formatDate');

(formatDate as jest.Mock).mockReturnValue('formatted date');

describe('get dfs data', () => {
    const sport = 'a sport';
    const date = new Date('4/20/2020');

    describe('fanduel case', () => {
        let result: any;
        const site = 'Fanduel';

        beforeEach(async () => {
            (invokeLambdaFunction as jest.Mock).mockResolvedValue([
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
            ]);
            result = await getDfsData(site, sport, date)
        });

        it('should call invoke lambda with correct params', () => {
            expect(invokeLambdaFunction).toHaveBeenCalledWith(process.env.REACT_APP_FANDUEL_LAMBDA, {date: 'formatted date'})
        });

        it('should return expected result', () => {
            expect(result).toEqual([
                {
                    contest: 'CAT @ HAT',
                    sport: 'A SPORT'
                },
                {
                    contest: 'Main',
                    sport: 'A SPORT'
                }
            ])
        });
    });

    describe('draftkings case', () => {
        let result: any;
        const site = 'DraftKings';

        beforeEach(async () => {
            (invokeLambdaFunction as jest.Mock).mockResolvedValue([
                {
                    contest: 'contest1 (4/20)'
                },
                {
                    contest: 'contest2 (1/31)'
                }
            ]);
            result = await getDfsData(site, sport, date)
        });

        it('should call invoke lambda with correct params', () => {
            expect(invokeLambdaFunction).toHaveBeenCalledWith(process.env.REACT_APP_DRAFTKINGS_LAMBDA, {sport: 'a sport'})
        });

        it('should return expected result', () => {
            expect(result).toEqual([
                {
                    contest: 'contest1 (4/20)'
                }
            ])
        });
    });

    afterEach(() => jest.clearAllMocks())
});