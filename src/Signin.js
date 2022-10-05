import React from "react"
import { connect } from 'react-redux';
import { log, logwarn, logerror } from "./std"
import Button from "./com/Button";
import Web3 from "web3"
import { ToastContainer, toast } from 'react-toastify';
import { connectWeb3 } from "./store/web3Store";

import { notify } from "./store/toast";


class Signin extends React.Component {
    state = {}

    connectWeb3(e) {
        alert("Some tj")
    }


    render() {
        return (
            <div id="signin" className="zoom-anim-dialog mfp-hide modal" onMouseOver={(e) => { alert('asdasdasdasd') }}>
                <button onClick={() => { logwarn("asdsdfds") }}>ssssssssssssss</button>
                <button className="modal__close" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z">
                    </path>
                </svg>
                </button>
                {/* <img src="img/metamask.svg" /> */}
                <h6 className="modal__title" onClick={this.connectWeb3.bind(this)}>METAMASK</h6>

                <Button text="CONNECT" />
                {/* <span className="modal__text">Don't have an account? <a href="#signup" className="modal-btn">Sign up!</a> <br /><a
                    href="#forgot" className="modal-btn">Forgot password?</a></span> */}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    web3: state.web3Store.web3,
    accounts: state.web3Store.accounts,
    // contract: state.Contract.contract,
    // owner: state.Contract.owner,
});

export default connect(mapStateToProps, {
    notify,
    connectWeb3: connectWeb3,
    // connectContract: connectContract,
})(Signin);