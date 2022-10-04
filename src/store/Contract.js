import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ContractABI from "../contracts/Contract.json";
import { notify } from "./toast"

// console.log("ContractABI", ContractABI.abi.filter(v => v.type == 'event').map(v => v.name))

export const connectContract = createAsyncThunk(
    'connectContract',
    async (args, thunkAPI) => {
        try {
            let web3 = thunkAPI.getState().web3Store.web3;
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = ContractABI.networks[networkId];
            const contract = new web3.eth.Contract(
                ContractABI.abi,
                deployedNetwork && deployedNetwork.address,
            );
            let owner = null;
            if (contract)
                owner = await contract.methods.owner().call();
            return { contract, owner };
        } catch (error) {
            console.error(error)
            thunkAPI.dispatch(notify(error.message))
            return { contract: null, owner: null };
        }
    }
)

export const Contractlice = createSlice({
    name: 'Contract',
    initialState: {
        contract: null,
        products: [],
        sessions: [],
        owner: null,
        address: null,
        something: 1,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(connectContract.fulfilled, (state, action) => {
            state.contract = action.payload.contract;
            state.owner = action.payload.owner;
            window.contract = action.payload.contract;
            // console.log(state, action.payload);
        })
    },
})

export const { } = Contractlice.actions;

export default Contractlice.reducer;
