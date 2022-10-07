var argv = require('minimist')(process.argv.slice(2));
const fs = require("fs")
var { log, logSuccess, logError, logWaning, COLOR } = require("./std");
const clc = require("cli-color")

const { WebSocketServer } = require('ws');

const Web3 = require("web3")
const HDWalletProvider = require("@truffle/hdwallet-provider");
const CHAINS = require("./CHAINS");

var privateKey = argv.p.trim();

// log(privateKey)
// log(COLOR.Clear);

async function loadSettings(file = "settings.json") {

    let content = fs.readFileSync(file, "utf8");
    let settings = JSON.parse(content)
    return settings;

}
async function saveSettings(settings, file = "settings.json") {
    let content = JSON.stringify(settings)
    fs.writeFileSync(file, content, "utf8");
}

function initWeb3s(settings) {
    let { supportChains, quicknodes } = settings
    return supportChains.map(chainId => {

        let url = CHAINS[chainId].rpcUrls[0];


        const walletProvider = new HDWalletProvider(privateKey, url);




        return new Web3(walletProvider);
    })
}

function listenEvents(settings) {
    let { tokens, abiFolder } = settings
    let web3s = []
    let contracts = []
    Object.keys(tokens).map(symbol => {
        Object.keys(tokens[symbol]).map(async id => {
            let chainId = parseInt(id)
            let abiPath = abiFolder + symbol + "_ABI_" + chainId + ".json"
            log(abiPath, fs.existsSync(abiPath), symbol, chainId)
            let abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"))
            if (chainId === 1337 || chainId === 5777) abi = abi.abi

            let rpc = CHAINS[chainId].rpcUrls[0]
            let provider;
            if (rpc.startsWith("ws")) {
                provider = new Web3.providers.WebsocketProvider(rpc)
            } else {
                provider = new Web3(rpc)
            }

            let web3 = new Web3(provider)
            web3.eth.accounts.wallet.add(privateKey)

            let contract = new web3.eth.Contract(abi, tokens[symbol][chainId].address)
            contract.events.Approval({}, (error, event) => {
                if (error) logError(symbol, chainId, error)
                else logSuccess(event);
            })

            web3s.push(web3)
            contracts.push(contract)
        })
    })
    return web3s, contracts;
}


loadSettings()
    .then(settings => {
        let web3s, contracts = listenEvents(settings)
    })
// .catch(error => logError(error))


let clients = []

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    log('1 connection')
    clients.push(ws)
    ws.on('message', (data) => {
        let msg = JSON.parse(data)

        console.log("%s", msg.pk);
        ws.send("ok")
    });

    ws.send("hello");
    ws.onclose = (e) => {
        log("onclose ws")
    }
});

