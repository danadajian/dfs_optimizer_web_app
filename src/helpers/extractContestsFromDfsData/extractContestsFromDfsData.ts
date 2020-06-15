export const extractContestsFromDfsData = (dataArray: any[], site: string, date: Date) => {
    if (site === 'Fanduel')
        return dataArray.map(contestJson => contestJson.contest);
    else {
        return dataArray
            .filter((contestJson: any) => {
                const contestName = contestJson.contest;
                const contestNameWords = contestName.split(' ');
                const contestDate = contestNameWords[contestNameWords.length - 1].slice(1, -1);
                const month = parseInt(contestDate.split('/')[0]);
                const day = parseInt(contestDate.split('/')[1]);
                return date.getMonth() + 1 === month && date.getDate() === day;
            })
            .map(contestJson => contestJson.contest);
    }
};