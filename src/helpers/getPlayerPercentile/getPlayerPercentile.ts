import {FantasyData} from "../../types";
import * as _ from 'lodash';

export const getPlayerPercentile = (actual: number, fantasyData: FantasyData[]): number => {
    const sortedPoints = _.sortBy(fantasyData.map((player: FantasyData) => player.Fanduel));
    const position = sortedPoints.indexOf(actual) + 1;
    return position / sortedPoints.length * 100
}