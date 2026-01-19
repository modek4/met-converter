import { FC } from "react";
import { PreparedActivity } from "../domain/activity";

type DetailsProps = {
  activity: PreparedActivity;
};

export const Details: FC<DetailsProps> = ({ activity }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold">{activity.name}</h3>

      <p className="mt-1 text-gray-700">
        MET: <span className="font-semibold">{activity.met}</span>
      </p>

      {activity.intensity && (
        <p className="text-gray-700">
          Intensity: <span className="font-semibold">{activity.intensity.toUpperCase()}</span>
        </p>
      )}
    </div>
  );
};
