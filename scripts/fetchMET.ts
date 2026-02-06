import fs from 'fs/promises';
import { constants } from 'fs';
import fetch from 'node-fetch';
import PDFParser from 'pdf2json';
import { CONFIG } from './lib/config';
import { parseRawTextToEntries } from './lib/parser';

/**
 * Asynchronously checks if a file exists at the specified path.
 *
 * @param path - The file system path to check for existence.
 * @returns A promise that resolves to `true` if the file exists, or `false` otherwise.
 */
async function fileExists(path: string): Promise<boolean> {
    try {
        await fs.access(path, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

/**
 * Downloads a PDF file from the configured URL, parses its content to extract raw text,
 * and saves the extracted text to a file. The function logs progress and handles errors
 * during the download and parsing process.
 *
 * @returns {Promise<string>} A promise that resolves with the raw text content extracted from the PDF.
 * @throws {Error} If the HTTP request fails or if there is an error during PDF parsing or file saving.
 */
async function downloadAndParsePDF(): Promise<string> {
    console.log(`${CONFIG.STATES.PENDING} Downloading PDF ${CONFIG.PDF_URL}`);
    const res = await fetch(CONFIG.PDF_URL);
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(`${CONFIG.STATES.PENDING} Parsing PDF...`);
    return new Promise<string>((resolve, reject) => {
        const pdfParser = new PDFParser(null, true);
        pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));

        pdfParser.on("pdfParser_dataReady", async () => {
            const rawText = pdfParser.getRawTextContent();
            try {
                await saveToFile(rawText, 'txt');
                console.log(`${CONFIG.STATES.SUCCESS} Cached raw text to ${CONFIG.PATHS.DEBUG_FILE}`);
                resolve(rawText);
            } catch (err) {
                reject(err);
            }
        });
        pdfParser.parseBuffer(buffer);
    });
}

/**
 * Saves the provided content to a file in either JSON or plain text format.
 *
 * - If the format is 'txt', writes the raw content to a debug file.
 * - If the format is 'json', parses the content into activity entries and writes them as formatted JSON.
 * - Ensures the data directory exists before writing.
 * - Logs progress and success messages to the console.
 * - Throws an error if no valid activities are parsed when using JSON format.
 *
 * @param content - The raw string content to be saved or parsed.
 * @param format - The output format: 'json' (default) or 'txt'.
 * @throws {Error} If no valid activities are parsed from the text when format is 'json'.
 */
async function saveToFile(content: string, format: 'json' | 'txt' = 'json') {
    await fs.mkdir(CONFIG.PATHS.DATA_DIR, { recursive: true });
    if (format === 'txt')
        return await fs.writeFile(CONFIG.PATHS.DEBUG_FILE, content, 'utf-8');
    console.log(`${CONFIG.STATES.PENDING} Converting to JSON...`);
    const activities = parseRawTextToEntries(content);
    if (activities.length === 0)
        throw new Error(`${CONFIG.STATES.ERROR} No valid activities parsed from the text.`);
    await fs.writeFile(
        CONFIG.PATHS.JSON_OUTPUT,
        JSON.stringify(activities, null, 2),
        'utf-8'
    );
    console.log(`${CONFIG.STATES.SUCCESS} Saved ${activities.length} activities to JSON ${CONFIG.PATHS.JSON_OUTPUT}`);
}

/**
 * Main entry point for the MET converter script.
 *
 * Orchestrates the workflow to fetch and parse MET data:
 * 1. Checks if cached raw text exists
 * 2. Downloads and parses PDF if cache is missing
 * 3. Reads the cached raw text file
 * 4. Saves the raw text to a JSON file
 *
 * @returns {Promise<void>}
 * @throws {Error} Logs error and exits process with code 1 if any step fails
 */
async function main() {
    try {
        const hasCache = await fileExists(CONFIG.PATHS.DEBUG_FILE);
        if (!hasCache) await downloadAndParsePDF();
        console.log(`${CONFIG.STATES.INFO} Using cached raw text ${CONFIG.PATHS.DEBUG_FILE}`);
        const rawText = await fs.readFile(CONFIG.PATHS.DEBUG_FILE, 'utf-8');
        await saveToFile(rawText, 'json');
    } catch (error) {
        console.error(`${CONFIG.STATES.ERROR}`, error);
        process.exit(1);
    }
}

main();
