export function createHistogram(
    sample,
    min,
    max,
    numBins
) {

    const binWidth = (max - min) / numBins

    const bins = new Array(numBins).fill(0)

    sample.forEach((x) => {

        const idx = Math.min(
            Math.max(
                Math.floor((x - min) / binWidth),
                0
            ),
            numBins - 1
        )

        bins[idx]++
    })

    const labels = bins.map(
        (_, i) =>
            +(min + (i + 0.5) * binWidth).toFixed(4)
    )

    const density = bins.map(
        (count) =>
            +(count / (sample.length * binWidth)).toFixed(6)
    )

    return {
        labels,
        density
    }
}