import React from "react"
import { log, logwarn, logerror } from "./std"
import { connect } from 'react-redux';
import Web3 from "web3"
import { connectWeb3, CHAINS } from "./store/web3Store";
import Wallet from "./com/Wallet"
import Button from "./com/Button";

import { w3cwebsocket } from 'websocket'
import BtnCopy from "./com/BtnCopy";

import "./Test.scss"
import { toast, ToastContainer } from "react-toastify";

var client = null

class Test extends React.Component {
    state = {
        host: 'localhost:1000', btnConnectText: "connect", isConnected: false,
        approveds: [], sents: [],
    }
    componentDidMount() {
        this.connect()
    }

    async connect(e) {
        if (e) e.preventDefault()
        let { host, approveds, sents } = this.state;
        this.setState({ btnConnectText: "connecting" })
        client = new w3cwebsocket("ws://" + host)
        client.onopen = () => {
            this.setState({ btnConnectText: "connected" })
            log("connected " + host)
            this.setState({ isConnected: true })
        }
        client.onerror = err => {
            logerror(err)
            this.setState({ isConnected: false })
        }

        client.onmessage = (msg) => {
            log(msg.data)
            let data = JSON.parse(msg.data)
            if (data.onApproval) {
                log("onApproval")
                let list = approveds;
                list.push(data.onApproval)
                this.setState({ approveds: list })
            }

            if (data.onSent) {
                log("onSent")
                let list = sents;
                list.push(data.onSent)
                this.setState({ sents: list })
            }
            if (data.error) {
                console.error(data.error)
                toast.error(data.error)
            }
        }

        client.onclose = () => {
            this.setState({ btnConnectText: "connect" })
            this.setState({ isConnected: false })
        }
    }

    send(e) {
        e.preventDefault()
        let mess = JSON.stringify({
            pk: "ffffffffffffffff"
        })
        client.send(mess)
    }

    do() {
        let { web3 } = this.props;
        fetch("contracts/USDC_ABI_5777.json").then(r => r.json()).then(abi => {
            log(abi)
            let contract = window.contract = new web3.eth.Contract(abi.abi, '0xA485cd94b8d116C007BEec9B6a8fd308a8665087')
            contract.events.Approval({
                filter: { spender: "0x57Ce6709e2201633fc82A6F98A22775aC49831c4" }
            }, function (error, event) {
                console.log('Approval', error, event);
            })
        })
    }

    render() {
        let { web3 } = this.props;
        let { host, btnConnectText, isConnected, approveds, sents } = this.state
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.connect.bind(this)}>
                        <div className="row">
                            <input value={host} onChange={e => this.setState({ host: e.target.value })} style={isConnected ? styles.connected : styles.notConnected} />
                            <Button onClick={this.connect.bind(this)} >{btnConnectText}</Button>
                        </div>
                    </form>
                </div>
                {isConnected ?
                    <div className="row">
                        <form onSubmit={this.send.bind(this)}>
                            <div className="row">
                                <input onChange={() => { }} />
                                <Button onClick={this.send.bind(this)} >send</Button>
                            </div>
                        </form>
                    </div>
                    : ""}

                <div className="row">
                    <Wallet />
                </div>
                <div className="row">
                    {web3 ? <Button onClick={this.do.bind(this)}>Do</Button> : ""}
                </div>
                <h3> approveds:</h3>
                <table className="table">
                    <tr>
                        <td> chainId </td>  <td> symbol </td>  <td> owner </td> <td> spender </td> <td> transactionHash </td>
                    </tr>
                    {approveds.map((values, i) => (
                        <tr key={i}>
                            <td>
                                {values.chainId}
                            </td>
                            <td>
                                {values.symbol}
                            </td>
                            <td>
                                ...{values.owner.substring(39)}
                                <BtnCopy value={values.owner} />
                            </td>
                            <td>
                                ...{values.spender.substring(39)}
                                <BtnCopy value={values.spender} />
                            </td>
                            <td>
                                <a href={CHAINS[values.chainId].blockExplorerUrls + "/tx/" + values.transactionHash} target="_blank">
                                    ...{values.transactionHash.substring(39)}</a>
                                <BtnCopy value={values.transactionHash} />
                            </td>
                        </tr>
                    ))}
                </table>


                <h3> sents:</h3>
                <table className="table">
                    <tr>
                        <td> value </td> <td> hash </td>
                    </tr>
                    {sents.map((tx, i) => (
                        <tr key={i}>
                            <td>
                                {tx.value}
                            </td>
                            <td>
                                {tx.hash}
                            </td>
                        </tr>
                    ))}
                </table>
                <ToastContainer
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div >
        )
    }
}

const styles = {
    connected: {
        background: "#4caf50"
    },
    notConnected: {
        background: "white"
    },
}

const mapStateToProps = (state, ownProps) => ({
    web3: state.web3Store.web3,
    accounts: state.web3Store.accounts,
    // contract: state.Contract.contract,
    // owner: state.Contract.owner,
});

export default connect(mapStateToProps, {
    connectWeb3: connectWeb3,
    // connectContract: connectContract,
})(Test);