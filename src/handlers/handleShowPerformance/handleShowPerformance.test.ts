import {handleShowPerformance} from "./handleShowPerformance";
import {retrieveObjectFromS3} from "../../aws/aws";
import {FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import moment from "moment";

jest.mock('../../aws/aws');
jest.mock('moment');
jest.mock('../../helpers/formatDate/formatDate');

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
const mockPlayerPools = [
    {
        date: '2020-08-07',
        playerPool
    }
];
const mockFantasyData = [
    {
        date: '2020-08-06',
        fantasyData: 'other recent fantasy data'
    },
    {
        date: '2020-08-07',
        fantasyData: 'recent fantasy data'
    }
];
const mockOptimalLineups = [
    {
        date: '2020-08-06',
        optimalLineup: 'other optimal lineup'
    },
    {
        date: '2020-08-07',
        optimalLineup: 'optimal lineup'
    }
];
(retrieveObjectFromS3 as jest.Mock).mockImplementation(async (bucketName: string, fileName: string) => {
    const resultMap: any = {
        'sportRecentFantasyData.json': mockFantasyData,
        'sportRecentPlayerPools.json': mockPlayerPools,
        'sportRecentOptimalLineups.json': mockOptimalLineups,
    };
    return resultMap[fileName];
});
(moment as any).mockImplementation(() => {
    return {
        format: jest.fn(() => '2020-08-07')
    }
})

describe('handleShowPerformance', () => {
    let result: any;
    const sport = 'sport';
    const state = {
        some: 'state'
    }
    const setState = jest.fn();

    beforeEach(async () => {
        // @ts-ignore
        result = await handleShowPerformance(sport, state, setState)
    })

    it('should call setState initially with correct params', () => {
        expect(setState).toHaveBeenCalledWith({
            some: 'state',
            isLoading: true,
            sport
        })
    });

    it('should call retrieveObjectFromS3 for fantasy bucket with correct params', () => {
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(FANTASY_ANALYTICS_BUCKET_NAME, 'sportRecentFantasyData.json')
    });

    it('should call retrieveObjectFromS3 for pipeline bucket with correct params', () => {
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(FANTASY_ANALYTICS_BUCKET_NAME, 'sportRecentPlayerPools.json')
    });

    it('should call retrieveObjectFromS3 for pipeline bucket with correct params', () => {
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(FANTASY_ANALYTICS_BUCKET_NAME, 'sportRecentOptimalLineups.json')
    });

    it('should call setState again with correct params', () => {
        expect(setState).toHaveBeenCalledWith({
            some: 'state',
            isLoading: false,
            sport,
            allFantasyData: mockFantasyData,
            fantasyData: 'recent fantasy data',
            allPlayerPools: mockPlayerPools,
            playerPool,
            allOptimalLineups: mockOptimalLineups,
            optimalLineup: 'optimal lineup',
            positions: ['position1', 'position2']
        })
    });
})