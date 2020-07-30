import BootstrapTable from 'react-bootstrap-table-next';
import React, {useEffect, useState} from "react";
import {handleUpcomingContestsLoad} from "../handlers/handleUpcomingContestsLoad/handleUpcomingContestsLoad";

export const UpcomingContests = () => {
    const [startTimes, setStartTimes]: any = useState(undefined);

    useEffect(() => handleUpcomingContestsLoad(setStartTimes), []);

    const columns = [
        {
            dataField: 'sport',
            text: 'Sport',
            formatter: (cell: any, row: any) => <p>{row.sport.toUpperCase()}</p>
        },
        {
            dataField: 'time',
            text: 'Start'
        }
    ];

    return (
        <>
        {startTimes && <BootstrapTable keyField='id'
                                       data={startTimes}
                                       columns={columns}
                                       classes="Player-table"
                                       headerWrapperClasses="Player-pool-grid-header"
                                       rowClasses="Player-pool-row"/>}
        </>
    )
}