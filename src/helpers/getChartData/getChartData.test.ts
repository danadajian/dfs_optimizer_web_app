import {getChartData} from './getChartData'

describe('get chart data', () => {
    let result: any;
    const fantasyData = [
        {
            theSite: 'data1',
            other: 'stuff'
        },
        {
            theSite: 'data2',
            other: 'stuff'
        }
    ];
    beforeEach(() => {
        result = getChartData('theSite', fantasyData);
    });

    it('should return the expected result', () => {
        expect(result).toEqual([
            {
                label: 'theSite Points',
                data: ['data1', 'data2'],
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
            }
        ]);
    });
});
