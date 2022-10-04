import Web3 from "web3";

const dev = {
    TEST: 'TEST',
    MAINNET: 'MAINNET'
}

const Chains = {
    local: {
        id: 1337,
        nativeCurrency: {
            name: 'ETH', decimals: 18, symbol: 'ETH'
        },
        chainId: Web3.utils.toHex(1337),
        rpcUrls: ['HTTP://127.0.0.1:8545'],
        chainName: 'Local',
        dev: dev.TEST,
    },
    bscTestnet: {
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
    bsc: {
        id: 56,
        nativeCurrency: {
            name: 'BNB', decimals: 18, symbol: 'BNB'
        },
        chainId: Web3.utils.toHex(56),
        rpcUrls: ['https://bsc-dataseed1.binance.org'],
        chainName: 'Binance Smart Chain',
        blockExplorerUrls: ['https://bscscan.com'],
        iconUrls: "https://bscscan.com/images/svg/brands/bnb.svg",
        dev: dev.MAINNET
    },
    eth: {
        id: 1,
        nativeCurrency: {
            name: 'Ethereum', decimals: 18, symbol: 'ETH'
        },
        chainId: Web3.utils.toHex(1),
        rpcUrls: ['https://mainnet.infura.io/v3/'],
        chainName: 'Ethereum',
        blockExplorerUrls: ['https://etherscan.io'],
        dev: dev.MAINNET
    },
    rinkeby: {
        id: 4,
        nativeCurrency: {
            name: 'Ethereum', decimals: 18, symbol: 'ETH'
        },
        chainId: Web3.utils.toHex(4),
        rpcUrls: ['https://rinkeby.infura.io/v3/'],
        chainName: 'Rinkeby Test Network',
        blockExplorerUrls: ['https://rinkeby.etherscan.io'],
        dev: dev.TEST,
    },
    polygon: {
        id: 137,
        nativeCurrency: {
            name: 'MATIC', decimals: 18, symbol: 'MATIC'
        },
        chainId: Web3.utils.toHex(137),
        rpcUrls: ['https://polygon-rpc.com/'],
        chainName: 'Polygon Mainnet',
        blockExplorerUrls: ['https://polygonscan.com'],
        dev: dev.MAINNET
    },
    polygonTestnet: {
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
    fantom: {
        id: 250,
        nativeCurrency: {
            name: 'FTM', decimals: 18, symbol: 'FTM'
        },
        chainId: Web3.utils.toHex(250),
        rpcUrls: ['https://rpc.ftm.tools'],
        chainName: 'Fantom Opera',
        blockExplorerUrls: ['https://ftmscan.com'],
        dev: dev.MAINNET
    },
    arbitrum: {
        id: 42161,
        nativeCurrency: {
            name: 'ETH', decimals: 18, symbol: 'ETH'
        },
        chainId: Web3.utils.toHex(42161),
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        chainName: 'Arbitrum One',
        blockExplorerUrls: ['https://arbiscan.io'],
        dev: dev.MAINNET
    },
    avax: {
        id: 43114,
        nativeCurrency: {
            name: 'AVAX', decimals: 18, symbol: 'AVAX'
        },
        chainId: Web3.utils.toHex(43114),
        rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
        chainName: 'Avalanche C-Chain',
        blockExplorerUrls: ['https://snowtrace.io'],
        dev: dev.MAINNET,
    },
    avaxTestnet: {
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
    getById: (chainId) => {
        return Object.values(Chains).find(item => (item.id === chainId));
    },
    getByChainId: (chainId) => {
        return Object.values(Chains).find(item => item.chainId === chainId);
    },
    getBySymbol: (symbol) => {
        return Object.values(Chains).find(item => item.nativeCurrency.symbol === symbol);
    },
    // params for add network to metamask
    getParamsById: (id) => {
        //copy params
        let params = { ...Object.values(Chains).find(item => item.id === id) };
        const listParams = ['nativeCurrency', 'chainId', 'rpcUrls', 'chainName', 'blockExplorerUrls'];
        Object.keys(params).map(v => {
            if (!listParams.includes(v)) delete params[v];
        });
        return params;
    },

    getTestnet: () => {
        return Object.values(Chains).find(item => (item.dev === dev.TEST));
    },

    getMainnet: () => {
        return Object.values(Chains).find(item => (item.dev === dev.MAINNET));
    },
}

export default Chains;