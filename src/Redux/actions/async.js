import {
  GET_PLP_PRODUCTS,
  GET_PDP_PRODUCT,
  DELETE_PRODUCT_DETAILS,
} from "../types";
import { PLQuery, ProductQuery } from "../../Queries";
import { client } from "../..";

export const getProductsByCategory = (categoryType) => {
  return (dispatch) => {
    client
      .query({
        query: PLQuery,
        variables: { type: categoryType },
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        const data = res.data.category.products;
        dispatch({ type: GET_PLP_PRODUCTS, payload: data });
      });
  };
};
export const getProductDetails = (productID) => {
  return (dispatch) => {
    client
      .query({
        query: ProductQuery,
        variables: { id: productID },
        fetchPolicy: "no-cache",
      })
      .then((response) => {
        const data = response.data.product;
        dispatch({ type: GET_PDP_PRODUCT, payload: data });
      });
  };
};
export const deleteProductDetails = () => {
  return (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_DETAILS, payload: {} });
  };
};
