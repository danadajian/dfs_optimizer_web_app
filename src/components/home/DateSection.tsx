import React from "react";
import DatePicker from 'react-datepicker';
import {StateProps} from "../../types";
import '../../css/home/DateSection.css'
import {handleDateChange} from "../../handlers/home/handleDateChange/handleDateChange";
import moment from "moment-timezone";
import {EASTERN_TIME_ZONE} from "../../constants";

export const DateSection = (props: StateProps) =>
    <DatePicker className="Date-section text-center"
                selected={moment(props.state.date).tz(EASTERN_TIME_ZONE).toDate()}
                onChange={(newDate: Date) => handleDateChange(newDate, props.state, props.setState)}/>;
