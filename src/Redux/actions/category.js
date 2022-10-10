import { GET_TYPE } from "../types";

export const getAllData = (categoryType) => {
  return {
    type: GET_TYPE,
    payload: categoryType,
  };
};
