import {PerformanceState} from "../../../types";
import {getPerformanceDataByDate} from "../../../helpers/getPerformanceDataByDate/getPerformanceDataByDate";

export const handleDateChange = (date: Date, state: PerformanceState, setState: (state: PerformanceState) => void) => {
    setState({
        ...state,
        date,
        ...getPerformanceDataByDate(date, state)
    })
}