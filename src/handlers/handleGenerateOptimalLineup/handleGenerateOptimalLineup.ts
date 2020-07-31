import {invokeLambdaFunction} from "../../aws/aws";
import {LineupAttributes, State} from "../../types";
import {MAX_COMBINATIONS} from "../../constants";

export const handleGenerateOptimalLineup = async (state: State, setState: (state: State) => void) => {
    setState({
        ...state,
        isOptimizing: true,
        maxCombinations: MAX_COMBINATIONS
    });
    let newLineup;
    let optimalPlayerIds = await invokeLambdaFunction(process.env.REACT_APP_OPTIMAL_LINEUP_LAMBDA, state);
    if (!optimalPlayerIds || optimalPlayerIds.length === 0) {
        alert('Failed to generate optimal lineup.')
    } else if (optimalPlayerIds['errorMessage']) {
        alert('An error occurred.\n' +
            optimalPlayerIds.errorType + '\n' +
            optimalPlayerIds.errorMessage + '\n' +
            optimalPlayerIds.stackTrace.slice(0, 7));
    } else {
        newLineup = optimalPlayerIds.map((playerId: number) => {
            return state.playerPool!.find((player: any) => player.playerId === playerId)
        });
        newLineup.forEach((player: LineupAttributes, lineupIndex: number) => {
            player.lineupIndex = lineupIndex;
            player.displayPosition = state.displayMatrix![lineupIndex];
        });
    }
    setState({
        ...state,
        isOptimizing: false,
        lineup: newLineup || []
    })
};