import {
  GET_PLP_PRODUCTS,
  GET_PDP_PRODUCT,
  DELETE_PRODUCT_DETAILS,
} from "../types";

const initialData = {
  PLPProducts: [],
  PDPProduct: {},
};
export function asyncReducer(state = initialData, action) {
  switch (action.type) {
    case GET_PLP_PRODUCTS: {
      return {
        ...state,
        PLPProducts: action.payload,
      };
    }
    case GET_PDP_PRODUCT: {
      return {
        ...state,
        PDPProduct: action.payload,
      };
    }
    case DELETE_PRODUCT_DETAILS: {
      return {
        ...state,
        PDPProduct: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
