import {playerIsInOptimalLineup} from "./playerIsInOptimalLineup";

describe('playerIsInOptimalLineup', () => {
    const optimalLineup = [
        {
            playerId: 1
        },
        {
            playerId: 2
        }
    ];
    describe('true case', () => {
        let result: any;
        const context = {
            dataset: {
                playerIds: [1, 2]
            },
            dataIndex: 1
        }

        beforeEach(() => {
            // @ts-ignore
            result = playerIsInOptimalLineup(optimalLineup, context)
        })

        it('should return expected result', () => {
            expect(result).toBe(true)
        });
    })

    describe('false case', () => {
        let result: any;
        const context = {
            dataset: {
                playerIds: [69, 1]
            },
            dataIndex: 0
        }

        beforeEach(() => {
            // @ts-ignore
            result = playerIsInOptimalLineup(optimalLineup, context)
        })

        it('should return expected result', () => {
            expect(result).toBe(false)
        });
    })
})