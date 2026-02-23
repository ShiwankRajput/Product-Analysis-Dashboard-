import { createContext, useState, useEffect, useRef } from "react";
import { saveFilters, loadFilters } from "../components/utils/cookies";
import { trackFeature } from "../api/track.api";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    age: "",
    gender: ""
  });

  // store previous filters
  const prevFilters = useRef(filters);

  // prevent tracking on first load
  const isFirstLoad = useRef(true);

  // LOAD SAVED FILTERS
  useEffect(() => {
    const saved = loadFilters();
    if (saved) setFilters(saved);
  }, []);

  // SAVE + TRACK FILTERS
  useEffect(() => {
    saveFilters(filters);

    // skip first render
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      prevFilters.current = filters;
      return;
    }

    // TRACK ONLY CHANGED FILTER
    if (filters.age !== prevFilters.current.age) {
      trackFeature("age_filter");
    }

    if (filters.gender !== prevFilters.current.gender) {
      trackFeature("gender_filter");
    }

    if (
      filters.startDate !== prevFilters.current.startDate ||
      filters.endDate !== prevFilters.current.endDate
    ) {
      trackFeature("date_filter");
    }

    prevFilters.current = filters;

  }, [filters]);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};