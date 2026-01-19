import { useState } from "react";
import { Search } from "../components/Search";
import { Details } from "../components/Details";
import { Calculator } from "../components/Calculator";
import { PreparedActivity } from "../domain/activity";

const App = () => {
  const [selected, setSelected] = useState<PreparedActivity | null>(null);
  const [limit, setLimit] = useState(5);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 font-sans">
      <header>
        <span className="text-gray-600 block mb-1">
          Data source:
          <a
            href="https://pacompendium.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-500 hover:underline mb-4 inline-block pl-1">
            Paco Compendium
          </a>
        </span>
      </header>
      <h2 className="text-2xl font-bold">AI MET Calculator</h2>
      <sup className="text-gray-600">
        Project uses simple AI techniques to match user input with activities
      </sup>
      <p className="text-gray-600 mb-6">
        Metabolic equivalent of task (MET) is a unit used to estimate the amount of energy
        expenditure during physical activities.
      </p>
      <hr className="my-6" />
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-gray-700 block">Search for an activity:</span>
          <sub className="text-gray-500 mb-4 block">Supported languages: English and Polish</sub>
        </div>

        <select className="mb-4" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={3}>3 results</option>
          <option value={5}>5 results</option>
          <option value={10}>10 results</option>
        </select>
      </div>
      <Search onSelect={setSelected} limit={limit} />

      {selected && (
        <div className="mt-6 space-y-4">
          <Details activity={selected} />
          <Calculator activity={selected} />
        </div>
      )}
    </div>
  );
};

export default App;
