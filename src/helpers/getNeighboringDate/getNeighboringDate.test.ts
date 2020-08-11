import {getNeighboringDate} from "./getNeighboringDate";
import * as moment from "moment-timezone";

jest.mock('moment-timezone');

const subtract = jest.fn(() => ({
    format: jest.fn(() => 'neighboring date')
}));
const tz = jest.fn(() => ({
    subtract
}));
(moment as any).mockImplementation(() => ({
    tz
}));

describe('getDateYesterday', () => {
    let result: any;
    const date = 'date';

    beforeEach(() => {
        result = getNeighboringDate(date, 69)
    });

    it('should call moment with correct params', () => {
        expect(moment).toHaveBeenCalledWith(date)
    });

    it('should call tz with correct params', () => {
        expect(tz).toHaveBeenCalledWith('America/New_York')
    });

    it('should call subtract with correct params', () => {
        expect(subtract).toHaveBeenCalledWith(69, 'days')
    });

    it('should return expected result', () => {
        expect(result).toEqual('neighboring date')
    });
})