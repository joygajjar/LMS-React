import { primaryApi } from "./api";

export const getVideos = async () => {
  try {
    const response = await primaryApi.get("allVideo");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
