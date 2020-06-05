import {calculateTimeLeft} from "./calculateTimeLeft";

describe('calculateTimeLeft', () => {
    describe('over one day to go', () => {
        let result: any;

        beforeEach(() => {
            result = calculateTimeLeft(5977200000);
        })

        it('should calculate the time left', () => {
            expect(result).toEqual({
                "days": 69,
                "hours": "04",
                "minutes": "20",
                "seconds": "00"
            })
        });
    })

    describe('less than one day to go', () => {
        let result: any;

        beforeEach(() => {
            result = calculateTimeLeft(15600000);
        })

        it('should calculate the time left', () => {
            expect(result).toEqual({
                "hours": "04",
                "minutes": "20",
                "seconds": "00"
            })
        });
    })
});