import { PreparedActivity } from "../domain/activity";
import { Activity, ActivityArraySchema } from "../domain/validation";
import { buildRoots } from "./roots";
import { initStemmer, stemmingTokens } from "./stemmer";
import { tokenize } from "./tokenize";

export const language = {
    en: true,
    pl: true,
}

async function loadJsonSafe<T>(path: string): Promise<T | null> {
    try {
        const mod = await import(`../data/${path}.json`);
        return mod.default as T;
    } catch (e) {
        console.warn(`${e}`);
        language[path as keyof typeof language] = false;
        return null;
    }
}

const safeParseActivities = (raw: unknown): Activity[] => {
    if (!raw) return [];
    const parsed = ActivityArraySchema.safeParse(raw);
    return parsed.success ? parsed.data : [];
}

const RAW_PL = await loadJsonSafe("pl");
const RAW_EN = await loadJsonSafe("en");
const plData = safeParseActivities(RAW_PL).map(a => ({ ...a, id: `pl_${a.id}` }));
const enData = safeParseActivities(RAW_EN).map(a => ({ ...a, id: `en_${a.id}` }));
const RAW_COMBINED = [...plData, ...enData];
const ROOTS = buildRoots(RAW_COMBINED as Activity[]);

initStemmer(ROOTS);

export const CACHE = new Map<string, PreparedActivity[]>();

export const ACTIVITIES: PreparedActivity[] = RAW_COMBINED.flatMap((a) => {
    const tokens = [
        ...stemmingTokens(tokenize(a.name)),
        ...a.aliases.flatMap(alias => stemmingTokens(tokenize(alias))),
        ...a.keywords.flatMap(k => stemmingTokens(tokenize(k))),
    ];

    return { ...a, tokens };
});