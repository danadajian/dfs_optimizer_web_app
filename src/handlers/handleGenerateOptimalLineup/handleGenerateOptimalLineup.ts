import {invokeLambdaFunction} from "../../aws/aws";
import {LineupAttributes, State} from "../../types";
import {MAX_COMBINATIONS} from "../../constants";

export const handleGenerateOptimalLineup = async (state: State, setState: (state: State) => void) => {
    return Promise.resolve(setState({
        ...state,
        isOptimizing: true,
        maxCombinations: MAX_COMBINATIONS
    })).then(() => {
        return invokeLambdaFunction(process.env.REACT_APP_OPTIMAL_LINEUP_LAMBDA, state);
    }).then(optimalPlayerIds => {
        if (!optimalPlayerIds || optimalPlayerIds.length === 0) {
            alert('Failed to generate optimal lineup.')
        } else if (optimalPlayerIds['errorMessage']) {
            alert(`An error occurred.\n${optimalPlayerIds.errorType}\n${optimalPlayerIds.errorMessage}\n${optimalPlayerIds.stackTrace.slice(0, 7)}`);
        } else {
            const optimalPlayers = optimalPlayerIds.map((playerId: number) => {
                return state.playerPool!.find((player: any) => player.playerId === playerId)
            });
            return optimalPlayers.map((player: LineupAttributes, lineupIndex: number) => ({
                ...player,
                lineupIndex,
                displayPosition: state.displayMatrix![lineupIndex]
            }))
        }
    }).then((lineup: LineupAttributes[] = []) => {
        setState({
            ...state,
            isOptimizing: false,
            lineup
        })
    })
};