import { IntensityLevel, MetEntry } from './types';
import { CONFIG } from './config';

/**
 * Determines the intensity level of an activity based on its MET (Metabolic Equivalent of Task) value.
 *
 * @param met - The MET value representing the metabolic intensity of an activity. Should be a non-negative number.
 * @returns An {@link IntensityLevel} string representing the intensity category:
 *   - 'unknown' if met <= 0 or met >= 15.0
 *   - 'sedentary' if 0 < met < 1.5
 *   - 'light' if 1.5 <= met < 3.0
 *   - 'moderate' if 3.0 <= met < 6.0
 *   - 'vigorous' if 6.0 <= met < 9.0
 *   - 'very vigorous' if 9.0 <= met < 12.0
 *   - 'extreme' if 12.0 <= met < 15.0
 *
 * @example
 * getIntensity(0.9) // returns 'sedentary'
 * getIntensity(2.5) // returns 'light'
 * getIntensity(5.0) // returns 'moderate'
 */
function getIntensity(met: number): IntensityLevel {
    if (met <= 0) return 'unknown';
    if (met < 1.5) return 'sedentary';
    if (met < 3.0) return 'light';
    if (met < 6.0) return 'moderate';
    if (met < 9.0) return 'vigorous';
    if (met < 12.0) return 'veryVigorous';
    if (met < 15.0) return 'extreme';
    return 'unknown';
}

/**
 * Processes raw text data representing MET (Metabolic Equivalent of Task) activities,
 * parses each line using a regular expression, and extracts structured activity entries.
 *
 * Each valid line is expected to contain a category, a 5-digit code, a MET value, and a description,
 * separated by variable amounts of whitespace. The function filters out invalid or header lines,
 * trims extraneous whitespace, and constructs an array of activity objects.
 *
 * The resulting array is saved as a JSON file in a designated data directory. If no valid activities
 * are found, a warning is logged.
 *
 * @param rawText - The raw input text containing activity data, with each activity on a separate line.
 *
 * @returns An array of `MetEntry` objects representing the parsed activities.
 *
 * @regex
 * /^(.+?)\s+(\d{5})\s+([\d\.]+)\s+(.+)$/ - Matches lines with the format:
 * "Category (text) + whitespace + Code (5 digits) + whitespace + MET (number) + whitespace + Description"
 * - Group 1: Category (all text up to the first large whitespace or code)
 * - Group 2: Code (exactly 5 digits)
 * - Group 3: MET value (a number, possibly with a decimal point)
 * - Group 4: Description (the rest of the line)
 * Example line: "Bicycling                         01003                  14.0         Bicycling, mountain..."
 *
 * @remarks
 * - Assumes the existence of `fs`, `DATA_DIR`, `JSON_OUTPUT`, `MetEntry`, and `getIntensity` in the scope.
 * - Handles decoding of URI-encoded lines and ignores empty or malformed lines.
 * - Logs the outcome, including the number of activities saved and a preview of the first entry.
 */
export function parseRawTextToEntries(rawText: string): MetEntry[] {
    const lines = rawText.split(/\r\n|\n/);
    const activities: MetEntry[] = [];
    const rowRegex = /^(.+?)\s+(\d{5})\s+([\d\.]+)\s+(.+)$/;
    for (let line of lines) {
        try { line = decodeURIComponent(line).trim(); } catch (e) { }
        if (!line) continue;
        const match = line.match(rowRegex);
        if (!match) {
            const lineNumber = lines.indexOf(line) + 1 == 0 ? '\\/' : lines.indexOf(line) + 1;
            console.warn(`${CONFIG.STATES.WARNING} ${lineNumber}: "${line}"`);
            continue;
        }
        const [, categoryStr, code, metStr, desc] = match;
        const met = parseFloat(metStr);
        if (!isNaN(met) && code.length === 5) {
            const category = categoryStr.trim();
            const description = desc.trim();
            if (category.toLowerCase().includes('category') || description.toLowerCase().includes('description')) continue;
            activities.push({
                id: code,
                code: code,
                met: met,
                category: category,
                description: description,
                intensity: getIntensity(met)
            });
        }
    }

    return activities;
}
