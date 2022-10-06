var argv = require('minimist')(process.argv.slice(2));
const fs = require("fs")
var { log, logSuccess, logError, logWaning, COLOR } = require("./std");
const clc = require("cli-color")
// var WebSocketServer = require('websocket').server;

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

function listenEvent(web3s = [], settings) {
    let { tokens, abiFolder } = settings
    return Object.keys(tokens).map(symbol => {
        return Object.keys(tokens[symbol]).map(async id => {
            let chainId = parseInt(id)
            let abiPath = abiFolder + symbol + "_ABI_" + chainId + ".json"
            log(abiPath, fs.existsSync(abiPath))
            let abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"))

            return web3s.map(web3 => web3.eth.getChainId().then(async _chainId => {

                if (_chainId === 1337) _chainId = 5777;
                if (_chainId === chainId) {
                    log(symbol, _chainId, chainId, _chainId === chainId)
                    let contract = await new web3.eth.Contract(chainId == 5777 ? abi.abi : abi, tokens[symbol][chainId].address);
                    log(contract.events.Approval({}, (error, event) => {
                        if (error)
                            logError(error, chainId)
                        else logSuccess(event)
                    }))
                    return contract
                }
            }))
        })
    })
}


loadSettings()
    .then(settings => {
        let web3s = initWeb3s(settings)
        listenEvent(web3s, settings)
    })
    // .catch(error => logError(error))





/*


var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

*/