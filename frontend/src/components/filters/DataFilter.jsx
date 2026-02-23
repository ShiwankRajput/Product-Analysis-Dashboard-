import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";

const DateFilter = () => {
  const { filters, setFilters } = useContext(FilterContext);

  return (
    <div>
      <label className="form-label fw-semibold">
        Date Range
      </label>

      <div className="d-flex gap-2">

        {/* START DATE */}
        <input
          type="date"
          className="form-control shadow-sm"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({
              ...filters,
              startDate: e.target.value
            })
          }
        />

        {/* END DATE */}
        <input
          type="date"
          className="form-control shadow-sm"
          value={filters.endDate}
          onChange={(e) =>
            setFilters({
              ...filters,
              endDate: e.target.value
            })
          }
        />

      </div>
    </div>
  );
};

export default DateFilter;