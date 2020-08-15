import {handleSportChange} from "./handleSportChange";
import {retrieveObjectFromS3} from "../../../aws/aws";
import {FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import {getPerformanceDataByDate} from "../../../helpers/getPerformanceDataByDate/getPerformanceDataByDate";

jest.mock('../../../aws/aws');
jest.mock('../../../helpers/getPerformanceDataByDate/getPerformanceDataByDate');

const allRecentFantasyData = 'all recent fantasy data';
const allOptimalLineups = 'all optimal lineups';
(retrieveObjectFromS3 as jest.Mock).mockImplementation(async (bucketName: string, fileName: string) => {
    const resultMap: any = {
        'sportRecentFantasyData.json': allRecentFantasyData,
        'sportRecentOptimalLineups.json': allOptimalLineups,
    };
    return resultMap[fileName];
});
(getPerformanceDataByDate as jest.Mock).mockReturnValue({
    aBitOf: 'data',
    more: 'data'
});

describe('handleSportChange', () => {
    let result: any;
    const sport = 'sport';
    const state = {
        some: 'state',
        date: 'the date'
    }
    const setState = jest.fn();

    beforeEach(async () => {
        // @ts-ignore
        result = await handleSportChange(sport, state, setState)
    })

    it('should call setState initially with correct params', () => {
        expect(setState).toHaveBeenCalledWith({
            some: 'state',
            date: 'the date',
            isLoading: true,
            sport
        })
    });

    it('should call retrieveObjectFromS3 for fantasy bucket with correct params', () => {
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(FANTASY_ANALYTICS_BUCKET_NAME, 'sportRecentFantasyData.json')
    });

    it('should call retrieveObjectFromS3 for pipeline bucket with correct params', () => {
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(FANTASY_ANALYTICS_BUCKET_NAME, 'sportRecentOptimalLineups.json')
    });

    it('should call getPerformanceDataByDate with correct params', () => {
        expect(getPerformanceDataByDate).toHaveBeenCalledWith('the date', {allRecentFantasyData, allOptimalLineups})
    });

    it('should call setState again with correct params', () => {
        expect(setState).toHaveBeenCalledWith({
            some: 'state',
            date: 'the date',
            isLoading: false,
            sport,
            allRecentFantasyData,
            allOptimalLineups,
            aBitOf: 'data',
            more: 'data'
        })
    });
})