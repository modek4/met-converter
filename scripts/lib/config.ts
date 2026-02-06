import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

if (!process.env.MET_PDF_URL || !process.env.DATA_NAME) {
    throw new Error('🔴 | Missing required environment variables. Please check your .env file.');
}

/**
 * Application configuration constants.
 *
 * @property {string | undefined} PDF_URL - The URL to the MET PDF file, sourced from the environment variable `MET_PDF_URL`.
 * @property {object} PATHS - File system paths used by the application.
 * @property {string} PATHS.DATA_DIR - Directory path for storing data files.
 * @property {string} PATHS.JSON_OUTPUT - Path for the output JSON file, dynamically named using the `DATA_NAME` environment variable.
 * @property {string} PATHS.DEBUG_FILE - Path for the debug raw data file.
 * @property {object} STATES - Status indicators used for logging or UI feedback.
 * @property {string} STATES.PENDING - Symbol and label for pending state.
 * @property {string} STATES.INFO - Symbol and label for informational state.
 * @property {string} STATES.SUCCESS - Symbol and label for success state.
 * @property {string} STATES.WARNING - Symbol and label for warning state.
 * @property {string} STATES.ERROR - Symbol and label for error state.
 */
export const CONFIG = {
    PDF_URL: process.env.MET_PDF_URL,
    PATHS: {
        DATA_DIR: path.join(__dirname, '../../public/data'),
        JSON_OUTPUT: path.join(__dirname, `../../public/data/${process.env.DATA_NAME}.json`),
        DEBUG_FILE: path.join(__dirname, '../../public/data/debug_raw.txt'),
    },
    STATES: {
        PENDING: '⚪ |',
        INFO: '🔵 |',
        SUCCESS: '🟢 |',
        WARNING: '🟡 |',
        ERROR: '🔴 |'
    }
};
