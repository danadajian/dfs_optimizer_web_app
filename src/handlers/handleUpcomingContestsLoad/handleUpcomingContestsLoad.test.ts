import {handleUpcomingContestsLoad} from "./handleUpcomingContestsLoad";
import {retrieveObjectFromS3} from "../../aws/aws";
import {DFS_PIPELINE_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";

jest.mock("../../aws/aws");
jest.spyOn(window, 'alert').mockImplementation(() => jest.fn());

const setStartTimes = jest.fn();

describe('handleUpcomingContestsLoad', () => {
    describe('success case', () => {
        beforeEach(() => {
            (retrieveObjectFromS3 as jest.Mock).mockResolvedValue('start times');
            handleUpcomingContestsLoad(setStartTimes)
        })

        it('should call retrieveObjectFromS3 with correct params', () => {
            expect(retrieveObjectFromS3).toHaveBeenCalledWith(DFS_PIPELINE_BUCKET_NAME, 'startTimes.json')
        });

        it('should call setStartTimes with correct params', () => {
            expect(setStartTimes).toHaveBeenCalledWith('start times')
        });
    })

    describe('error case', () => {
        beforeEach(() => {
            (retrieveObjectFromS3 as jest.Mock).mockRejectedValue(new Error());
            handleUpcomingContestsLoad(setStartTimes)
        })

        it('should call retrieveObjectFromS3 with correct params', () => {
            expect(retrieveObjectFromS3).toHaveBeenCalledWith(DFS_PIPELINE_BUCKET_NAME, 'startTimes.json')
        });

        it('should not call setStartTimes', () => {
            expect(setStartTimes).not.toHaveBeenCalled()
        });

        it('should call alert with correct params', () => {
            expect(window.alert).toHaveBeenCalledWith('Failed to retrieve start times.');
        });
    })

    afterEach(() => jest.clearAllMocks())
})