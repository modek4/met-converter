import { normalize } from "./normalize";

export const addWord = (word: string, freq: Record<string, number>) => {
    const w = normalize(word);
    if (w.length < 4) return;
    for (let len = 3; len <= 6 && len <= w.length; len++) {
        const prefix = w.slice(0, len);
        freq[prefix] = (freq[prefix] || 0) + 1;
    }
};