import {handleUpcomingContestsLoad} from "./handleUpcomingContestsLoad";
import {invokeLambdaFunction} from "../../aws/aws";

jest.mock("../../aws/aws");
jest.spyOn(window, 'alert').mockImplementation(() => jest.fn());

const setStartTimes = jest.fn();

describe('handleUpcomingContestsLoad', () => {
    describe('success case', () => {
        beforeEach(() => {
            (invokeLambdaFunction as jest.Mock).mockResolvedValue('start times');
            handleUpcomingContestsLoad(setStartTimes)
        })

        it('should call invokeLambdaFunction with correct params', () => {
            expect(invokeLambdaFunction).toHaveBeenCalledWith(process.env.REACT_APP_RETRIEVE_FROM_S3_LAMBDA, {fileName: 'startTimes.json'})
        });

        it('should call setStartTimes with correct params', () => {
            expect(setStartTimes).toHaveBeenCalledWith('start times')
        });
    })

    describe('error case', () => {
        beforeEach(() => {
            (invokeLambdaFunction as jest.Mock).mockRejectedValue(new Error());
            handleUpcomingContestsLoad(setStartTimes)
        })

        it('should call invokeLambdaFunction with correct params', () => {
            expect(invokeLambdaFunction).toHaveBeenCalledWith(process.env.REACT_APP_RETRIEVE_FROM_S3_LAMBDA, {fileName: 'startTimes.json'})
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