import { api } from "../../config/ApiConfig.js";
import {
    CREATE_PRODUCTS_FAILURE,
    CREATE_PRODUCTS_REQUEST,
    CREATE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAILURE,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    RECENTLY_VIEWED_FAILURE,
    RECENTLY_VIEWED_REQUEST,
    RECENTLY_VIEWED_SUCCESS,
} from "./ActionType.js";
import { toast } from "react-toastify";

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST });
    const {
        colors,
        size,
        minPrice,
        maxPrice,
        minDiscount,
        category,
        stock,
        sort,
        pageNumber,
        pageSize,
    } = reqData;
    try {
        const { data } = await api.get(
            `/api/products/?color=${colors}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&stock=${stock}&sort=${sort}&pageSize=${pageSize}&pageNumber=${pageNumber}&category=${category}`
        );
        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: e.message });
    }
};

export const findProductsById = (productId) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/products/id/${productId}`);
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: e.message });
    }
};

export const createProduct = (product) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCTS_REQUEST });
    try {
        const { data } = await api.post(`/api/admin/products`,product.data);
        dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: e.message });
    }
};

export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });
    try {
        const { data } = await api.delete(`/api/admin/products/delete/${productId}`);
        dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: productId});
        toast.success("Product deleted successfully");
    } catch (e) {
        dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: e.message });
    }
};

export const recentlyViewed = (reqData) => async (dispatch) => {
    dispatch({ type: RECENTLY_VIEWED_REQUEST });
    try {
        await api.post(`/api/users/recentProduct`,reqData);
        dispatch({ type: RECENTLY_VIEWED_SUCCESS});
    } catch (e) {
        dispatch({ type: RECENTLY_VIEWED_FAILURE, payload: e.message });
    }
};
