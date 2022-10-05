import { configureStore } from '@reduxjs/toolkit'
import web3Reducer from './web3Store'
// import ContractReducer from './Contract'


export default configureStore({
    reducer: {
        web3Store: web3Reducer,
        // Contract: ContractReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
