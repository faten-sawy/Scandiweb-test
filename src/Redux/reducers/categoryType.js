import { GET_TYPE } from "../types";

export function categoryTypeReducer(state = "all", action) {
  switch (action.type) {
    case GET_TYPE: {
      return action.payload;
    }
    default:
      return state;
  }
}
