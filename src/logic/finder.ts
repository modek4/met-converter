import { CACHE, ACTIVITIES } from "../logic/loader";
import { tokenize } from "./tokenize";
import { stemmingTokens } from "./stemmer";
import { scoringTokens } from "./scoring";
import { PreparedActivity } from "../domain/activity";
import { Lang } from "../logic/language";

export const finder = (query: string, lang: Lang = "en", limit: number = 5): PreparedActivity[] => {
    if (CACHE.has(query)) return CACHE.get(query)!;

    const qTokens = stemmingTokens(tokenize(query));

    const scored = ACTIVITIES.map((a) => {
        let score = scoringTokens(qTokens, a.tokens);
        if (a.id.startsWith(lang)) score *= 1.2;
        return { ...a, score };
    })
        .filter((a) => a.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

    CACHE.set(query, scored);
    return scored;
};