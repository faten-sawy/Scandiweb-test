import {
  ADD_TO_CART,
  ADD_PRICE,
  REMOVE_FROM_CART,
  GET_QUANTITIES,
  CHANGE_ATTRIBUTE,
  SET_OVERLAY_CART,
  ADD_QUANTITY,
  TOTAL_PRICE,
  SET_CONST_ATTRIBUTES,
  DELETE_CONST_ATTRIBUTES,
} from "../types";

const initial = {
  cartProducts: [],
  total: { price: 0, tax: 0 },
  quantities: 1,
  overlayFlag: false,
  quantity: 1,
  constAttributes: [],
};

export function cartReducer(state = initial, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
      };
    }
    case ADD_PRICE: {
      const { price, id } = action.payload;
      const index = state.cartProducts.findIndex((item) => item.uniqId === id);
      const newObj = state.cartProducts.find((item) => item.uniqId === id);
      const newArr = [...state.cartProducts];
      newObj.realPrice = price;
      newArr[index] = newObj;
      return {
        ...state,
        cartProducts: newArr,
      };
    }
    case ADD_QUANTITY: {
      const { quantity, id } = action.payload;
      const index = state.cartProducts.findIndex((item) => item.uniqId === id);
      const newObj = state.cartProducts.find((item) => item.uniqId === id);
      const newArr = [...state.cartProducts];
      newObj.quantity = quantity;
      newArr[index] = newObj;
      return {
        ...state,
        cartProducts: newArr,
        quantity: quantity,
      };
    }

    case REMOVE_FROM_CART: {
      const id = action.payload;
      const newArray = state.cartProducts.filter((item) => item.uniqId !== id);
      return {
        ...state,
        cartProducts: newArray,
      };
    }
    case GET_QUANTITIES: {
      const quantityArr = state.cartProducts.map((item) => item.quantity);
      const q = quantityArr.reduce((acc, current) => acc + current, 0);
      return {
        ...state,
        quantities: q,
      };
    }
    case CHANGE_ATTRIBUTE: {
      const { productId } = action.payload;
      const { type, value } = action.payload.changeConfig;
      const productIndex = state.cartProducts.findIndex(
        (item) => item.uniqId === productId
      );
      const newObj = state.cartProducts.find(
        (item) => item.uniqId === productId
      );
      const newArr = [...state.cartProducts];

      if (type === "attribute") {
        const attributeIndex = newObj.selectedAttributes.findIndex(
          (item) => item.name === value.name
        );
        newObj.selectedAttributes[attributeIndex] = value;
      } else if (type === "quantity") {
        newObj.quantity = newObj.quantity + 1;
      }

      newArr[productIndex] = newObj;
      return {
        ...state,
        cartProducts: newArr,
      };
    }
    case TOTAL_PRICE: {
      const { cartProducts } = state;
      const arr = cartProducts.map((item) => item.realPrice * item.quantity);
      const totalPrice = arr.reduce((acc, current) => acc + current, 0);
      const totalTax = (totalPrice * 0.21).toFixed(2);
      const priceAfterTax = Number(totalPrice) + Number(totalTax);

      return {
        ...state,
        total: {
          price: Number.parseFloat(priceAfterTax).toFixed(2),
          tax: totalTax,
        },
      };
    }
    case SET_OVERLAY_CART: {
      const status = action.payload;

      return {
        ...state,
        overlayFlag: status,
      };
    }
    case SET_CONST_ATTRIBUTES: {
      const attribute = action.payload;
      let newArr = [];
      if (
        !Array.isArray(state.constAttributes) ||
        !state.constAttributes.length
      ) {
        newArr.push(attribute);
      } else {
        newArr = [...state.constAttributes];
        const index = newArr.findIndex((item) => item.name === attribute.name);
        if (index === -1) {
          newArr = [...state.constAttributes, attribute];
        } else {
          newArr[index].value = attribute.value;
        }
      }
      return {
        ...state,
        constAttributes: newArr,
      };
    }
    case DELETE_CONST_ATTRIBUTES: {
      return {
        ...state,
        constAttributes: [],
      };
    }
    default: {
      return state;
    }
  }
}
