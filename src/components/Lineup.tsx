import React from 'react';
import {StateProps} from "../types";
import {LineupGrid} from "./LineupGrid";

export const Lineup = React.forwardRef((props: StateProps, ref: any) =>
    <div ref={ref}>
        <LineupGrid {...props}/>
    </div>
);
