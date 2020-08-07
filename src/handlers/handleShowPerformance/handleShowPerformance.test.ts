import {handleShowPerformance} from "./handleShowPerformance";
import {retrieveObjectFromS3} from "../../aws/aws";
import {DFS_PIPELINE_BUCKET_NAME, FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";

jest.mock('../../aws/aws');

const mockPlayerPool = [
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
const mockOptimalLineup = {
    lineup: 'optimal lineup'
};
(retrieveObjectFromS3 as jest.Mock).mockImplementation((bucketName: string, fileName: string) => {
    const resultMap: any = {
        'sportRecentFantasyData.json': 'recent fantasy data',
        'sportPlayerPool.json': mockPlayerPool,
        'sportOptimalLineup.json': mockOptimalLineup,
    };
    return resultMap[fileName];
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
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(DFS_PIPELINE_BUCKET_NAME, 'sportPlayerPool.json')
    });

    it('should call retrieveObjectFromS3 for pipeline bucket with correct params', () => {
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(DFS_PIPELINE_BUCKET_NAME, 'sportOptimalLineup.json')
    });

    it('should call setState again with correct params', () => {
        expect(setState).toHaveBeenCalledWith({
            some: 'state',
            isLoading: false,
            sport,
            fantasyData: 'recent fantasy data',
            playerPool: mockPlayerPool,
            optimalLineup: 'optimal lineup',
            positions: ['position1', 'position2']
        })
    });
})