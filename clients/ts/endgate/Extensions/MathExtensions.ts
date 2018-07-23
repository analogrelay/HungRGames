export function MathRoundTo(val: number, decimals: number): number {
    var multiplier = Math.pow(10, decimals);

    return Math.round(val * multiplier) / multiplier;
};