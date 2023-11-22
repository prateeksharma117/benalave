import { GET_CAROUSEL_IMAGE_FAILURE, GET_CAROUSEL_IMAGE_REQUEST, GET_CAROUSEL_IMAGE_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    Carousel: [],
    error: "",
};

export const carouselReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAROUSEL_IMAGE_REQUEST:
            return { ...state, loading: true };

        case GET_CAROUSEL_IMAGE_SUCCESS:
            return { ...state, loading: false, Carousel: action.payload, error: "" };

        case GET_CAROUSEL_IMAGE_FAILURE:
            return { ...state, loading: false, Carousel: [], error: action.payload };

        default:
            return state;
    }
};
