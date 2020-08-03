import {handleShowPerformance} from "./handleShowPerformance";
import {retrieveObjectFromS3} from "../../aws/aws";
import {DFS_PIPELINE_BUCKET_NAME, FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";

jest.mock('../../aws/aws');

const mockOptimalLineup = {
    lineup: 'optimal lineup'
};
(retrieveObjectFromS3 as jest.Mock).mockImplementation((bucketName: string) => {
    return bucketName === FANTASY_ANALYTICS_BUCKET_NAME ? 'recent fantasy data' : mockOptimalLineup
})

describe('handleShowPerformance', () => {
    let result: any;
    const sport = 'a sport';
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
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(FANTASY_ANALYTICS_BUCKET_NAME, 'a sportRecentFantasyData.json')
    });

    it('should call retrieveObjectFromS3 for pipeline bucket with correct params', () => {
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(DFS_PIPELINE_BUCKET_NAME, 'a sportOptimalLineup.json')
    });

    it('should call setState again with correct params', () => {
        expect(setState).toHaveBeenCalledWith({
            some: 'state',
            isLoading: false,
            sport,
            fantasyData: 'recent fantasy data',
            optimalLineup: 'optimal lineup'
        })
    });
})