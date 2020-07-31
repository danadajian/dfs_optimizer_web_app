export const getLineOptions = (site: string) => {
    return {
        title: {
            display: true,
            text: site ? `${site} Points` : '',
            fontSize: 24,
            fontColor: "black"
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        display: false
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        suggestedMin: -5,
                        suggestedMax: 50,
                        fontColor: "black"
                    },
                    gridLines: {
                        zeroLineColor: "black",
                        color: "rgba(200, 200, 200, 0.25)"
                    }
                }
            ]
        },
        tooltips: {
            displayColors: false
        },
        responsive: true,
        maintainAspectRatio: false
    }
};