import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import BootstrapTable from 'react-bootstrap-table-next';
import '../css/UpcomingContests.css'

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

    const startTimesTable = <BootstrapTable keyField='id'
                                            data={startTimes}
                                            columns={columns}
                                            classes="Player-table"
                                            headerWrapperClasses="Player-pool-grid-header"
                                            rowClasses="Player-pool-row"/>;

    const startTimesSpinner =
        <Button className="Upcoming-contests-loading" variant="light" size="lg" disabled>
            <p>Loading start times...</p>
            <Spinner
                as="span"
                animation="border"
                role="status"
                aria-hidden="true"
            />
        </Button>

    return startTimes ? startTimesTable : startTimesSpinner;
}