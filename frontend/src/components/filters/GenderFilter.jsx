import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";

const GenderFilter = () => {
  const { filters, setFilters } = useContext(FilterContext);

  return (
    <div className="form-group">
      <label className="form-label fw-semibold">
        Gender
      </label>

      <select
        className="form-select shadow-sm"
        value={filters.gender}
        onChange={(e) =>
          setFilters({
            ...filters,
            gender: e.target.value
          })
        }
      >
        <option value="">All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

export default GenderFilter;