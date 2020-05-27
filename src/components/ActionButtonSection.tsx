import React, {useRef} from "react";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../css/ActionButtonSection.css'
import {lineupAttributes, StateProps} from "../interfaces";
import {handleGenerateOptimalLineup} from "../handlers/handleGenerateOptimalLineup/handleGenerateOptimalLineup";
import {handleClearLineup} from "../handlers/handleClearLineup/handleClearLineup";
import {handleExportLineup} from "../handlers/handleExportLineup/handleExportLineup";
import {Lineup} from "./Lineup";
import {Optimizing} from "./Optimizing";

export const ActionButtonSection = (props: StateProps) => {
    const {isOptimizing, site, sport, contest, lineup} = props.state;
    const shouldRenderElement = sport && contest && site;
    const shouldRenderExportButton = lineup.every((player: lineupAttributes) => player.name);
    const componentRef = useRef();

    const element =
        <>
            <div className="Action-button-section">
                <Button
                    variant={"dark"}
                    onClick={() => handleGenerateOptimalLineup(props.state, props.setState)}>Optimize Lineup</Button>
                <Button
                    variant={"secondary"}
                    onClick={() => handleClearLineup(props.state, props.setState)}>Clear Lineup</Button>
                {shouldRenderExportButton &&
                <>
                    <OverlayTrigger trigger="click" rootClose={true} placement="top"
                                    overlay={<Tooltip id="clipboard-overlay">Copied to clipboard!</Tooltip>}>
                        <Button variant={"primary"}
                                onClick={() => handleExportLineup(componentRef)}>Share Lineup</Button>
                    </OverlayTrigger>
                </>}
            </div>
            <Lineup {...props} ref={componentRef}/>
        </>

    if (isOptimizing) {
        return <Optimizing sport={sport}/>
    } else {
        return <>{shouldRenderElement && element}</>
    }
};
