import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE,
} from "./ActionType.js";

const initialState = {
    createPaymentLoading: false,
    createPaymentError: null,
    updatePaymentLoading: false,
    updatePaymentError: null,
    paymentData: null,
};

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PAYMENT_REQUEST:
            return {
                ...state,
                createPaymentLoading: true,
                createPaymentError: null,
            };

        case CREATE_PAYMENT_SUCCESS:
            return {
                ...state,
                createPaymentLoading: false,
                paymentData: action.payload, 
            };

        case CREATE_PAYMENT_FAILURE:
            return {
                ...state,
                createPaymentLoading: false,
                createPaymentError: action.payload,
            };

        case UPDATE_PAYMENT_REQUEST:
            return {
                ...state,
                updatePaymentLoading: true,
                updatePaymentError: null,
            };

        case UPDATE_PAYMENT_SUCCESS:
            // Handle success if needed
            return {
                ...state,
                updatePaymentLoading: false,
            };

        case UPDATE_PAYMENT_FAILURE:
            return {
                ...state,
                updatePaymentLoading: false,
                updatePaymentError: action.payload,
            };

        default:
            return state;
    }
};
