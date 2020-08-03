import {PerformanceStateProps} from "../../types";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import React from "react";
import {SUPPORTED_SITES} from "../../constants";

export const SiteButtons = (props: PerformanceStateProps) => {
    const {state, setState} = props;
    const {site} = state;

    const toggleSite = (event: any) => {
        setState({
            ...state,
            site: event.target.value
        });
    };

    return (
        <ButtonGroup className="mt-1" aria-label="Site buttons">
            {SUPPORTED_SITES.map((supportedSite: string) =>
                <Button key={supportedSite}
                        value={supportedSite}
                        variant="info"
                        active={site === supportedSite}
                        onClick={toggleSite}>{supportedSite}</Button>)
            }
        </ButtonGroup>
    )
}