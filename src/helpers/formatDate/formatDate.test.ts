import { formatDate } from './formatDate'

describe('gets correct date', () => {
    const date = new Date(2019, 10, 22); // month is 1 less than expected

    it('gets correct date', () => {
        expect(formatDate(date)).toEqual('2019-11-22');
    });
});