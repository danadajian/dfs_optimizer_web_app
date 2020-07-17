import {INITIAL_STATE} from "../../constants";
import {State} from "../../interfaces";

export const handleSiteChange = (site: string, state: State, setState: (state: State) => void) => {
    const {date} = state;
    setState({
        ...INITIAL_STATE,
        date,
        site,
    });
};