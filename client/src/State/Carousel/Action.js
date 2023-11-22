import { api } from "../../config/ApiConfig.js";
import { CAROUSEL_IMAGE_FAILURE, CAROUSEL_IMAGE_REQUEST, CAROUSEL_IMAGE_SUCCESS, GET_CAROUSEL_IMAGE_FAILURE, GET_CAROUSEL_IMAGE_REQUEST, GET_CAROUSEL_IMAGE_SUCCESS } from "./ActionType.js";

export const carouselImage = (reqData) => async (dispatch) => {
    dispatch({ type: CAROUSEL_IMAGE_REQUEST })

    try {
        await api.post(`/api/users/carouselImage`,reqData)
        dispatch({ type: CAROUSEL_IMAGE_SUCCESS})
    } catch (e) {
        dispatch({ type: CAROUSEL_IMAGE_FAILURE, payload: e.message });
    }
}

export const getCarouselImage = () => async (dispatch) => {
    dispatch({ type: GET_CAROUSEL_IMAGE_REQUEST })

    try {
        const {data}=await api.get(`/api/users/getCarouselImage`)
        dispatch({ type: GET_CAROUSEL_IMAGE_SUCCESS, payload: data})
    } catch (e) {
        dispatch({ type: GET_CAROUSEL_IMAGE_FAILURE, payload: e.message });
    }
}