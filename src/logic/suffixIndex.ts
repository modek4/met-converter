export const buildSuffixIndex = (suffixes: string[]) => {
    const index: Record<string, string[]> = {};
    for (const s of suffixes) {
        const key = s.slice(-2);
        if (!index[key]) index[key] = [];
        index[key].push(s);
    }
    return index;
};