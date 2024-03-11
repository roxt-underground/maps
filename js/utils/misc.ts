export function randId(len = 5): string {
    return Math.round(Math.random() * (2**(4*len))).toString(16)
}
