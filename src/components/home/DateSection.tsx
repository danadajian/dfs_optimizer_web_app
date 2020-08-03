import React from "react";
import DatePicker from 'react-datepicker';
import {StateProps} from "../../types";
import '../../css/home/DateSection.css'
import {handleDateChange} from "../../handlers/handleDateChange/handleDateChange";

export const DateSection = (props: StateProps) =>
    <DatePicker className="Date-section text-center"
                selected={props.state.date}
                onChange={(newDate: any) => handleDateChange(newDate, props.state, props.setState)}/>;
