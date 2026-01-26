import type { calories } from "../domain/calories";

export const calculateCalories = (params: calories): number => {
    const { met, weightKg, durationMin, age, wheelchair } = params;
    const baseFormula = (vo2: number) => (met * vo2 * weightKg * durationMin) / 200;

    const childFactor = (age: number): number => {
        if (age >= 6 && age <= 9) return 4.0;
        if (age >= 10 && age <= 12) return 4.5;
        if (age >= 13 && age <= 15) return 5.0;
        if (age >= 16 && age <= 18) return 5.5;
        return 3.5;
    }

    if (age === null || age === undefined || isNaN(age) || age < 6 || age > 120 || !Number.isInteger(age)) return 0;
    if (weightKg <= 0 || isNaN(weightKg) || weightKg === null || weightKg === undefined || weightKg > 500) return 0;
    if (durationMin <= 0 || isNaN(durationMin) || durationMin === null || durationMin === undefined || durationMin > 1440) return 0;

    let multipalier = 3.5;
    if (age >= 60) multipalier = 2.7;
    if (age < 18) multipalier = childFactor(age);
    if (wheelchair) multipalier *= 0.992;
    return baseFormula(multipalier);
};