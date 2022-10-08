import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import { notify } from "./toast"
import { log, logwarn, logerror } from "../std"

const dev = {
    TEST: 'TEST',
    MAINNET: 'MAINNET'
}

export const CHAINS = {
    1337: {
        id: 1337,
        nativeCurrency: {
            name: 'ETH', decimals: 18, symbol: 'ETH'
        },
        chainId: Web3.utils.toHex(1337),
        rpcUrls: ['HTTP://127.0.0.1:8545'],
        chainName: 'Local',
        blockExplorerUrls: "",
        dev: dev.TEST,
    },
    5777: {
        id: 5777,
        nativeCurrency: {
            name: 'ETH', decimals: 18, symbol: 'ETH'
        },
        chainId: Web3.utils.toHex(5777),
        rpcUrls: ['HTTP://127.0.0.1:7545'],
        chainName: 'Local',
        blockExplorerUrls: "",
        dev: dev.TEST,
    },
    1: {
        id: 1,
        nativeCurrency: {
            name: 'Ethereum', decimals: 18, symbol: 'ETH'
        },
        chainId: Web3.utils.toHex(1),
        rpcUrls: ['wss://mainnet.infura.io/v3/d41e02ee7f344eb6ba4b9239f853de51'],
        chainName: 'Ethereum',
        blockExplorerUrls: ['https://etherscan.io'],
        dev: dev.MAINNET
    },
    5: {
        id: 5,
        nativeCurrency: {
            name: 'Ethereum', decimals: 18, symbol: 'ETH'
        },
        chainId: Web3.utils.toHex(5),
        rpcUrls: ['https://goerli.infura.io/v3/d41e02ee7f344eb6ba4b9239f853de51'],
        chainName: 'Goerli',
        blockExplorerUrls: ['https://goerli.etherscan.io'],
        dev: dev.TEST
    },
    97: {
        id: 97,
        nativeCurrency: {
            name: 'tBNB', decimals: 18, symbol: 'tBNB'
        },
        chainId: Web3.utils.toHex(97),
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
        chainName: 'Binance Smart Chain Testnet',
        blockExplorerUrls: ['https://testnet.bscscan.com'],
        iconUrls: "https://testnet.bscscan.com/images/svg/brands/bnb.svg",
        dev: dev.TEST,
    },
    56: {
        id: 56,
        nativeCurrency: {
            name: 'BNB', decimals: 18, symbol: 'BNB'
        },
        chainId: Web3.utils.toHex(56),
        rpcUrls: ['https://bsc-dataseed1.binance.org'],
        chainName: 'Binance Smart Chain',
        blockExplorerUrls: ['https://bscscan.com'],
        iconUrls: "https://bscscan.com/images/svg/brands/bnb.svg",
        dev: dev.MAINNET,
    },
    80001: {
        id: 80001,
        nativeCurrency: {
            name: 'MATIC', decimals: 18, symbol: 'MATIC'
        },
        chainId: Web3.utils.toHex(80001),
        rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
        chainName: 'Polygon Testnet',
        blockExplorerUrls: ['https://mumbai.polygonscan.com'],
        dev: dev.TEST
    },
    43113: {
        id: 43113,
        nativeCurrency: {
            name: 'AVAX', decimals: 18, symbol: 'AVAX'
        },
        chainId: Web3.utils.toHex(43113),
        rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
        chainName: 'Avalanche Testnet',
        blockExplorerUrls: ['https://testnet.snowtrace.io/'],
        dev: dev.TEST,
    },
    getParamsById: (id) => {
        //copy params
        let params = { ...Object.values(CHAINS).find(item => item.id === id) };
        const listParams = ['nativeCurrency', 'chainId', 'rpcUrls', 'chainName', 'blockExplorerUrls'];
        Object.keys(params).map(v => {
            if (!listParams.includes(v)) delete params[v];
        });
        return params;
    },
}

export const connectWeb3 = createAsyncThunk(
    'connectWeb3',
    async (args, thunkAPI) => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        // Modern dapp browsers...
        let web3 = null;
        let accounts = [];
        let chainId = 0;
        try {
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);
                // Request account access if needed
                await window.ethereum.enable();
                // Accounts now exposed
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                // Use Mist/MetaMask's provider.
                web3 = window.web3;
                // log("Injected web3 detected.");
            }
            // Fallback to localhost; use dev console port by default...
            else {
                const provider = new Web3.providers.HttpProvider(
                    "http://127.0.0.1:8545"
                );
                web3 = new Web3(provider);
                // log("No web3 instance injected, using Local web3.");
            }
            accounts = await web3.eth.getAccounts();
            chainId = await web3.eth.getChainId()

            // log('Web3 is: ', web3);
        } catch (error) {
            throw error;
        }
        window.web3 = web3;
        return { web3, accounts, chainId };
    }
)

let _switchChain;
export const switchChain = createAsyncThunk(
    'switchChain',
    _switchChain = async (args, thunkAPI) => {
        let chainId = parseInt(args);
        if (chainId === 5777) chainId = 1337;
        // log('switchChain', chainId, notify("ádasd"));
        let web3 = thunkAPI.getState().web3Store.web3;
        if (chainId && chainId !== parseInt(window.ethereum.networkVersion)) {
            return window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(chainId) }]
            }).then(r => {
                log("switchEthereumChain success", r);
                return window.ethereum.networkVersion;
            }).catch(error => {
                // if chain was not added, add chain
                if (error.code === 4902 || error.code === -32603) {
                    let params = CHAINS.getParamsById(chainId);

                    return window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [params]
                    }).then(r => {
                        thunkAPI.dispatch(notify(["add chain " + params.chainName + " success", " success"]))
                        return _switchChain(args, thunkAPI);
                    }).catch(error => {
                        console.error(error);
                        thunkAPI.dispatch(notify(error.message))
                    });
                } else {
                    console.error("chain error ", error)
                }
            })
        }
    }
)

export const web3Slice = createSlice({
    name: "web3",
    initialState: {
        web3: null,
        accounts: [],
        chainId: 1337,
        chainName: "web3"
    },
    reducers: {
        updateAccounts: (state, action) => {
            state.accounts = action.payload;
        },
        updateChain: (state, action) => {
            state.chainId = action.payload[0];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(connectWeb3.fulfilled, (state, action) => {
            log('conected Web3', action.payload)
            state.web3 = action.payload.web3;
            if (action.payload.accounts.length > 0 && CHAINS[action.payload.chainId]) {
                state.accounts = action.payload.accounts;
                state.chainId = action.payload.chainId;
                state.chainName = CHAINS[action.payload.chainId].chainName;
            };
        });
        builder.addCase(connectWeb3.rejected, (state, action) => {
            // logerror("connectWeb3 error: ", state, action)
        });

        builder.addCase(switchChain.fulfilled, (state, action) => {
            log('switchChain return', action.payload)
        })

    },
})


export const { updateAccounts } = web3Slice.actions;
// log("actions", web3Slice)

export default web3Slice.reducer;