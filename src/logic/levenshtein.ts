export const levenshtein = (a: string, b: string): number => {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;

    const prev = [...Array(b.length + 1).keys()];
    const curr = new Array(b.length + 1);

    for (let i = 0; i < a.length; i++) {
        curr[0] = i + 1;
        for (let j = 0; j < b.length; j++) {
            const cost = a[i] === b[j] ? 0 : 1;
            curr[j + 1] = Math.min(
                curr[j] + 1,
                prev[j + 1] + 1,
                prev[j] + cost
            );
        }
        prev.splice(0, prev.length, ...curr);
    }

    return prev[b.length];
};