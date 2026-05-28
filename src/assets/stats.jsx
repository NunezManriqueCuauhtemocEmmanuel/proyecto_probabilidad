export function empiricalStats(data) {

    const n = data.length

    if (n === 0) {
        return {
            mean: 0,
            variance: 0,
            std: 0
        }
    }

    const mean =
        data.reduce((a, b) => a + b, 0) / n

    const variance =
        data.reduce(
            (a, b) => a + (b - mean) ** 2,
            0
        ) / n

    const std = Math.sqrt(variance)

    return {
        mean: +mean.toFixed(6),
        variance: +variance.toFixed(6),
        std: +std.toFixed(6)
    }
}