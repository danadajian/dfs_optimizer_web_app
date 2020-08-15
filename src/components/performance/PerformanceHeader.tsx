import {PerformanceStateProps} from "../../types";
import React from "react";

export const PerformanceHeader = (props: PerformanceStateProps) => {
    const {sport, rollingOverallPercentile, recentFantasyData} = props.state;
    const shouldRenderElement = sport && recentFantasyData;
    const element = <h3 className="Percentile-header">Rolling Overall Percentile: {rollingOverallPercentile}</h3>

    return <>{shouldRenderElement && element}</>
}