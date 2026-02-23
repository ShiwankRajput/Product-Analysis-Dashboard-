import Cookies from "js-cookie";

export const saveFilters = (filters) => {
  Cookies.set("dashboardFilters", JSON.stringify(filters), {
    expires: 7
  });
};

export const loadFilters = () => {
  const data = Cookies.get("dashboardFilters");
  return data ? JSON.parse(data) : null;
};