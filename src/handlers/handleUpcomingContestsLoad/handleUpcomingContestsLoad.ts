import {invokeLambdaFunction} from "../../aws/aws";
import {StartTime} from "../../types";

export const handleUpcomingContestsLoad = (setStartTimes: (startTimes: StartTime[]) => void): void => {
    invokeLambdaFunction(process.env.REACT_APP_RETRIEVE_FROM_S3_LAMBDA, {fileName: 'startTimes.json'})
        .then(startTimes => setStartTimes(startTimes))
        .catch(() => alert('Failed to retrieve start times.'))
}