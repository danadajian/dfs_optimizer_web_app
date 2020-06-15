export const sumAttribute = (lineup: any[], attribute: string) => {
    let attributeArray = lineup.map(player => Number(player[attribute] || 0));
    return attributeArray.reduce((a: number, b: number) => a + b, 0);
};