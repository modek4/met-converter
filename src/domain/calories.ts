import type { population } from "./population";

export type calories = {
    met: number;
    weightKg: number;
    durationMin: number;
    durationHours?: number;
    age: number;
    sex?: "male" | "female";
    population: population;
}

