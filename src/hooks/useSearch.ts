import { useEffect, useState } from "react";
import { finder } from "../logic/finder";
import { PreparedActivity } from "../domain/activity";
import { detectLanguage } from "../logic/language";


export const useSearch = (limit: number) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<PreparedActivity[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        let cancelled = false;

        const timeout = setTimeout(() => {
            setLoading(true);
            const language = detectLanguage(query);

            const matches = finder(query, language, limit);

            if (!cancelled) {
                setResults(matches);
                setLoading(false);
            }
        }, 200);

        return () => {
            cancelled = true;
            clearTimeout(timeout);
        };
    }, [query, limit]);

    return {
        query,
        setQuery,
        results,
        loading
    };

}