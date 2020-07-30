import React from "react";
import '../css/Home.css'
import {NavBar} from "./NavBar";
import Jumbotron from "react-bootstrap/Jumbotron";
import {GridSection} from "./GridSection";
import {StateProps} from "../types";
import {Loading} from "./Loading";
import {UpcomingContests} from "./UpcomingContests";

export const Home = (props: StateProps) => {
    const {isLoading, sport, loadingText, contest} = props.state;

    const isDesktopView = window.innerWidth > 1200;
    let backgroundElement;

    if (isDesktopView && isLoading) {
        backgroundElement =
            <>
                <Loading sport={sport} loadingText={loadingText} className="Home-loading"/>
                <div className="sliding-background-transparent"/>
            </>
    } else {
        backgroundElement = <div className="sliding-background"/>
    }

    return (
        <>
            <NavBar state={props.state} setState={props.setState} isDesktopView={isDesktopView}/>
            <Jumbotron>
                {!contest &&
                <>
                    <div className="home-top">
                        <span className="site-heading">
                            <h1>DFS Optimizer</h1>
                            <p>
                                A better way to find the winning lineup.
                            </p>
                        </span>
                        <UpcomingContests/>
                    </div>
                    <div className="wrapper">
                        {backgroundElement}
                    </div>
                </>}
                <GridSection {...props}/>
            </Jumbotron>
        </>
    );
};