import type { calories } from "../domain/calories";
import type { population } from "../domain/population";

export const calculateCalories = (params: calories): number => {
    const { met, weightKg, durationMin, population } = params;
    switch (population as population) {
        case "adult":
            //* 19-59
            return (met * 3.5 * weightKg * durationMin) / 200;

        case "olderAdult":
            //* 60+ 2.7 ml/kg/min
            return (met * 3.5 * weightKg * durationMin) / 200;

        case "wheelchair":
            //* Wheelchair 0.992 kcal/kg/h
            return (met * 3.5 * weightKg * durationMin) / 200;

        case "child":
            //TODO Find proper formula for children
            // 6-9 years
            // 10-12 years
            // 13-15 years
            // 16-18 years
            //https://pmc.ncbi.nlm.nih.gov/articles/PMC5768467/
            //https://www.nccor.org/tools-youthcompendium/met-view-all-categories/
            return (met * 3.5 * weightKg * durationMin) / 200;

        default:
            throw new Error("Invalid population type");
    }
};