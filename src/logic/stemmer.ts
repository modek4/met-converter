import { PL_SUFFIXES, EN_SUFFIXES } from "../domain/suffixes";
import { buildSuffixIndex } from "./suffixIndex";

let PREFIX_INDEX: Record<string, string[]> = {};
let SUFFIX_INDEX: Record<string, string[]> = {};
const STEM_CACHE = new Map<string, string>();

SUFFIX_INDEX = {
    ...buildSuffixIndex(PL_SUFFIXES),
    ...buildSuffixIndex(EN_SUFFIXES),
};

export const initStemmer = (roots: Record<string, string>) => {
    PREFIX_INDEX = {};

    for (const root of Object.keys(roots)) {
        const key = root.slice(0, 2);
        if (!PREFIX_INDEX[key]) PREFIX_INDEX[key] = [];
        PREFIX_INDEX[key].push(root);
    }
    for (const key in PREFIX_INDEX) {
        PREFIX_INDEX[key].sort((a, b) => b.length - a.length);
    }
};

export const stemmer = (word: string): string => {
    const w = word.toLowerCase();
    if (STEM_CACHE.has(w)) return STEM_CACHE.get(w)!;
    const bucket = PREFIX_INDEX[w.slice(0, 2)];
    if (bucket) {
        for (const root of bucket) {
            if (w.startsWith(root) && w.length > root.length + 1) {
                STEM_CACHE.set(w, root);
                return root;
            }
        }
    }
    const last2 = w.slice(-2);
    const suffixBucket = SUFFIX_INDEX[last2];
    if (suffixBucket) {
        for (const end of suffixBucket) {
            if (w.endsWith(end) && w.length > end.length + 2) {
                const stem = w.slice(0, -end.length);
                STEM_CACHE.set(w, stem);
                return stem;
            }
        }
    }
    STEM_CACHE.set(w, w);
    return w;
};

export const stemmingTokens = (tokens: string[]) => tokens.map(stemmer);