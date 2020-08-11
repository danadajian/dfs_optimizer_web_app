import {handleSiteChange} from "./handleSiteChange";
import {INITIAL_STATE} from "../../../constants";

const setState = jest.fn();

describe('handleSiteChange', () => {
    let result: any;
    const site = 'a site';
    const state = {date: 'a date'}
    beforeEach(() => {
        // @ts-ignore
        result = handleSiteChange(site, state, setState)
    })

    it('should call setState with correct params', () => {
        expect(setState).toHaveBeenCalledWith({
            ...INITIAL_STATE,
            date: 'a date',
            site,
        })
    });
});