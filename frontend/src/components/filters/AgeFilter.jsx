import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";

const AgeFilter = () => {
  const { filters, setFilters } = useContext(FilterContext);

  return (
    <div className="form-group">
      <label className="form-label fw-semibold">
        Age Group
      </label>

      <select
        className="form-select shadow-sm"
        value={filters.age}
        onChange={(e) =>
          setFilters({
            ...filters,
            age: e.target.value
          })
        }
      >
        <option value="">All Ages</option>
        <option value="<18">&lt; 18</option>
        <option value="18-40">18 - 40</option>
        <option value=">40">&gt; 40</option>
      </select>
    </div>
  );
};

export default AgeFilter;