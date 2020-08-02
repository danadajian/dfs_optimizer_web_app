import {invokeLambdaFunction, retrieveObjectFromS3} from './aws'
import {Lambda, S3} from "../aws";
import {isDevelopment} from "../constants";

jest.mock('../aws');
jest.mock('../constants');

(isDevelopment as jest.Mock).mockReturnValue(false);

(Lambda.invoke as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn(() => {
            return {
                Payload: Buffer.from(JSON.stringify({some: 'stuff'}))
            }
        })
    }
});

(S3.getObject as jest.Mock).mockImplementation(() => {
    return {
        promise: jest.fn(() => {
            return {
                Body: Buffer.from(JSON.stringify({some: 'stuff'}))
            }
        })
    }
});

describe('aws', () => {
    describe('invokeLambdaFunction', () => {
        let result: any;
        beforeEach(async () => {
            result = await invokeLambdaFunction('function name', {some: 'payload'});
        });

        it("calls lambda invoke with correct params", () => {
            const params = {
                FunctionName: 'function name',
                Payload: JSON.stringify({some: 'payload'})
            };
            expect(Lambda.invoke).toHaveBeenCalledWith(params);
        });

        it('should return the expected result', () => {
            expect(result).toEqual({some: 'stuff'})
        });
    });

    describe('retrieveObjectFromS3', () => {
        let result: any;
        beforeEach(async () => {
            result = await retrieveObjectFromS3('bucket', 'file name');
        });

        it("calls retrieveObjectFromS3 with correct params", () => {
            const params = {
                Bucket: 'bucket',
                Key: 'file name'
            };
            expect(S3.getObject).toHaveBeenCalledWith(params);
        });

        it('should return the expected result', () => {
            expect(result).toEqual({some: 'stuff'})
        });
    });
})