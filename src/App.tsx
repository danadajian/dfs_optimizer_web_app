import React, {useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './env'
import {Home} from "./components/home/Home";
import {About} from "./components/about/About";
import {Performance} from "./components/performance/Performance";
import ScrollToTop from "./components/ScrollToTop";
import {DESKTOP_VIEW_THRESHOLD, INITIAL_STATE} from "./constants";

const App = () => {
    const [state, setState] = useState(INITIAL_STATE);
    const isDesktopView = window.innerWidth > DESKTOP_VIEW_THRESHOLD;

    return (
        <BrowserRouter>
            <ScrollToTop>
                <Switch>
                    <Route path="/" render={() => <Home state={state} setState={setState} isDesktopView={isDesktopView}
                                                        isHome={true}/>} exact/>
                    <Route path="/about"
                           render={() => <About state={state} setState={setState} isDesktopView={isDesktopView}/>}/>
                    <Route path="/performance"
                           render={() => <Performance state={state} setState={setState} isDesktopView={isDesktopView}
                                                      isHome={false}/>}/>
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default App;
