import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from "redux-thunk"
import { authReducer } from "./Auth/Reducer.js"
import { customerProductReducer } from "./Product/Reducer.js"
import { cartReducer } from "./Cart/Reducer.js"
import { orderReducer } from "./Order/Reducer.js"
import { paymentReducer } from "./Payment/Reducer.js"
import { adminOrderReducer } from "./Admin/Order/Reducer.js"


const rootReducer=combineReducers({
    auth:authReducer,
    product:customerProductReducer,
    cart:cartReducer,
    order:orderReducer,
    payment:paymentReducer,
    adminOrder:adminOrderReducer,
})

export const store= legacy_createStore(rootReducer,applyMiddleware(thunk))