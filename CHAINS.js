const Web3 = require("web3")

const dev = {
    TEST: 'TEST',
    MAINNET: 'MAINNET'
}

const CHAINS = {
    1337: {
        id: 1337,
        nativeCurrency: {
            name: 'ETH', decimals: 18, symbol: 'ETH'
        },
        chainId: Web3.utils.toHex(1337),
        rpcUrls: ['HTTP://127.0.0.1:8545'],
        chainName: 'Local',
        blockExplorerUrls: "http://localhost:8545",
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
        blockExplorerUrls: "http://localhost:8545",
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

module.exports = CHAINS, { dev }
