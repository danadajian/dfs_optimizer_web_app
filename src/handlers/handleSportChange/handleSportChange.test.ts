import {handleSportChange} from "./handleSportChange";
import {getDfsData} from "../../helpers/getDfsData/getDfsData";
import {invokeLambdaFunction} from "../../aws/aws";
import {INITIAL_STATE} from "../../constants";

jest.mock("../../helpers/getDfsData/getDfsData");
jest.mock("../../aws/aws");

const dfsData = [
    {
        contest: 'dfs1'
    },
    {
        contest: 'dfs2'
    }
];
(getDfsData as jest.Mock).mockResolvedValue(dfsData);
(invokeLambdaFunction as jest.Mock).mockResolvedValue({body: 'lambda result'});

const setState = jest.fn();

describe('handleSportChange', () => {
    describe('non-nhl case', () => {
        let result: any;
        const state = {
            site: 'a site',
            date: 'a date'
        };
        const sport = 'not nhl';
        beforeEach(async () => {
            // @ts-ignore
            result = await handleSportChange(sport, state, setState)
        });

        it('should call getDfsData with correct params', () => {
            expect(getDfsData).toHaveBeenCalledWith('a site', 'not nhl', 'a date')
        });

        const loadingTexts = [
            'a site data',
            'NOT NHL projections',
            'NOT NHL opponent ranks',
            'NOT NHL injury data',
            'player history'
        ];
        it.each(loadingTexts)
        ('should call setState via updateLoadingText with correct params', (loadingText) => {
            expect(setState).toHaveBeenNthCalledWith( loadingTexts.indexOf(loadingText) + 1,
                {
                    ...INITIAL_STATE,
                    date: state.date,
                    site: state.site,
                    isLoading: true,
                    loadingText,
                    sport
                })
        });

        const sportLambdas = [
            process.env.REACT_APP_PROJECTIONS_LAMBDA,
            process.env.REACT_APP_OPPONENT_RANKS_LAMBDA,
            process.env.REACT_APP_INJURIES_LAMBDA
        ];
        it.each(sportLambdas)
        ('should call invoke lambda with correct params', (lambdaName) => {
            expect(invokeLambdaFunction).toHaveBeenNthCalledWith( sportLambdas.indexOf(lambdaName) + 1,
                lambdaName, {sport: 'not nhl'})
        });

        it('should call rolling averages lambda with correct params', () => {
            expect(invokeLambdaFunction).toHaveBeenCalledWith(process.env.REACT_APP_ROLLING_FANTASY_AVERAGES_LAMBDA,
                {site: state.site, sport})
        });

        it('should call setState with correct params at the end', () => {
            expect(setState).toHaveBeenLastCalledWith({
                ...state,
                isLoading: false,
                sport,
                dfsData,
                contests: ['dfs1', 'dfs2'],
                projectionsData: 'lambda result',
                playerHistory: {body: 'lambda result'},
                opponentRanks: {body: 'lambda result'},
                injuries: {body: 'lambda result'},
                playerStatuses: [],
                contest: '',
                playerPool: [],
                filteredPool: [],
                whiteList: [],
                blackList: []
            })
        });
    });

    describe('nhl case', () => {
        let result: any;
        const state = {
            site: 'a site',
            date: 'a date'
        };
        const sport = 'nhl';
        beforeEach(async () => {
            // @ts-ignore
            result = await handleSportChange(sport, state, setState)
        });

        it('should call getDfsData with correct params', () => {
            expect(getDfsData).toHaveBeenCalledWith('a site', 'nhl', 'a date')
        });

        const loadingTexts = [
            'a site data',
            'NHL projections',
            'NHL opponent ranks',
            'NHL injury data',
            'player history',
            'player statuses'
        ];
        it.each(loadingTexts)
        ('should call setState via updateLoadingText with correct params', (loadingText) => {
            expect(setState).toHaveBeenNthCalledWith( loadingTexts.indexOf(loadingText) + 1,
                {
                    ...INITIAL_STATE,
                    date: state.date,
                    site: state.site,
                    isLoading: true,
                    loadingText,
                    sport
                })
        });

        const lambdas = [
            process.env.REACT_APP_PROJECTIONS_LAMBDA,
            process.env.REACT_APP_OPPONENT_RANKS_LAMBDA,
            process.env.REACT_APP_INJURIES_LAMBDA
        ];
        it.each(lambdas)
        ('should call invoke lambda with correct params', (lambdaName) => {
            expect(invokeLambdaFunction).toHaveBeenNthCalledWith( lambdas.indexOf(lambdaName) + 1,
                lambdaName, {sport: 'nhl'})
        });

        it('should call rolling averages lambda with correct params', () => {
            expect(invokeLambdaFunction).toHaveBeenCalledWith(process.env.REACT_APP_ROLLING_FANTASY_AVERAGES_LAMBDA,
                {site: state.site, sport})
        });

        it('should call invoke lambda with goalie scraper', () => {
            expect(invokeLambdaFunction).toHaveBeenNthCalledWith( 5, process.env.REACT_APP_GOALIE_SCRAPER_LAMBDA)
        });

        it('should call setState with correct params at the end', () => {
            expect(setState).toHaveBeenLastCalledWith({
                ...state,
                isLoading: false,
                sport,
                dfsData,
                contests: ['dfs1', 'dfs2'],
                projectionsData: 'lambda result',
                playerHistory: {body: 'lambda result'},
                opponentRanks: {body: 'lambda result'},
                injuries: {body: 'lambda result'},
                playerStatuses: {body: 'lambda result'},
                contest: '',
                playerPool: [],
                filteredPool: [],
                whiteList: [],
                blackList: []
            })
        });
    });

    afterEach(() => {
        jest.clearAllMocks()
    })
});