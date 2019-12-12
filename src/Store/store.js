import { applyMiddleware, createStore } from "redux";
//võimaldab dispatchi
import thunk from "redux-thunk";
import logger from "redux-logger";

const ITEMS_SUCCESS = "ITEMS_SUCCESS";
const ITEMS_REQUEST = "ITEMS_REQUEST";
const ITEM_FAILURE = "ITEM_FAILURE";

const ITEM_ADDED = "ITEM_ADDED";
const ITEM_REMOVED = "ITEM_REMOVED";

//asünkroonne
export const getItems = () => (dispatch, getState) => {
  //kui tooted olemas, ei kutsu getItems fn-i
  if (getState().items.length > 0) return null;
  //dispatch(itemsRequest());
  return fetch("/api/v1/items")
    .then(res => {
      return res.json();
    })
    .then(items => {
      dispatch(itemsSuccess(items));
    })
    .catch(err => {
      console.log(err);
      dispatch(itemFailure());
    });
};

export const addItem = item => ({
  type: ITEM_ADDED,
  payload: item
});

export const itemsSuccess = items => ({
  type: ITEMS_SUCCESS,
  payload: items
});

export const itemFailure = () => ({
  type: ITEM_FAILURE
});

export const itemsRequest = () => ({
  type: ITEMS_REQUEST
});

export const removeItem = _id => ({
  type: ITEM_REMOVED,
  payload: _id
});

const initialState = {
  user: {
    email: null,
    id: null,
    token: null
  },
  cart: [
    //item
  ],
  items: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_ADDED: {
      return {
        ...state,
        cart: state.cart.concat([action.payload])
      };
    }
    case ITEMS_SUCCESS: {
      return {
        ...state,
        items: action.payload
      };
    }
    case ITEM_REMOVED: {
      return {
        ...state,
        cart: removeItemById(state.cart, action.payload)
      };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(authReducer, applyMiddleware(logger, thunk));
store.subscribe(() => console.log(store.getState()));

export default store;

const removeItemById = (items, _id) => {
  //findIndex!
  const index = items.findIndex(item => item._id === _id);
  if (index === -1) return items;
  const copy = items.slice();
  // splice muudab olemasolevat
  copy.splice(index, 1);
  return copy;
};
