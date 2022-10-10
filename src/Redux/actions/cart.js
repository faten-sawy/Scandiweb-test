import {
  ADD_TO_CART,
  ADD_PRICE,
  ADD_QUANTITY,
  REMOVE_FROM_CART,
  GET_QUANTITIES,
  CHANGE_ATTRIBUTE,
  SET_OVERLAY_CART,
  TOTAL_PRICE,
  SET_CONST_ATTRIBUTES,
  DELETE_CONST_ATTRIBUTES,
} from "../types";

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};
export const addPrice = (id, price) => {
  return {
    type: ADD_PRICE,
    payload: { id, price },
  };
};
export const calcTotalPrice = () => {
  return {
    type: TOTAL_PRICE,
  };
};
export const addQuantity = (id, quantity) => {
  return {
    type: ADD_QUANTITY,
    payload: { id, quantity },
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};
export const getQuantities = () => {
  return {
    type: GET_QUANTITIES,
  };
};
export const changeAttribute = (productId, changeConfig) => {
  return {
    type: CHANGE_ATTRIBUTE,
    payload: { productId, changeConfig },
  };
};
export const setOverlayCart = (status) => {
  return {
    type: SET_OVERLAY_CART,
    payload: status,
  };
};
export const setAttributes = (attributesArr) => {
  return {
    type: SET_CONST_ATTRIBUTES,
    payload: attributesArr,
  };
};
export const deleteAttributes = () => {
  return {
    type: DELETE_CONST_ATTRIBUTES,
  };
};
