import BootstrapTable from 'react-bootstrap-table-next';
import React, {useEffect, useState} from "react";
import {retrieveObjectFromS3} from "../aws/aws";

export const UpcomingContests = () => {
    const [startTimes, setStartTimes] = useState([]);

    useEffect(() => {
        retrieveObjectFromS3('startTimes.json')
            .then(startTimes => setStartTimes(startTimes))
    });

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
        {startTimes.length > 0 && <BootstrapTable keyField='id'
                                                  data={startTimes}
                                                  columns={columns}
                                                  classes="Player-table"
                                                  headerWrapperClasses="Player-pool-grid-header"
                                                  rowClasses="Player-pool-row"/>}
        </>
    )
}