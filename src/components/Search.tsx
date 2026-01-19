import { FC } from "react";
import { useSearch } from "../hooks/useSearch";
import { PreparedActivity } from "../domain/activity";

type SearchProps = {
  onSelect: (activity: PreparedActivity) => void;
  limit: number;
};

export const Search: FC<SearchProps> = ({ onSelect, limit }) => {
  const { query, setQuery, results, loading } = useSearch(limit);

  return (
    <div className="flex flex-col gap-2 relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="..."
        className="px-3 py-2 rounded-md border border-gray-300 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && <div className="text-sm text-gray-500">Searching…</div>}

      {results.length > 0 && (
        <div className="border border-gray-200 rounded-md bg-gray-50 divide-y divide-gray-200 shadow-sm">
          {results.map((activity) => (
            <button
              key={activity.id}
              onClick={() => onSelect(activity)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 transition">
              {activity.name} — <span className="font-semibold">{activity.met} MET</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
