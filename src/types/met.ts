import { IntensityLevel } from './intensity';

export interface MetEntry {
    id: string;
    code: string;
    met: number;
    category: string;
    description: string;
    intensity: IntensityLevel;
}