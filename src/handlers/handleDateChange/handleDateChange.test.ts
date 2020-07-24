import {handleDateChange} from "./handleDateChange";
import {handleSportChange} from "../handleSportChange/handleSportChange";

jest.mock('../handleSportChange/handleSportChange');

(handleSportChange as jest.Mock).mockImplementation(() => jest.fn())
const setState = jest.fn();

describe('handleDateChange', () => {
    describe('site and sport exist case', () => {
        let result: any;
        const state = {
            site: 'a site',
            sport: 'a sport',
            idk: 'test'
        };
        const date = 'a date'
        beforeEach(async () => {
            // @ts-ignore
            result = await handleDateChange(date, state, setState)
        })

        it('should call setState with correct params', () => {
            expect(handleSportChange).toHaveBeenCalledWith('a sport', {
                site: 'a site',
                sport: 'a sport',
                idk: 'test',
                date
            }, setState)
        });
    });

    describe('site and sport does not exist case', () => {
        let result: any;
        const state = {
            some: 'state',
            idk: 'test'
        };
        const date = 'a date'
        beforeEach(async () => {
            // @ts-ignore
            result = await handleDateChange(date, state, setState)
        })

        it('should call setState with correct params', () => {
            expect(setState).toHaveBeenCalledWith({
                some: 'state',
                idk: 'test',
                date
            })
        });
    })
});