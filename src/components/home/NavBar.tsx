import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from 'react-router-dom';
import {StateProps} from "../../types";
import {SiteSection} from "./SiteSection";
import {SportSection} from "./SportSection";
import {DateSection} from "./DateSection";
import {ContestSection} from "./ContestSection";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {Loading} from "./Loading";

const logo = require('../../icons/logo.ico');

export const NavBar = (props: StateProps) => {
    const {isLoading, sport, loadingText} = props.state;
    const {isDesktopView} = props;

    return <Navbar sticky="top" bg="dark" variant="dark" expand="xl" collapseOnSelect>
        <Navbar.Brand as={NavLink} to="/">
            <img alt="logo" src={logo} width="30" height="30" className="d-inline-block align-top mr-2"/>
            {' '}DFS Optimizer
        </Navbar.Brand>
        <OverlayTrigger
            placement={'auto'}
            defaultShow={!isDesktopView}
            rootClose={true}
            overlay={
                <Tooltip id={'site-tooltip'} placement={'auto'}>
                    Select a site to begin.
                </Tooltip>
            }
        >
            <Navbar.Toggle/>
        </OverlayTrigger>
        <Navbar.Collapse id="nav-bar">
            <Nav>
                <Nav.Link as={NavLink} to="/" className="text-center ml-2 mr-2 mt-1 mb-1">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/about" className="text-center ml-2 mr-2 mt-1 mb-1">About</Nav.Link>
                <Nav.Link as={NavLink} to="/performance"
                          className="text-center ml-2 mr-2 mt-1 mb-1">Performance</Nav.Link>
                <>
                    <div className="text-center">
                        <DateSection {...props}/>
                    </div>
                        <SiteSection {...props}/>
                        <SportSection {...props}/>
                    <div className="text-center">
                        {!isDesktopView && isLoading ?
                            <Loading className={'Navbar-loading'}
                                     sport={sport!}
                                     loadingText={loadingText!}/> : <ContestSection {...props}/>}
                    </div>
                </>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
};