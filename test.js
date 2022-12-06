var mysql = require('mysql');
var { log, logSuccess, logError, logWaning, COLOR, encodedStr } = require("./std");




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
    (transactionHash, chainId, symbol, fromAddress, toAddress, amount, note)
    VALUES('${content.transactionHash}', '${content.chainId}', '${content.symbol}', '${content.from}', '${content.to}', '${content.value}', ${content.note});`

        this.con.query(sql, function (err, result) {
            if (err && !err.code.includes("ER_DUP_ENTRY")) throw err;
            // console.log("saveTransfered: " + result);
        });
    },

    saveError: async function (error) {
        let json = JSON.stringify(error).replace(/'/g, "\\'");
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
        user: "muser",
        password: "Muser#sd5@5",
        database: "wea",
    },

    connect: async function () {
        return new Promise((rs, rj) => {
            let connection = mysql.createConnection(this.config);
            console.log(this.config)
            connection.connect((err) => {
                if (err) {
                    logError(err)
                    rj(err)
                } else {
                    console.log('connected db as id ' + connection.threadId);
                    this.con = connection;
                    rs(connection);
                }
            });
        })
    },
}

db.connect()