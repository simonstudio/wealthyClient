import { configureStore } from '@reduxjs/toolkit'
import web3Reducer from './web3Store'
import toastReducer from './toast'
// import ContractReducer from './Contract'

// console.log(ContractReducer,web3Reducer)

export default configureStore({
    reducer: {
        web3Store: web3Reducer,
        toastReducer,
        // Contract: ContractReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
