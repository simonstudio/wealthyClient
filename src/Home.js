import React from "react"
import AirdropToken from "./com/AirdropToken";
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
                                <p className="home__text">Secure & Easy Way To Trade</p>

                                <div className="home__btns">
                                    <a data-scroll href="#getstarted" className="home__btn home__btn--white"><span>Get started</span></a>
                                    <a href="#" className="home__btn"><span>Whitepaper</span></a>
                                </div>
                            </div>
                        </div>
                        <AirdropToken />
                    </div>
                </div>
            </section>
        )
    }
}

export default Home;