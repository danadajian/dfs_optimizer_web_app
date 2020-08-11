import {handleDateChange} from "./handleDateChange";
import {getPerformanceDataByDate} from "../../../helpers/getPerformanceDataByDate/getPerformanceDataByDate";

jest.mock('../../../helpers/getPerformanceDataByDate/getPerformanceDataByDate');

(getPerformanceDataByDate as jest.Mock).mockReturnValue({
    aBitOf: 'data',
    more: 'data'
});

describe('handleDateChange', () => {
    let result: any;
    const date = 'date';
    const state = {
        some: 'state'
    };
    const setState = jest.fn();

    beforeEach(() => {
        // @ts-ignore
        result = handleDateChange(date, state, setState)
    })

    it('should call getPerformanceDataByDate with correct params', () => {
        expect(getPerformanceDataByDate).toHaveBeenCalledWith(date, state)
    });

    it('should call setState with correct params', () => {
        expect(setState).toHaveBeenCalledWith({
            some: 'state',
            date: 'date',
            aBitOf: 'data',
            more: 'data'
        })
    });
})