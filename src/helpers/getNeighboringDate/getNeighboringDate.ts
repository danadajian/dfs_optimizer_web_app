import moment from "moment-timezone";

export const getNeighboringDate = (date: string, days: number): string => {
    return moment(date).tz('America/New_York').subtract(days, 'days').format('YYYY-MM-DD');
}