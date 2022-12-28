import { ajax } from "../tools/ajax";

export const findCities = async (optionsRequest) => {
  return await ajax(optionsRequest);
};
