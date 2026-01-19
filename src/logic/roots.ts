import { tokenize } from "./tokenize";
import { Activity } from "../domain/validation";
import { addWord } from "../logic/addWord";

export const buildRoots = (activities: Activity[]) => {
    const freq: Record<string, number> = {};
    for (const a of activities) {
        tokenize(a.name).forEach(word => addWord(word, freq));
        a.aliases?.forEach(alias => tokenize(alias).forEach(word => addWord(word, freq)));
        a.keywords?.forEach(k => tokenize(k).forEach(word => addWord(word, freq)));
    }
    const roots: Record<string, string> = {};
    for (const [prefix, count] of Object.entries(freq)) {
        if (count >= 5) roots[prefix] = prefix;
    }
    return roots;
};

