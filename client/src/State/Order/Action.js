import { api } from "../../config/ApiConfig.js";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS , GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_USER_ORDER_HISTORY_FAILURE, GET_USER_ORDER_HISTORY_REQUEST, GET_USER_ORDER_HISTORY_SUCCESS } from "./ActionType.js"
import {toast} from "react-toastify"



export const createOrder=(reqData)=>async(dispatch)=>{
    dispatch({type:CREATE_ORDER_REQUEST})
    try {
        const {data}=await api.post("/api/orders/",reqData.address)
        if (data._id) {
            reqData.navigate({search:`step=3&order_id=${data._id}`})
        }

        dispatch({
            type:CREATE_ORDER_SUCCESS,payload:data
        })

    } catch (e) {
        dispatch({
            type:CREATE_ORDER_FAILURE,
            payload:e.message
        })
    }
} 

export const getOrderById=(orderId)=>async(dispatch)=>{
    dispatch({type:GET_ORDER_BY_ID_REQUEST})
    try {
        const {data}=await api.get(`/api/orders/${orderId}`)

        dispatch({
            type:GET_ORDER_BY_ID_SUCCESS,payload:data
        })

    } catch (e) {
        dispatch({
            type:GET_ORDER_BY_ID_FAILURE,
            payload:e.message
        })
    }
} 

export const userOrderHistory=(userId)=>async(dispatch)=>{
    dispatch({type:GET_USER_ORDER_HISTORY_REQUEST})
    try {
        const {data}=await api.get(`/api/orders/user`,userId)

        dispatch({
            type:GET_USER_ORDER_HISTORY_SUCCESS,payload:data
        })

    } catch (e) {
        dispatch({
            type:GET_USER_ORDER_HISTORY_FAILURE,
            payload:e.message
        })
    }
} 