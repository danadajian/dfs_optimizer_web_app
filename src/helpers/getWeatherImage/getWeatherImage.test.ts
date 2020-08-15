import {getWeatherImage} from "./getWeatherImage";

const sunny = require("../../icons/sunny.ico") as any;

describe('getWeatherImage', () => {
    describe('weather exists case', () => {
        let result: any;

        beforeEach(() => {
            result = getWeatherImage('Sunny')
        })

        it('should return expected result', () => {
            expect(result).toEqual(sunny)
        });
    })

    describe('weather does not exist case', () => {
        let result: any;

        beforeEach(() => {
            result = getWeatherImage(undefined)
        })

        it('should return expected result', () => {
            expect(result).toEqual(undefined)
        });
    })
})