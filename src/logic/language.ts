import { PL_SUFFIXES, EN_SUFFIXES, POLISH_COMMON, ENGLISH_COMMON, POLISH_CHARS } from "../domain/suffixes";

export type Lang = "pl" | "en" | "?";

export const detectLanguage = (text: string): Lang => {
    const t = text.toLowerCase().trim();
    if (!t) return "en";
    let scorePL = 0;
    let scoreEN = 0;
    if (POLISH_CHARS.test(t)) scorePL += 3;
    for (const suf of PL_SUFFIXES) {
        if (t.endsWith(suf)) scorePL += 1;
    }
    for (const suf of EN_SUFFIXES) {
        if (t.endsWith(suf)) scoreEN += 1;
    }
    for (const w of POLISH_COMMON) {
        if (t.includes(w)) scorePL += 2;
    }
    for (const w of ENGLISH_COMMON) {
        if (t.includes(w)) scoreEN += 2;
    }
    const tokens = t.split(/\s+/);
    for (const tok of tokens) {
        if (POLISH_CHARS.test(tok)) scorePL += 1;
        if (EN_SUFFIXES.some(s => tok.endsWith(s))) scoreEN += 1;
    }
    if (scorePL === 0 && scoreEN === 0) return "en";
    if (scorePL > scoreEN) return "pl";
    if (scoreEN > scorePL) return "en";
    return "en";
};