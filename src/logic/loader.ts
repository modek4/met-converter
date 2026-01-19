import RAW_PL from "../data/pl.json";
import RAW_EN from "../data/en.json";
import { PreparedActivity } from "../domain/activity";
import { Activity, ActivityArraySchema } from "../domain/validation";
import { buildRoots } from "./roots";
import { initStemmer, stemmingTokens } from "./stemmer";
import { tokenize } from "./tokenize";

const parsedPL = ActivityArraySchema.safeParse(RAW_PL);
if (!parsedPL.success) throw new Error("Invalid PL activity data: " + parsedPL.error.message);
const parsedEN = ActivityArraySchema.safeParse(RAW_EN);
if (!parsedEN.success) throw new Error("Invalid EN activity data: " + parsedEN.error.message);

const betterRawPL = parsedPL.data.map(a => ({ ...a, id: `pl_${a.id}` }));
const betterRawEN = parsedEN.data.map(a => ({ ...a, id: `en_${a.id}` }));
const RAW_COMBINED = [...betterRawPL, ...betterRawEN];
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