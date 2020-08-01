import {playerIsInOptimalLineup} from "./playerIsInOptimalLineup";

describe('playerIsInOptimalLineup', () => {
    const optimalLineup = {
        lineup: [
            {
                name: 'player1'
            },
            {
                name: 'player2'
            }
        ]
    };
    describe('true case', () => {
        let result: any;
        const context = {
            chart: {
                data: {
                    labels: [
                        'player69',
                        'player1'
                    ]
                }
            },
            dataIndex: 1
        }

        beforeEach(() => {
            result = playerIsInOptimalLineup(optimalLineup, context)
        })

        it('should return expected result', () => {
            expect(result).toBe(true)
        });
    })

    describe('false case', () => {
        let result: any;
        const context = {
            chart: {
                data: {
                    labels: [
                        'player69',
                        'player1'
                    ]
                }
            },
            dataIndex: 0
        }

        beforeEach(() => {
            result = playerIsInOptimalLineup(optimalLineup, context)
        })

        it('should return expected result', () => {
            expect(result).toBe(false)
        });
    })
})