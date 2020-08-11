import {isDevelopment} from "../../constants";
import {getPastDate} from "./getPastDate";
import * as moment from "moment-timezone";

jest.mock('moment-timezone');
jest.mock('../../constants');

(isDevelopment as jest.Mock).mockReturnValue(false);

const subtract = jest.fn(() => ({
    toDate: jest.fn(() => 'past date')
}));
(moment as any).mockImplementation(() => ({
    tz: jest.fn(() => ({
        subtract
    }))
}));

describe('getDateYesterday', () => {
    let result: any;

    beforeEach(() => {
        result = getPastDate(69)
    });

    it('should call subtract with correct params', () => {
        expect(subtract).toHaveBeenCalledWith(69, 'days')
    });

    it('should return expected result', () => {
        expect(result).toEqual('past date')
    });
})