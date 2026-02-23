import API from "./axios";

export const trackFeature = (featureName) => {
  return API.post("/track", { featureName });
};