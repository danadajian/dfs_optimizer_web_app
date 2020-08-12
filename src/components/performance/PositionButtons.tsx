import {PerformanceStateProps} from "../../types";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import React from "react";

export const PositionButtons = (props: PerformanceStateProps) => {
    const {state, setState} = props;
    const {position, positions, fantasyData} = state;

    const togglePosition = (event: any) => {
        setState({
            ...state,
            position: event.target.value
        });
    };

    return (
        <ButtonGroup className="Position-buttons mt-2" aria-label="Position buttons">
            {positions && positions.length > 0 && fantasyData &&
            <Button key={'All'}
                    value={undefined}
                    variant="info"
                    active={!position}
                    onClick={togglePosition}>All</Button>}
            {positions?.map((currentPosition: string) =>
                <Button key={currentPosition}
                        value={currentPosition}
                        variant="info"
                        active={currentPosition === position}
                        onClick={togglePosition}>{currentPosition}</Button>)
            }
        </ButtonGroup>
    )
}