import React from "react";
import {PerformanceStateProps} from "../../types";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {handleDateChange} from "../../handlers/performance/handleDateChange/handleDateChange";
import moment from "moment-timezone";
import {DATE_FORMAT_STRING, EASTERN_TIME_ZONE} from "../../constants";

export const DateButtons = (props: PerformanceStateProps) => {
    const {state, setState} = props;
    const {date} = state;
    const buttonDates = [
        moment(date).tz(EASTERN_TIME_ZONE).subtract(1, 'days').format(DATE_FORMAT_STRING),
        date,
        moment(date).tz(EASTERN_TIME_ZONE).add(1, 'days').format(DATE_FORMAT_STRING)
    ];

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