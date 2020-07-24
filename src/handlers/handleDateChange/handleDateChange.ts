import {State} from "../../types";
import {handleSportChange} from "../handleSportChange/handleSportChange";

export const handleDateChange = async (date: Date, state: State, setState: (state: State) => void) => {
    if (state.site && state.sport)
        await handleSportChange(state.sport, {...state, date}, setState)
    else
        setState({
            ...state,
            date
        })
};