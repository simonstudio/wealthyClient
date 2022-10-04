import React from "react"
import Button from "./com/Button";
class Home extends React.Component {
    render() {
        return (
            <section id="home" className="home section--bg" data-bg="img/home/slide.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-7">
                            <div className="home__content home__content--left">
                                <h1 className="home__title">BuyCoin Blockchain</h1>
                                <Button href="#sad" text="dsfsdf" />

                                <p className="home__text">Secure & Easy Way To Trade</p>

                                <div className="home__btns">
                                    <a data-scroll href="#getstarted" className="home__btn home__btn--white"><span>Get started</span></a>
                                    <a href="#" className="home__btn"><span>Whitepaper</span></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-5 offset-xl-0">
                            <div className="home__content home__content--right">
                                <div className="home__sales">
                                    <h3>BuyCoin ICO:</h3>

                                    <p>Discount 33% from final price</p>

                                    <div className="progress progress--small">
                                        <div className="progress-bar" role="progressbar" style={{ "width": "70%" }} aria-valuenow="70"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                        <div className="progress__line" style={{ "left": "8%" }}><svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
                                        </svg> 900K</div>
                                        <div className="progress__line" style={{ "left": "40%" }}><svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
                                        </svg> 5M</div>
                                        <div className="progress__value">12M USD</div>
                                    </div>

                                    <p>Fixed token edition 3.000.000 BITS</p>

                                    <a href="#" className="section__btn"><span>Buy Tokens</span></a>

                                    <ul>
                                        <li><i className="pf pf-visa"></i></li>
                                        <li><i className="pf pf-mastercard"></i></li>
                                        <li><i className="pf pf-paypal"></i></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Home;