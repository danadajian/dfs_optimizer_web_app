import {State} from "../../../types";
import {handleSportChange} from "../handleSportChange/handleSportChange";
import moment from "moment-timezone";
import {DATE_FORMAT_STRING, EASTERN_TIME_ZONE} from "../../../constants";

export const handleDateChange = async (newDate: Date, state: State, setState: (state: State) => void) => {
    const date = moment(newDate).tz(EASTERN_TIME_ZONE).format(DATE_FORMAT_STRING);
    if (state.site && state.sport)
        return handleSportChange(state.sport, {...state, date}, setState)
    else
        setState({
            ...state,
            date
        })
};