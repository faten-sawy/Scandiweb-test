import { GET_SYMBOL } from "../types";

export const getSymbol = (symbol) => {
  return {
    type: GET_SYMBOL,
    payload: symbol,
  };
};
