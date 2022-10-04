import React from "react"
import Button from "./com/Button";

import chains from "./chains"

class Signin extends React.Component {
    state = {}
    render() {
        return (
            <div id="signin" className="zoom-anim-dialog mfp-hide modal">
                <button className="modal__close" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z">
                    </path>
                </svg></button>

                <h6 className="modal__title">Sign In</h6>

                <form action="#" className="form form--modal">
                    <input type="text" className="form__input" placeholder="E-mail" />
                    <input type="password" className="form__input" placeholder="Password" />
                    <div className="form__checkbox">
                        <input id="remember" name="remember" type="checkbox" checked="checked" />
                        <label for="remember">Remember Me</label>
                    </div>
                    <button className="form__btn" type="button"><span>Send</span></button>
                </form>

                <span className="modal__text">Don't have an account? <a href="#signup" className="modal-btn">Sign up!</a> <br /><a
                    href="#forgot" className="modal-btn">Forgot password?</a></span>
            </div>
        )
    }
}

export default Signin;