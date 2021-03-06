import React from "react";
import '../../css/home/GridSection.css'
import {PlayerPool} from "./PlayerPool";
import {StateProps} from "../../types";
import {ActionButtonSection} from "./ActionButtonSection";

export const GridSection: any = (props: StateProps) => {
    const {site, sport, contest} = props.state;
    const shouldRenderElement = site && sport && contest;

    const element =
        <div className="Grid-section">
            <span>
                <ActionButtonSection {...props}/>
            </span>
            <PlayerPool {...props}/>
        </div>;

    return <>{shouldRenderElement && element}</>
};