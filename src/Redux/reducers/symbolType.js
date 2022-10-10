import { GET_SYMBOL } from "../types";

export function symbolTypeReducer(state = "$", action) {
  switch (action.type) {
    case GET_SYMBOL: {
      return action.payload;
    }
    default:
      return state;
  }
}
