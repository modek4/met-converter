import { normalize } from "../logic/normalize";

export const tokenize = (text: string): string[] => {
    return normalize(text).split(/\s+/).filter(Boolean);
};