
import { api } from "../../../config/APiConfig"
import { CANCELED_ORDER_FAILURE, CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCCESS, CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"


export const getOrder = () => async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST })

    try {
        const { data } = await api.get("/api/admin/orders/")
        dispatch({ type: GET_ORDERS_SUCCESS, payload: data })
    } catch (e) {
        console.log(e.message);
        dispatch({ type: GET_ORDERS_FAILURE, payload: e.message });
    }
}

export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CONFIRMED_ORDER_REQUEST })

    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/confirmed`)
        dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data })
    } catch (e) {
        console.log(e.message);
        dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: e.message });
    }
}

export const shippedOrder = (orderId) => async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST })

    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/ship`)
        dispatch({ type: SHIP_ORDER_SUCCESS, payload: data })
    } catch (e) {
        console.log(e.message);
        dispatch({ type: SHIP_ORDER_FAILURE, payload: e.message });
    }
}

export const deliveredOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELIVERED_ORDER_REQUEST })

    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/deliver`)
        dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data })
    } catch (e) {
        console.log(e.message);
        dispatch({ type: DELIVERED_ORDER_FAILURE, payload: e.message });
    }
}

export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCELED_ORDER_REQUEST })

    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/cancel`)
        dispatch({ type: CANCELED_ORDER_SUCCESS, payload: data })
    } catch (e) {
        console.log(e.message);
        dispatch({ type: CANCELED_ORDER_FAILURE, payload: e.message });
    }
}

export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST })

    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/delete`)
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data })
    } catch (e) {
        console.log(e.message);
        dispatch({ type: DELETE_ORDER_FAILURE, payload: e.message });
    }
}