import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import {KNAPSACK_PROBLEM_LINK} from "../../constants";
import {StateProps} from "../../types";
import {NavBar} from "../home/NavBar";

export const About = (props: StateProps) => {
    return (
        <>
            <NavBar {...props}/>
            <Jumbotron className="mt-2">
                <h1>About</h1>
                <p>
                    This Daily Fantasy Sports (DFS) lineup optimizer aims to generate a lineup of players such
                    that the lineup's total projected points are maximized, given the constraint that the
                    lineup's total salary is within the salary cap. Each player has a position, a projection,
                    and a salary, and a lineup must contain a certain number of each position. The optimization
                    problem presented here is a type of <a href={KNAPSACK_PROBLEM_LINK} target={"_blank"}
                                                           rel={"noopener noreferrer"}>knapsack problem</a>,
                    which involves picking items with weights and values optimally to fit inside a knapsack.
                </p>
                <h3>Getting Started</h3>
                <p>
                    <ol>
                        <li>Pick the date of the contest you're playing.</li>
                        <li>Select a site and sport.</li>
                        <li>Select an available contest.</li>
                        <li>Add players to your lineup to optimize around them.</li>
                        <li>Blacklist players that you don't what to appear in your lineup after optimizing.</li>
                        <li>Click "Optimize Lineup" to generate the optimal lineup!</li>
                    </ol>
                </p>
                <h3>Algorithm</h3>
                <p>
                    The DFS Optimizer uses selective brute force, which efficiently reduces the problem's scope to make
                    checking all possibilities feasible. First, players are grouped by position and sorted by their
                    salary-to-projection ratios. Then, players are removed from each position pool until the maximum
                    number of lineup combinations is under a specified fixed threshold. Finally, a recursive algorithm
                    efficiently iterates over possible lineups one by one, ensuring each new lineup it checks has the
                    potential to be better (i.e. has a higher projected point total).
                </p>
                <h3>Support</h3>
                <p>
                    The app currently supports Fanduel and Draftkings contests for the big four (MLB, NFL, NBA, NHL).
                </p>
            </Jumbotron>
        </>
    )
};