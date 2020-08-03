import {SUPPORTED_SPORTS} from "@dadajian/shared-fantasy-constants";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {handleShowPerformance} from "../../handlers/handleShowPerformance/handleShowPerformance";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import React from "react";
import {PerformanceStateProps} from "../../types";

export const SportButtons = (props: PerformanceStateProps) => {
    const {state, setState} = props;
    const {isLoading, sport} = state;

    return (
        <ButtonGroup className="mt-3 mb-3" aria-label="Sport buttons">
            {SUPPORTED_SPORTS.map((supportedSport: string) =>
                isLoading && sport === supportedSport ?
                    <Button key={supportedSport} variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            key={supportedSport}
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </Button> : <Button key={supportedSport}
                                        value={supportedSport}
                                        active={sport === supportedSport}
                                        onClick={(event: any) =>
                                            handleShowPerformance(event.target.value, state, setState)}>
                        {supportedSport.toUpperCase()}</Button>)
            }
        </ButtonGroup>
    )
}