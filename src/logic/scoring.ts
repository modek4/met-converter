import { levenshtein } from "./levenshtein";

export const scoringTokens = (qTokens: string[], tTokens: string[]): number => {
    let score = 0;
    for (const q of qTokens) {
        for (const t of tTokens) {
            if (q === t) {
                score += 3;
                continue;
            }
            const dist = levenshtein(q, t);
            if (dist === 1) score += 1.5;
            else if (dist === 2) score += 0.5;
        }
    }
    return score;
};