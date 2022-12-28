import { ajax } from "../tools/ajax";

export const getWeather = async (optionsRequest) => {
  return await ajax(optionsRequest);
};
