import {invokeLambdaFunction} from "../../aws/aws";
import {formatDate} from "../formatDate/formatDate";

export const getDfsData = async (site: string, sport: string, date: Date) => {
    if (site === 'Fanduel') {
        return await invokeLambdaFunction(process.env.REACT_APP_FANDUEL_LAMBDA, {date: formatDate(date)});
    } else {
        return await invokeLambdaFunction(process.env.REACT_APP_DRAFTKINGS_LAMBDA, {sport});
    }
};