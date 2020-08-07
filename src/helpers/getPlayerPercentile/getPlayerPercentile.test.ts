import {getPlayerPercentile} from "./getPlayerPercentile";

describe('getPlayerPercentile', () => {
    let result: any;
    const actual = 27;
    const fantasyData = [
        {
            playerId: 1,
            Fanduel: 21
        },
        {
            playerId: 2,
            Fanduel: 29
        },
        {
            playerId: 3,
            Fanduel: 8.7
        },
        {
            playerId: 4,
            Fanduel: 77
        },
        {
            playerId: 5,
            Fanduel: 27
        }
    ];

    beforeEach(() => {
        // @ts-ignore
        result = getPlayerPercentile(actual, fantasyData)
    })

    it('should return expected result', () => {
        expect(result).toEqual(60)
    });

})