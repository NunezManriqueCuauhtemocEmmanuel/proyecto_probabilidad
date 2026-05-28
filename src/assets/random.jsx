export function rand() {
    return Math.random()
}

export function normalRandom() {

    const u1 = 1 - rand()
    const u2 = rand()

    return (
        Math.sqrt(-2 * Math.log(u1)) *
        Math.cos(2 * Math.PI * u2)
    )
}

export function exponentialRandom(lambda) {
    return -Math.log(1 - rand()) / lambda
}