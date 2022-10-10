import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { categoryTypeReducer } from "./categoryType";
import { symbolTypeReducer } from "./symbolType";
import { cartReducer } from "./cartReducer";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { asyncReducer } from "./asyncReducer";

const persistConfig = {
  key: "redux-data",
  storage,
};

const reducers = combineReducers({
  categoryType: categoryTypeReducer,
  symbol: symbolTypeReducer,
  cart: cartReducer,
  products: asyncReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistedStore = persistStore(store);
