import {isDevelopment} from "../../constants";
import moment from "moment-timezone";

export const getPastDate = (days: number): Date => {
    if (isDevelopment())
        return moment('2020-08-07').tz('America/New_York').toDate();
    return moment().tz('America/New_York').subtract(days, 'days').toDate();
}