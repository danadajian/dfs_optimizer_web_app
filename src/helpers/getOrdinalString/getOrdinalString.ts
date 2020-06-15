export const getOrdinalString = (number: number) => {
    const numString = number.toString();
    const lastTwoDigitsAreBetween10And19 = numString.charAt(numString.length - 2) === '1';
    if (lastTwoDigitsAreBetween10And19) {
        return `(${number}th)`
    }
    const lastNumber = numString.slice(-1);
    return `(${number}${ordinalMap[lastNumber] || ordinalMap.other})`
};

const ordinalMap: any = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    other: 'th'
};