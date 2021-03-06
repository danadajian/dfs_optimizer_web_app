import {DFS_PIPELINE_BUCKET_NAME, StartTime} from "@dadajian/shared-fantasy-constants";
import {retrieveObjectFromS3} from "../../../aws/aws";

export const handleUpcomingContestsLoad = (setStartTimes: (startTimes: StartTime[]) => void): void => {
    retrieveObjectFromS3(DFS_PIPELINE_BUCKET_NAME, 'startTimes.json')
        .then((startTimes: StartTime[]) => setStartTimes(startTimes))
        .catch(() => alert('Failed to retrieve start times.'))
}