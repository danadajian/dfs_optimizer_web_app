import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import {handleSiteChange} from "../handlers/handleSiteChange/handleSiteChange";
import {StateProps} from "../types";
import {SUPPORTED_SITES} from "../constants";

export const SiteSection = (props: StateProps) => {
    const shouldDisplayTooltip = !props.state.site;

    const buttonGroup = (
        <ButtonGroup className="ml-2 mr-2 mt-1 mb-1">
            {SUPPORTED_SITES.map((site: string, key: number) =>
                <Button key={key}
                        variant="outline-primary"
                        active={props.state.site === site}
                        onClick={() => handleSiteChange(site, props.state, props.setState)}>{site}</Button>)}
        </ButtonGroup>
    );

    if (shouldDisplayTooltip) {
        return (
            <OverlayTrigger
                placement={'bottom'}
                defaultShow={props.isDesktopView}
                overlay={
                    <Tooltip id={'site-tooltip'}>
                        Select a site to begin.
                    </Tooltip>
                }
            >
                {buttonGroup}
            </OverlayTrigger>
        )
    } else {
        return buttonGroup
    }
};
