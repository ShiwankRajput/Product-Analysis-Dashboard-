import API from "./axios";

export const getAnalytics = (params = {}) => {
  return API.get("/analytics", { params });
};