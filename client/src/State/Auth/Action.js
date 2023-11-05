import axios from "axios"
import { API_BASE_URL } from "../../config/ApiConfig.js";
import { GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType.js"
import { toast } from 'react-toastify';
import { error } from "highcharts";

const register_request=()=>({type: REGISTER_REQUEST})
const register_success=(user)=>({type: REGISTER_SUCCESS,payload:user})
const register_failure=(error)=>({type: REGISTER_FAILURE,payload:error})

export const register=(userData)=>async(dispatch)=>{
    dispatch(register_request())

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`,userData)
        const user=response.data
        if (user.jwt) {
            localStorage.setItem("jwt",user.jwt)
        }
        dispatch(register_success(user.jwt))
        toast.success("Your account has been successfully created")
    } catch (e) {
        dispatch(register_failure(toast.error("Failed to create your account")))
    }
} 

const login_request=()=>({type: LOGIN_REQUEST})
const login_success=(user)=>({type: LOGIN_SUCCESS,payload:user})
const login_failure=(error)=>({type: LOGIN_FAILURE,payload:error})

export const login=(userData)=>async(dispatch)=>{
    dispatch(login_request())

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`,userData)
        const user=response.data
        if (user.jwt) {
            localStorage.setItem("jwt",user.jwt)
        }
        dispatch(login_success(user.jwt))
        toast.success("You have successfully logged in")
    } catch (e) {
        dispatch(login_failure(toast.error("An incorrect password may have been used or the user may not exist")))
    }
} 

const get_user_request=()=>({type: GET_USER_REQUEST})
const get_user_success=(user)=>({type: GET_USER_SUCCESS,payload:user})
const get_user_failure=(error)=>({type: GET_USER_FAILURE,payload:error})

export const getUser=(jwt)=>async(dispatch)=>{
    dispatch(get_user_request())

    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                "Authorization":`Bearer ${jwt}`
            }
        })
        const user=response.data
        dispatch(get_user_success(user))
    } catch (e) {
        dispatch(get_user_failure())
    }
} 

export const getAllUser=()=>async(dispatch)=>{
    dispatch({type:GET_ALL_USER_REQUEST})

    try {
        const {data} = await axios.get(`${API_BASE_URL}/api/users`)
        dispatch({type:GET_ALL_USER_SUCCESS,payload:data})
    } catch (e) {
        dispatch({type:GET_ALL_USER_FAILURE,payload:e.message})
    }
} 

export const logout=()=>(dispatch)=>{
    dispatch({type: LOGOUT, payload:null})
    localStorage.clear()
    toast.success("User logged out") 
}