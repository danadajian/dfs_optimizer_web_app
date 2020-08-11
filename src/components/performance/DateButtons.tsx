import React from "react";
import {PerformanceStateProps} from "../../types";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {handleDateChange} from "../../handlers/performance/handleDateChange/handleDateChange";
import {getNeighboringDate} from "../../helpers/getNeighboringDate/getNeighboringDate";

export const DateButtons = (props: PerformanceStateProps) => {
    const {state, setState} = props;
    const {date} = state;
    const buttonDates = [getNeighboringDate(date, 1), date, getNeighboringDate(date, -1)];

    return (
        <ButtonGroup className="mb-2" aria-label="Date buttons">
            {buttonDates.map((buttonDate: string) =>
                <Button key={buttonDate}
                        variant="secondary"
                        active={date === buttonDate}
                        value={buttonDate}
                        onClick={(event: any) =>
                            handleDateChange(event.target.value, state, setState)}>{buttonDate}</Button>)}
        </ButtonGroup>
    )
}