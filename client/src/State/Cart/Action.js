import { api } from "../../config/APiConfig.js";
import {
    ADD_ITEM_TO_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    GET_CART_FAILURE,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAILURE,
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";
import { toast } from "react-toastify";

export const getCart = () => async (dispatch) => {
    dispatch({ type: GET_CART_REQUEST });

    try {
        const { data } = await api.get("/api/cart/");
        dispatch({ type: GET_CART_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: GET_CART_FAILURE, payload: e.message });
        toast.error("failed to get cart");
    }
};

export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    try {
        const { data } = await api.put("/api/cart/add", reqData);
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
        toast.success("Item added to cart");
    } catch (e) {
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: e.message });
        toast.error("Login to add item to cart");
    }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });

    try {
        const { data } = await api.delete(`/api/cart_items/${cartItemId}`);
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
        toast.success("Item deleted from cart");
    } catch (e) {
        dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: e.message });
        toast.error("failed to delete item from cart");
    }
};

export const updateCartItem = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });

    try {
        const { data } = await api.put(
            `/api/cart_items/${reqData.cartItemId}`,
            reqData.data
        );
        dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: e.message });
        toast.error("failed to update cart");
    }
};
