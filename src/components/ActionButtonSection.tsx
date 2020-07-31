import React, {useRef} from "react";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import '../css/ActionButtonSection.css'
import {LineupAttributes, StateProps} from "../types";
import {handleGenerateOptimalLineup} from "../handlers/handleGenerateOptimalLineup/handleGenerateOptimalLineup";
import {handleClearLineup} from "../handlers/handleClearLineup/handleClearLineup";
import {handleExportLineup} from "../handlers/handleExportLineup/handleExportLineup";
import {Lineup} from "./Lineup";
import {Optimizing} from "./Optimizing";
import {BlackList} from "./BlackList";

export const ActionButtonSection = (props: StateProps) => {
    const {isOptimizing, site, sport, contest, lineup, blackList, playerPool} = props.state;
    const shouldRenderElement = sport && contest && site;
    const shouldRenderExportButton = lineup!.every((player: LineupAttributes) => player.name);
    const shouldRenderBlacklistButton = blackList!.length > 0;
    const componentRef = useRef();

    const blackListPopover = (
        <Popover id="blacklist-popover">
            <Popover.Content className="Blacklist-popover">
                <BlackList blackList={blackList!} playerPool={playerPool!}/>
            </Popover.Content>
        </Popover>
    );

    const element =
        <>
            <div className="Action-button-section">
                <Button
                    variant={"dark"}
                    onClick={() => handleGenerateOptimalLineup(props.state, props.setState)}>Optimize Lineup</Button>
                <Button
                    variant={"secondary"}
                    onClick={() => handleClearLineup(props.state, props.setState)}>Clear Lineup</Button>
                {shouldRenderBlacklistButton &&
                <OverlayTrigger trigger="click" rootClose={true} placement="bottom" overlay={blackListPopover}>
                    <Button variant="danger">Show Blacklist</Button>
                </OverlayTrigger>
                }
                {shouldRenderExportButton &&
                <OverlayTrigger trigger="click" rootClose={true} placement="top"
                                overlay={<Tooltip id="clipboard-overlay">Copied to clipboard!</Tooltip>}>
                    <Button variant={"primary"}
                            onClick={() => handleExportLineup(componentRef)}>Share Lineup</Button>
                </OverlayTrigger>
                }
            </div>
            <Lineup {...props} ref={componentRef}/>
        </>;

    if (isOptimizing) {
        return <Optimizing sport={sport!}/>
    } else {
        return <>{shouldRenderElement && element}</>
    }
};
