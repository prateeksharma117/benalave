import { api } from "../../config/APiConfig"
import { UPDATE_CART_ITEM_FAILURE } from "../Cart/ActionType"
import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, UPDATE_PAYMENT_REQUEST, UPDATE_PAYMENT_SUCCESS } from "./ActionType"




export const createPayment=(reqData)=>async(dispatch)=>{
    dispatch({type:CREATE_PAYMENT_REQUEST})

    try {
        const data=await api.post(`/api/payments/${reqData}`)
        dispatch({type:CREATE_PAYMENT_SUCCESS,payload: data })
    } catch (e) {
        dispatch({type:CREATE_PAYMENT_FAILURE,payload:e.message})
    }
}

export const updatePayment=(reqData)=>async(dispatch)=>{
    dispatch({type:UPDATE_PAYMENT_REQUEST})

    try {
        const {data}=await api.get(`/api/payments/${reqData.orderId}/${reqData.paymentId}/${reqData.userId}`)
        dispatch({type:UPDATE_PAYMENT_SUCCESS})
    } catch (e) {
        dispatch({type:UPDATE_CART_ITEM_FAILURE,payload:e.message})
    }
}


