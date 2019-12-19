import * as services from "../services";
import * as selectors from "../Store/selectors.js";
import { toast } from "react-toastify";

export const ITEMS_SUCCESS = "ITEMS_SUCCESS";
export const ITEMS_REQUEST = "ITEMS_REQUEST";
export const ITEM_FAILURE = "ITEM_FAILURE";
export const ITEM_ADDED = "ITEM_ADDED";
export const ITEM_REMOVED = "ITEM_REMOVED";
export const USER_UPDATE = "USER_UPDATE";
export const TOKEN_UPDATE = "TOKEN_UPDATE";

export const removeItem = itemId => (dispatch, getState) => {
  const store = getState();
  const token = selectors.getToken(store);
  const userId = selectors.getUser(store)._id;
  services
    .removeItemFromCart({ itemId, token, userId })
    .then(() => {
      toast.success("Item successfully removed!");
      dispatch({
        type: ITEM_REMOVED,
        payload: itemId
      });
    })
    .catch(err => {
      console.error(err);
      toast.error("Items removal failed!");
    });
};

export const addItem = item => (dispatch, getState) => {
  const store = getState();
  const itemId = item._id;
  const token = selectors.getToken(store);
  const userId = selectors.getUser(store)._id;
  services
    .addItemToCart({ itemId, token, userId })
    .then(() => {
      toast.success("Item successfully added to cart!");
      dispatch({
        type: ITEM_ADDED,
        payload: itemId
      });
    })
    .catch(err => {
      console.error(err);
      toast.error("Adding item failed!");
    });
};

//asünkroonne
export const getItems = () => (dispatch, getState) => {
  const store = getState();
  //kui tooted olemas, ei kutsu getItems fn-i
  if (selectors.getItems(store).length > 0) return null;
  dispatch(itemsRequest());
  return services
    .getItems()
    .then(items => {
      dispatch(itemsSuccess(items));
    })
    .catch(err => {
      console.log(err);
      dispatch(itemFailure());
    });
};

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

export const userUpdate = user => ({
  type: USER_UPDATE,
  payload: user
});

export const tokenUpdate = token => ({
  type: TOKEN_UPDATE,
  payload: token
});
