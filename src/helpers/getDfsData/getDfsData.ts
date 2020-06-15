import {invokeLambdaFunction} from "../../aws/aws";
import {formatDate} from "../formatDate/formatDate";

export const getDfsData = async (site: string, sport: string, date: Date) => {
    if (site === 'Fanduel') {
        const fanduelData = await invokeLambdaFunction(process.env.REACT_APP_FANDUEL_LAMBDA, {date: formatDate(date)});
        return fanduelData.filter((contest: any) => contest.sport === sport.toUpperCase());
    } else {
        return await invokeLambdaFunction(process.env.REACT_APP_DRAFTKINGS_LAMBDA, {sport});
    }
};