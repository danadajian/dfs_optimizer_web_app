import {playerIsInOptimalLineup} from "./playerIsInOptimalLineup";
import {LineupAttributes} from "../../types";

export const getLineOptions = (site: string, optimalLineup: LineupAttributes[]) => {
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
        elements: {
            point: {
                radius: (context: any) => playerIsInOptimalLineup(optimalLineup, context) ? 10 : 2,
                pointStyle: (context: any) => playerIsInOptimalLineup(optimalLineup, context) ? 'star' : 'circle',
                borderWidth: (context: any) => playerIsInOptimalLineup(optimalLineup, context) ? 3 : 1
            }
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