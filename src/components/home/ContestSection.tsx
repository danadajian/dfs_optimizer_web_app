import React from "react";
import Button from 'react-bootstrap/Button'
import NavDropdown from "react-bootstrap/NavDropdown";
import {StateProps} from "../../types";
import {handleContestChange} from "../../handlers/home/handleContestChange/handleContestChange";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export const ContestSection = (props: StateProps) => {
    const {isLoading, site, sport, contest, contests} = props.state;
    const shouldRenderElement = !isLoading && site && sport;
    const shouldDisplayTooltip = shouldRenderElement && !contest;

    const dropdown =
        <NavDropdown id="contest-dropdown"
                     className="mt-1 ml-2"
                     title="Contests"
                     onSelect={(eventKey: any) => handleContestChange(eventKey, props.state, props.setState)}>
            {contests!.map(
                contestName =>
                    <NavDropdown.Item
                        className="text-center"
                        key={contestName}
                        eventKey={contestName}
                        active={contest === contestName}>
                        {contestName}
                    </NavDropdown.Item>
            )}
        </NavDropdown>;

    if (!shouldRenderElement) {
        return null
    } else if (contests!.length === 0) {
        return <Button className="ml-2 mr-2 mt-1 mb-1"
                       disabled variant={"outline-light"}>No contests are available.</Button>
    } else {
        return shouldDisplayTooltip ? overlayTooltip(dropdown) : dropdown
    }
};

const overlayTooltip = (contestObject: any) => {
    const isDesktopView = window.innerWidth > 1200;

    return (
        <OverlayTrigger
            placement={isDesktopView ? 'right' : 'bottom'}
            defaultShow
            rootClose={true}
            overlay={
                <Tooltip id={'contest-tooltip'}>
                    Select a contest.
                </Tooltip>
            }
        >
            {contestObject}
        </OverlayTrigger>
    )
};
