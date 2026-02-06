const enum intensity {
    sedentary = 'sedentary',
    light = 'light',
    moderate = 'moderate',
    vigorous = 'vigorous',
    veryVigorous = 'very vigorous',
    extreme = 'extreme',
    unknown = 'unknown'
}

export type IntensityLevel = keyof typeof intensity;

export interface MetEntry {
    id: string;
    code: string;
    met: number;
    category: string;
    description: string;
    intensity: IntensityLevel;
}