import { FC, useState } from "react";
import { PreparedActivity } from "../domain/activity";
import { calculateCalories } from "../logic/calculateCalories";

type CalculatorProps = {
  activity: PreparedActivity;
};

export const Calculator: FC<CalculatorProps> = ({ activity }) => {
  const [weight, setWeight] = useState(70);
  const [duration, setDuration] = useState(30);
  const [age, setAge] = useState(30);

  const calories = calculateCalories({
    met: activity.met,
    weightKg: weight,
    durationMin: duration,
    age,
    population: "adult",
  });

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm mt-4">
      <h4 className="text-md font-semibold mb-3">Calculate Burned Calories</h4>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <span>Age (years):</span>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md w-24"
          />
        </label>

        <label className="flex items-center gap-2">
          <span>Weight (kg):</span>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md w-24"
          />
        </label>

        <label className="flex items-center gap-2">
          <span>Duration (min):</span>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md w-24"
          />
        </label>

        <p className="mt-2 text-lg">
          Burned calories: <span className="font-bold">{calories.toFixed(0)}</span>
        </p>
      </div>
    </div>
  );
};
