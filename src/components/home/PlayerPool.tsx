import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import '../../css/home/PlayerPool.css'
import {StateProps} from "../../types";
import {SearchBar} from "./SearchBar";
import {FilterBar} from "./FilterBar";
import {PlayerPoolGrid} from "./PlayerPoolGrid";

export const PlayerPool = (props: StateProps) => {
    return (
        <div className="Player-pool">
            <InputGroup>
                <SearchBar {...props}/>
                <InputGroup.Append>
                    <FilterBar {...props}/>
                </InputGroup.Append>
            </InputGroup>
            <PlayerPoolGrid {...props}/>
        </div>
    )
};
