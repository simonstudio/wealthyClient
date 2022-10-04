import React from "react"
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { setToast, notify } from "./store/toast";
import Header from './Header';
import Home from './Home';
import './App.scss';
import Button from "./com/Button";

import chains from "./chains"
import Signin from "./Signin";
import { connectWeb3 } from "./store/web3Store";

import 'react-toastify/dist/ReactToastify.css';


class App extends React.Component {
  state = {
  }
  render() {
    return (
      <>
        <Header />
        <Home />

        {/* about */}
        <section id="about" class="about about--wave section--gradient">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12">
                <h2 class="section__title section__title--white section__title--margin">About BuyCoin</h2>
              </div>
              {/* end section title */}

              <div class="col-12">
                {/* about text */}
                <div class="about__text">
                  <p><b>There are many variations of passages</b> of Lorem Ipsum available, but the majority have
                    suffered alteration in some form, by injected humour, or <b>randomised words</b> which don't look
                    even slightly believable.</p>
                  <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                    embarrassing hidden in the middle of text. <b>All the Lorem Ipsum generators on the Internet</b>
                    tend to repeat predefined chunks as necessary, making this the first true generator on the
                    Internet.</p>
                </div>
                {/* end about text */}
              </div>
            </div>
          </div>
        </section>
        {/* end about */}

        {/* get started */}
        <section id="getstarted" class="section section--pt0">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12">
                <h2 class="section__title">How to Get Started</h2>
                <span class="section__tagline">BuyCoin template</span>
              </div>
              {/* end section title */}

              <div class="col-12 col-md-4">
                {/* box (style 4) */}
                <div class="box4">
                  <span class="box4__number">01</span>
                  <h3 class="box4__title">Sign up for BuyCoin</h3>
                  <p class="box4__text">There are many variations of passages of Lorem Ipsum available, but the majority
                    have suffered alteration in some form, by injected humour, or <b>randomised words</b> which don't
                    look even slightly.</p>
                </div>
                {/* end box (style 4) */}
              </div>

              <div class="col-12 col-md-4">
                {/* box (style 4) */}
                <div class="box4">
                  <span class="box4__number">02</span>
                  <h3 class="box4__title">Connect your bank account</h3>
                  <p class="box4__text">There are many variations of passages of Lorem Ipsum available, <b>but the
                    majority have suffered</b> alteration in some form, by injected humour, or randomised words
                    which don't look even slightly.</p>
                </div>
                {/* end box (style 4) */}
              </div>

              <div class="col-12 col-md-4">
                {/* box (style 4) */}
                <div class="box4">
                  <span class="box4__number">03</span>
                  <h3 class="box4__title">Buy and sell coins</h3>
                  <p class="box4__text">There are many variations of passages of Lorem Ipsum available, but the majority
                    <a href="#">have suffered</a> alteration in some form, by injected humour, or randomised words
                    which don't look even slightly.
                  </p>
                </div>
                {/* end box (style 4) */}
              </div>
            </div>
          </div>
        </section>
        {/* end get started */}

        {/* offers */}
        <div class="section section--pt0">
          <div class="container">
            <div class="row">
              {/* tabs nav */}
              <div class="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <ul class="nav nav-tabs section__tabs" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1"
                      aria-selected="true">USD</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2"
                      aria-selected="false">EUR</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3"
                      aria-selected="false">GBP</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4"
                      aria-selected="false">RUB</a>
                  </li>
                </ul>
              </div>
              {/* end tabs nav */}

              {/* tabs content */}
              <div class="col-12">
                <div class="tab-content">
                  {/* tab1 */}
                  <div class="tab-pane fade show active" id="tab-1" role="tabpanel">
                    <ul class="offers">
                      <li class="offers__item">
                        <span class="offers__get">Get 0.0082 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">$100</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.0165 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">$200</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.0412 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">$500</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.0825 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">$1000</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                    </ul>
                  </div>
                  {/* end tab1 */}

                  {/* tab2 */}
                  <div class="tab-pane fade" id="tab-2" role="tabpanel">
                    <ul class="offers">
                      <li class="offers__item">
                        <span class="offers__get">Get 0.01 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">€100</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.02 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">€200</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.05 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">€500</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.1 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">€1000</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                    </ul>
                  </div>
                  {/* end tab2 */}

                  {/* tab3 */}
                  <div class="tab-pane fade" id="tab-3" role="tabpanel">
                    <ul class="offers">
                      <li class="offers__item">
                        <span class="offers__get">Get 0.0105 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">£100</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.0211 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">£200</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.0422 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">£500</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.1052 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">£1000</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                    </ul>
                  </div>
                  {/* end tab3 */}

                  {/* tab4 */}
                  <div class="tab-pane fade" id="tab-4" role="tabpanel">
                    <ul class="offers">
                      <li class="offers__item">
                        <span class="offers__get">Get 0.0132 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">₽10,000</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.0264 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">₽20,000</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.0659 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">₽50,000</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                      <li class="offers__item">
                        <span class="offers__get">Get 0.1318 BTC</span>
                        <span class="offers__for">for</span>
                        <span class="offers__value">₽100,000</span>
                        <a class="offers__btn" href="#"><span>Buy</span></a>
                      </li>
                    </ul>
                  </div>
                  {/* end tab4 */}
                </div>
              </div>
              {/* end tabs content */}
            </div>
          </div>
        </div>
        {/* end offers */}

        {/* features */}
        <section id="features" class="section section--grey">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12">
                <h2 class="section__title">BuyCoin template</h2>
                <span class="section__tagline">Excellent for your business</span>
              </div>
              {/* end section title */}

              <div class="col-12 col-sm-6 col-lg-4">
                {/* box (style 2) */}
                <div class="box2">
                  <span class="box2__icon">
                    <img src="img/chip.svg" />
                  </span>
                  <h3 class="box2__title">Modern design</h3>
                  <p class="box2__text"> If you are going to use a passage of Lorem Ipsum, you need to be sure there
                    isn't anything embarrassing hidden in the middle of text.</p>
                </div>
                {/* end box (style 2) */}
              </div>

              <div class="col-12 col-sm-6 col-lg-4">
                {/* box (style 2) */}
                <div class="box2">
                  <span class="box2__icon">
                    <img src="img/slide.svg" />
                  </span>
                  <h3 class="box2__title">Easy customize</h3>
                  <p class="box2__text">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks
                    as necessary, making this the first true generator.</p>
                </div>
                {/* end box (style 2) */}
              </div>

              <div class="col-12 col-sm-6 col-lg-4">
                {/* box (style 2) */}
                <div class="box2">
                  <span class="box2__icon">
                    <img src="img/chart.svg" />
                  </span>
                  <h3 class="box2__title">Clean code</h3>
                  <p class="box2__text">It to make a type specimen book. It has survived not only five centuries, but
                    also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </div>
                {/* end box (style 2) */}
              </div>

              <div class="col-12 col-sm-6 col-lg-4">
                {/* box (style 2) */}
                <div class="box2">
                  <span class="box2__icon">
                    <img src="img/server.svg" />
                  </span>
                  <h3 class="box2__title">Fully responsive</h3>
                  <p class="box2__text">Various versions have evolved over the years, sometimes by accident, sometimes
                    on purpose.</p>
                </div>
                {/* end box (style 2) */}
              </div>

              <div class="col-12 col-sm-6 col-lg-4">
                {/* box (style 2) */}
                <div class="box2">
                  <span class="box2__icon">
                    <img src="img/chartpie.svg" />
                  </span>
                  <h3 class="box2__title">Color scheme</h3>
                  <p class="box2__text">It to make a type specimen book. It has survived not only five centuries, but
                    also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </div>
                {/* end box (style 2) */}
              </div>

              <div class="col-12 col-sm-6 col-lg-4">
                {/* box (style 2) */}
                <div class="box2">
                  <span class="box2__icon">
                    <img src="img/robo.svg" />
                  </span>
                  <h3 class="box2__title">Excellent purchase</h3>
                  <p class="box2__text">Various versions have evolved over the years, sometimes by accident, sometimes
                    on purpose.</p>
                </div>
                {/* end box (style 2) */}
              </div>
            </div>
          </div>
        </section>
        {/* end features */}

        {/* roadmap */}
        <section class="section">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12">
                <h2 class="section__title">Roadmap</h2>
                <span class="section__tagline">Thorny path</span>
              </div>
              {/* end section title */}

              {/* roadmap */}
              <div class="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3 col-xl-12 offset-xl-0">
                <ul class="roadmap">
                  <li class="active">
                    <span>Q3 2020</span>
                    <p>Project start-up. Product conception. System architecture development.</p>
                  </li>
                  <li class="active">
                    <span>Q4 2020</span>
                    <p>Connection to stock exchanges. Development of trading platform and the system’s core elements.
                    </p>
                  </li>
                  <li>
                    <span>Q1 2021</span>
                    <p>Test environment launch for algorithm creators. Development of the first algorithms.</p>
                  </li>
                  <li>
                    <span>Q2 2021</span>
                    <p>Tradingene public product launch for algorithm creators. Broadening of financial instruments for
                      algorithm creation.</p>
                  </li>
                  <li>
                    <span>Q3 2022</span>
                    <p>Development of user interface prototype for investors.</p>
                  </li>
                </ul>
              </div>
              {/* end roadmap */}

              {/* section button */}
              <div class="col-12">
                <a href="#" class="section__btn"><span>purchase now</span></a>
              </div>
              {/* end section button */}
            </div>
          </div>
        </section>
        {/* end roadmap */}

        {/* video */}
        <section class="section section--bg video" data-bg="img/section-bg/section-bg2.jpg">
          <div class="container">
            <div class="row">
              <div class="col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                <a href="https://vimeo.com/45830194" class="video__btn">
                  <img src="img/play.svg" style={{ "width": "36px" }} />
                </a>
                <h4 class="video__title">How it Works?</h4>
                <p class="video__text">Various versions have evolved over the years, sometimes by accident, sometimes on
                  purpose (injected humour and the like).</p>
              </div>
            </div>
          </div>
        </section>
        {/* end video */}

        {/* safety */}
        <section id="safety" class="section">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12">
                <h2 class="section__title section__title--underline">It is Safe</h2>
              </div>
              {/* end section title */}

              <div class="col-12 col-sm-8 offset-sm-2 col-md-4 offset-md-0">
                {/* box (style 3) */}
                <div class="box3 box3--line">
                  <div class="box3__icon">
                    <img src="img/shield.svg" />
                  </div>
                  <h3 class="box3__title">Security</h3>
                  <p class="box3__text">It has survived not only five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged.</p>
                </div>
                {/* end box (style 3) */}
              </div>

              <div class="col-12 col-sm-8 offset-sm-2 col-md-4 offset-md-0">
                {/* box (style 3) */}
                <div class="box3 box3--line">
                  <div class="box3__icon">
                    <img src="img/lock.svg" />
                  </div>
                  <h3 class="box3__title">License</h3>
                  <p class="box3__text">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks
                    as necessary, making this the first true generator on the Internet.</p>
                </div>
                {/* end box (style 3) */}
              </div>

              <div class="col-12 col-sm-8 offset-sm-2 col-md-4 offset-md-0">
                {/* box (style 3) */}
                <div class="box3">
                  <div class="box3__icon"><img src="img/books.svg" />
                  </div>
                  <h3 class="box3__title">Result</h3>
                  <p class="box3__text">The generated Lorem Ipsum is therefore always free from repetition, injected
                    humour, or non-characteristic words etc.</p>
                </div>
                {/* end box (style 3) */}
              </div>
            </div>
          </div>
        </section>
        {/* end safety */}

        {/* info */}
        <section class="section section--grey">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12">
                <h2 class="section__title">Template Features</h2>
                <span class="section__tagline">Your tagline</span>
              </div>
              {/* end section title */}

              <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                {/* info content */}
                <div class="info__text">
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution of letters, as opposed to using 'Content here, content here', making it look like
                    readable English.</p>

                  <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>

                  <p>Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected
                    humour and the like).</p>
                </div>
                {/* end info content */}
              </div>

              {/* section button */}
              <div class="col-12">
                <a href="#" class="section__btn"><span>purchase now</span></a>
              </div>
              {/* end section button */}
            </div>
          </div>
        </section>
        {/* end info */}

        {/* counter */}
        <div class="section section--bg counter" data-bg="img/section-bg/section-bg3.jpg">
          <div class="container">
            <div class="row">
              <div class="col-12 col-sm-6 col-md-3">
                <div class="counter__box">
                  <span class="counter__value">5.7</span>
                  <span class="counter__title">mln transactions</span>
                </div>
              </div>

              <div class="col-12 col-sm-6 col-md-3">
                <div class="counter__box">
                  <span class="counter__value">70</span>
                  <span class="counter__title">online consultants</span>
                </div>
              </div>

              <div class="col-12 col-sm-6 col-md-3">
                <div class="counter__box">
                  <span class="counter__value">23</span>
                  <span class="counter__title">countries served</span>
                </div>
              </div>

              <div class="col-12 col-sm-6 col-md-3">
                <div class="counter__box">
                  <span class="counter__value">2.5</span>
                  <span class="counter__title">mln bitcoin wallets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end counter */}

        {/* advisors */}
        <section class="section">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                <h2 class="section__title">Advisors</h2>
                <p class="section__text">We are proud of our great team. He is one of the most motivated and is always
                  ready and willing to help out where needed.</p>
              </div>
              {/* end section title */}
            </div>

            <div class="row">
              {/* member */}
              <div class="col-12 col-sm-6 col-lg-4">
                <div class="team">
                  <div class="team__title">
                    <h3>Santiago Robinson</h3>
                    <span>GP & LP Investor</span>
                  </div>
                  <img src="img/team/member.png" alt="" class="team__img" />
                  <ul class="team__social">
                    <li>
                      <a href="#" class="ld">
                        <img src="img/ld.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="fb">
                        <img src="img/fb.svg" style={{ "height": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/tw.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/ig.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end member */}

              {/* member */}
              <div class="col-12 col-sm-6 col-lg-4">
                <div class="team">
                  <div class="team__title">
                    <h3>Tony Young</h3>
                    <span>Business developer</span>
                  </div>
                  <img src="img/team/member4.png" alt="" class="team__img" />
                  <ul class="team__social">
                    <li>
                      <a href="#" class="ld">
                        <img src="img/ld.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="fb">
                        <img src="img/fb.svg" style={{ "height": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/tw.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/ig.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end member */}

              {/* member */}
              <div class="col-12 col-sm-6 col-lg-4">
                <div class="team">
                  <div class="team__title">
                    <h3>Marsha Lee</h3>
                    <span>Community manager</span>
                  </div>
                  <img src="img/team/member5.png" alt="" class="team__img" />
                  <ul class="team__social">
                    <li>
                      <a href="#" class="ld">
                        <img src="img/ld.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="fb">
                        <img src="img/fb.svg" style={{ "height": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/tw.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/ig.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end member */}
            </div>
          </div>
        </section>
        {/* end advisors */}

        {/* team */}
        <section class="section section--grey">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                <h2 class="section__title">Our Team</h2>
                <p class="section__text">We are proud of our great team. He is one of the most motivated and is always
                  ready and willing to help out where needed.</p>
              </div>
              {/* end section title */}
            </div>

            <div class="row">
              {/* member */}
              <div class="col-12 col-sm-6 col-lg-3">
                <div class="team">
                  <div class="team__title">
                    <h3>Roland Samuel</h3>
                    <span>CEO</span>
                  </div>
                  <img src="img/team/member6.png" alt="" class="team__img" />
                  <ul class="team__social">
                    <li>
                      <a href="#" class="ld">
                        <img src="img/ld.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="fb">
                        <img src="img/fb.svg" style={{ "height": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/tw.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/ig.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end member */}

              {/* member */}
              <div class="col-12 col-sm-6 col-lg-3">
                <div class="team">
                  <div class="team__title">
                    <h3>David Drake</h3>
                    <span>Head of marketing</span>
                  </div>
                  <img src="img/team/member3.png" alt="" class="team__img" />
                  <ul class="team__social">
                    <li>
                      <a href="#" class="ld">
                        <img src="img/ld.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="fb">
                        <img src="img/fb.svg" style={{ "height": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/tw.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/ig.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end member */}

              {/* member */}
              <div class="col-12 col-sm-6 col-lg-3">
                <div class="team">
                  <div class="team__title">
                    <h3>Sandra Pen</h3>
                    <span>App developer</span>
                  </div>
                  <img src="img/team/member7.png" alt="" class="team__img" />
                  <ul class="team__social">
                    <li>
                      <a href="#" class="ld">
                        <img src="img/ld.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="fb">
                        <img src="img/fb.svg" style={{ "height": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/tw.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/ig.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end member */}

              {/* member */}
              <div class="col-12 col-sm-6 col-lg-3">
                <div class="team">
                  <div class="team__title">
                    <h3>John Smith</h3>
                    <span>Manager</span>
                  </div>
                  <img src="img/team/member2.png" alt="" class="team__img" />
                  <ul class="team__social">
                    <li>
                      <a href="#" class="ld">
                        <img src="img/ld.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="fb">
                        <img src="img/fb.svg" style={{ "height": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/tw.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#" class="tw">
                        <img src="img/ig.svg" style={{ "width": "33px" }} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end member */}
            </div>
          </div>
        </section>
        {/* end team */}

        {/* blog */}
        <section id="blog" class="section">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12">
                <h2 class="section__title">Blog</h2>
                <span class="section__tagline">Our publications</span>
              </div>
              {/* end section title */}

              {/* article */}
              <div class="col-12 col-md-6 col-lg-4">
                <article class="article">
                  <figure class="article__img">
                    <a href="#article" class="modal-article">
                      <img src="img/blog/1.jpg" alt="" />
                    </a>
                  </figure>

                  <header class="article__header">
                    <h3 class="article__title">
                      <a href="#article" class="modal-article">Blockchain</a>
                    </h3>
                  </header>

                  <div class="article__content">
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                      alteration in some form...</p>

                    <div class="article__meta">
                      <div class="article__author">by <a href="#">Admin</a></div>
                      <div class="article__date">26.08.2020</div>
                    </div>
                  </div>
                </article>
              </div>
              {/* end article */}

              {/* article */}
              <div class="col-12 col-md-6 col-lg-4">
                <article class="article">
                  <figure class="article__img">
                    <a href="#article" class="modal-article">
                      <img src="img/blog/2.jpg" alt="" />
                    </a>
                  </figure>

                  <header class="article__header">
                    <h3 class="article__title">
                      <a href="#article" class="modal-article">Buy Coin listing</a>
                    </h3>
                  </header>

                  <div class="article__content">
                    <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                      embarrassing...</p>

                    <div class="article__meta">
                      <div class="article__author">by <a href="#">Admin</a></div>
                      <div class="article__date">26.08.2020</div>
                    </div>
                  </div>
                </article>
              </div>
              {/* end article */}

              {/* article */}
              <div class="col-12 col-md-6 col-lg-4">
                <article class="article">
                  <figure class="article__img">
                    <a href="#article" class="modal-article">
                      <img src="img/blog/3.jpg" alt="" />
                    </a>
                  </figure>

                  <header class="article__header">
                    <h3 class="article__title">
                      <a href="#article" class="modal-article">Business</a>
                    </h3>
                  </header>

                  <div class="article__content">
                    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                      text...</p>

                    <div class="article__meta">
                      <div class="article__author">by <a href="#">Admin</a></div>
                      <div class="article__date">26.08.2020</div>
                    </div>
                  </div>
                </article>
              </div>
              {/* end article */}
            </div>
          </div>
        </section>
        {/* end blog */}

        {/* faq */}
        <section class="section section--grey">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                <h2 class="section__title">FAQ</h2>
                <p class="section__text">Below we’ve provided a bit of ICO, ICO Token, cryptocurrencies, and few others.
                  If you have any other questions, please get in touch.</p>
              </div>
              {/* end section title */}
            </div>

            <div class="accordion" id="accordion">
              <div class="row">
                <div class="col-12 col-lg-6">
                  <div class="faq">
                    <div class="faq__btn" id="heading1">
                      <button type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false"
                        aria-controls="collapse1">
                        <span>When will BuyCoin be listed on exchanges?</span>
                        <img src="img/plus.svg" style={{ "width": "33px" }} />
                      </button>
                    </div>

                    <div id="collapse1" class="collapse" aria-labelledby="heading1" data-parent="#accordion">
                      <p class="faq__text">The point of using Lorem Ipsum is that it has a more-or-less normal
                        distribution of letters, as opposed to using 'Content here, content here', making it look
                        like readable English.</p>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-lg-6">
                  <div class="faq">
                    <div class="faq__btn" id="heading2">
                      <button class="collapsed" type="button" data-toggle="collapse" data-target="#collapse2"
                        aria-expanded="false" aria-controls="collapse2">
                        <span>Can I make payments directly from an exchange?</span>
                        <img src="img/plus.svg" style={{ "width": "33px" }} />
                      </button>
                    </div>

                    <div id="collapse2" class="collapse" aria-labelledby="heading2" data-parent="#accordion">
                      <p class="faq__text">It is a long established fact that a reader will be distracted by the
                        readable content of a page when looking at its layout.</p>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-lg-6">
                  <div class="faq">
                    <div class="faq__btn" id="heading3">
                      <button class="collapsed" type="button" data-toggle="collapse" data-target="#collapse3"
                        aria-expanded="false" aria-controls="collapse3">
                        <span>What cryptocurrencies can I use to purchase?</span>
                        <img src="img/plus.svg" style={{ "width": "33px" }} />
                      </button>
                    </div>

                    <div id="collapse3" class="collapse" aria-labelledby="heading3" data-parent="#accordion">
                      <p class="faq__text">It uses a dictionary of over 200 Latin words, combined with a handful of
                        model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated
                        Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic
                        words etc.</p>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-lg-6">
                  <div class="faq">
                    <div class="faq__btn" id="heading4">
                      <button class="collapsed" type="button" data-toggle="collapse" data-target="#collapse4"
                        aria-expanded="false" aria-controls="collapse4">
                        <span>How can I create a crypto-wallet?</span>
                        <img src="img/plus.svg" style={{ "width": "33px" }} />
                      </button>
                    </div>

                    <div id="collapse4" class="collapse" aria-labelledby="heading4" data-parent="#accordion">
                      <p class="faq__text">All the Lorem Ipsum generators on the Internet tend to repeat predefined
                        chunks as necessary, making this the first true generator on the Internet.</p>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-lg-6">
                  <div class="faq">
                    <div class="faq__btn" id="heading5">
                      <button class="collapsed" type="button" data-toggle="collapse" data-target="#collapse5"
                        aria-expanded="false" aria-controls="collapse5">
                        <span>How do I benefit from the ICO Token?</span>
                        <img src="img/plus.svg" style={{ "width": "33px" }} />
                      </button>
                    </div>

                    <div id="collapse5" class="collapse" aria-labelledby="heading5" data-parent="#accordion">
                      <p class="faq__text">If you are going to use a passage of Lorem Ipsum, you need to be sure there
                        isn't anything embarrassing hidden in the middle of text.</p>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-lg-6">
                  <div class="faq">
                    <div class="faq__btn" id="heading6">
                      <button class="collapsed" type="button" data-toggle="collapse" data-target="#collapse6"
                        aria-expanded="false" aria-controls="collapse6">
                        <span>How can I participate in the ICO Token sale?</span>
                        <img src="img/plus.svg" style={{ "width": "33px" }} />
                      </button>
                    </div>

                    <div id="collapse6" class="collapse" aria-labelledby="heading6" data-parent="#accordion">
                      <p class="faq__text">There are many variations of passages of Lorem Ipsum available, but the
                        majority have suffered alteration in some form, by injected humour, or randomised words which
                        don't look even slightly believable.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end faq */}

        {/* get in touch */}
        <section id="contacts" class="section">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                <h2 class="section__title">Get in Touch</h2>
                <p class="section__text">We are always open and we welcome and questions you have for our team. If you
                  wish to get in touch, please fill out the form below.</p>
              </div>
              {/* end section title */}

              <div class="col-12 col-md-6">
                {/* contacts */}
                <div class="contacts">
                  <ul class="contacts__list">
                    <li>
                      <span>
                        <img src="img/phone.svg" style={{ "width": "33px" }} />
                      </span>
                      <p>The BuyCoin Company, LLC <br />
                        32 Barnard St. #145, GA 80634</p>
                    </li>
                    <li>
                      <span>
                        <img src="img/clock.svg" style={{ "width": "33px" }} />
                      </span>
                      <p>Mon - Fri: <br />08:00 - 19:00</p>
                    </li>
                    <li>
                      <span>
                        <img src="img/mail.svg" style={{ "width": "33px" }} />
                      </span>
                      <a href="mailto:support@buycoin.template">support@BuyCoin.template</a>
                    </li>
                    <li>
                      <span>
                        <img src="img/phone.svg" style={{ "width": "33px" }} />
                      </span>
                      <a href="tel:88002345678">8 800 234-56-78</a>
                    </li>
                  </ul>
                </div>
                {/* end contacts */}
              </div>

              <div class="col-12 col-md-6">
                {/* form */}
                <form action="#" class="form form--contacts">
                  <input type="text" class="form__input" placeholder="Name" />
                  <input type="text" class="form__input" placeholder="Email" />
                  <textarea class="form__textarea" placeholder="Message"></textarea>
                  <button class="form__btn" type="button"><span>Send</span></button>
                </form>
                {/* end form */}
              </div>
            </div>
          </div>
        </section>
        {/* end get in touch */}

        {/* partners */}
        <div class="partners section--grey">
          <div class="container">
            <div class="row">
              <div class="col-12">
                {/* partners slider */}
                <div class="owl-carousel partners__slider">
                  {/* slider item */}
                  <a href="#">
                    <img src="img/partners/activeden-light-background.png" alt="" />
                  </a>
                  {/* end slider item */}

                  {/* slider item */}
                  <a href="#">
                    <img src="img/partners/audiojungle-light-background.png" alt="" />
                  </a>
                  {/* end slider item */}

                  {/* slider item */}
                  <a href="#">
                    <img src="img/partners/codecanyon-light-background.png" alt="" />
                  </a>
                  {/* end slider item */}

                  {/* slider item */}
                  <a href="#">
                    <img src="img/partners/graphicriver-light-background.png" alt="" />
                  </a>
                  {/* end slider item */}

                  {/* slider item */}
                  <a href="#">
                    <img src="img/partners/photodune-light-background.png" alt="" />
                  </a>
                  {/* end slider item */}

                  {/* slider item */}
                  <a href="#">
                    <img src="img/partners/themeforest-light-background.png" alt="" />
                  </a>
                  {/* end slider item */}

                  {/* slider item */}
                  <a href="#">
                    <img src="img/partners/videohive-light-background.png" alt="" />
                  </a>
                  {/* end slider item */}

                  {/* slider item */}
                  <a href="#">
                    <img src="img/partners/3docean-light-background.png" alt="" />
                  </a>
                  {/* end slider item */}
                </div>
                {/* end partners slider */}
              </div>
            </div>
          </div>
        </div>
        {/* end partners */}

        {/* footer */}
        <footer class="footer">
          <div class="container">
            <div class="row">
              {/* section title */}
              <div class="col-12">
                <h2 class="section__title section__title--footer section__title--white">Subscribe for Our Newsletter</h2>
              </div>
              {/* end section title */}

              <div class="col-12">
                <form action="#" class="subscribe">
                  <input type="text" class="subscribe__input" placeholder="Enter your e-mail address" />
                  <button type="button" class="subscribe__btn"><img src="img/subcribe.svg" style={{ "width": "33px" }} /></button>
                </form>
              </div>

              <div class="col-12">
                {/* social list */}
                <ul class="footer__social">
                  <li>
                    <a href="#" class="in">
                      <img src="img/ld.svg" style={{ "width": "33px" }} />
                    </a>
                  </li>
                  <li>
                    <a href="#" class="fb">
                      <img src="img/fb.svg" style={{ "height": "33px" }} />
                    </a>
                  </li>
                  <li>
                    <a href="#" class="inst">
                      <img src="img/ig.svg" style={{ "width": "33px" }} />
                    </a>
                  </li>
                  <li>
                    <a href="#" class="tw">
                      <img src="img/tw.svg" style={{ "width": "33px" }} />
                    </a>
                  </li>
                </ul>
                {/* end social list */}
              </div>

              <div class="col-12">
                {/* copyright */}
                <small class="footer__copyright">© BuyCoin, 2018—2021. Create by <a
                  href="https://themeforest.net/user/dmitryvolkov/portfolio" target="_blank">Dmitry
                  Volkov</a>.</small>
                {/* end copyright */}
              </div>
            </div>
          </div>
        </footer>
        {/* end footer */}

        {/* article */}
        <div id="article" class="zoom-anim-dialog mfp-hide modal modal--article">
          <button class="modal__close" type="button"><img src="img/x.svg" /></button>

          <div class="modal__article">
            <h1>Keep Reading (H1)</h1>

            <p>It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
              search for 'lorem ipsum' will <b>uncover many</b> web sites still in their infancy. Various versions have
              evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

            <h2>Some title(H2)</h2>

            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
              some form, by injected humour, or randomised words which don't look even slightly believable. If you are
              going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
              middle of text.</p>

            <h3>Some title(H3)</h3>

            <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this
              the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem
              Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>

            <img src="img/blog/1.jpg" alt="" />

            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
              Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
              source.</p>

            <h4>Some title(H4)</h4>

            <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this
              the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem
              Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>

            <blockquote>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
              embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat
              predefined chunks as necessary, making this the first true generator on the Internet.</blockquote>

            <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

            <h5>Some title(H5)</h5>

            <h6>Some title(H6)</h6>

            <p>It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to
              generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from
              repetition, injected humour, or non-characteristic words etc.</p>

            <ul>
              <li>Theme Forest</li>
              <li>Graphic River</li>
              <li>Audio Jungle</li>
              <li>3D Ocean</li>
              <li>Code Canayon</li>
            </ul>

            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
              some form, by injected humour, or randomised words which don't look even slightly believable. If you are
              going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
              middle of text. <a href="#">Link</a> the Lorem Ipsum generators on the Internet tend to repeat predefined
              chunks as necessary, making this the first true generator on the Internet.</p>
          </div>

          <div class="share">
            <a href="#" class="share__link share__link--fb"><img src="img/share.svg" style={{ "width": "33px" }} /></a>
            <a href="#" class="share__link share__link--tw"><img src="img/tweet.svg" style={{ "width": "33px" }} /></a>
          </div>
        </div>
        {/* end article */}

        {/* privacy */}
        <div id="privacy" class="zoom-anim-dialog mfp-hide modal modal--article">
          <button class="modal__close" type="button"></button>

          <div class="modal__article">
            <h1>Privacy policy</h1>

            <p>It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <h4>Determination of personal information of users</h4>

            <p>It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

            <ol>
              <li>If you are going to use a passage of Lorem Ipsum:
                <ol>
                  <li>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
                    making this the first true generator on the Internet.</li>
                  <li>It uses a dictionary of over 200 Latin words, combined with a handful of model sentence
                    structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore
                    always free from repetition, injected humour, or non-characteristic words etc.</li>
                </ol>
              </li>
              <li>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                alteration in some form, by injected humour, or randomised words which don't look even slightly
                believable.</li>
              <li>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
                and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
                evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</li>
            </ol>

            <h4>Reasons for collecting and processing user personal information</h4>

            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
              some form, by injected humour, or randomised words which don't look even slightly believable. If you are
              going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
              middle of text.</p>

            <ol>
              <li>It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                of letters.</li>
              <li>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making
                this the first true generator on the Internet:
                <ol>
                  <li>It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                    essentially unchanged;</li>
                  <li>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                    passages;</li>
                  <li>Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like);</li>
                  <li>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                    text;</li>
                </ol>
              </li>
            </ol>

            <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this
              the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem
              Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>

            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
              some form, by injected humour, or randomised words which don't look even slightly believable. If you are
              going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
              middle of text. <a href="#">Link</a> the Lorem Ipsum generators on the Internet tend to repeat predefined
              chunks as necessary, making this the first true generator on the Internet.</p>
          </div>
        </div>
        {/* end privacy */}

        <Signin />

        {/* sign up */}
        <div id="signup" class="zoom-anim-dialog mfp-hide modal">
          <button class="modal__close" type="button"><img src="img/share.svg" style={{ "width": "33px" }} /></button>

          <h6 class="modal__title">Sign Up</h6>

          <form action="#" class="form form--modal">
            <input type="text" class="form__input" placeholder="Name" />
            <input type="text" class="form__input" placeholder="Email" />
            <input type="password" class="form__input" placeholder="Password" />
            <div class="form__checkbox">
              <input id="privacy1" name="privacy1" type="checkbox" checked="checked" />
              <label for="privacy1">I agree to the <a href="#privacy" class="modal-article">Privacy Policy</a></label>
            </div>
            <button class="form__btn" type="button"><span>Send</span></button>
          </form>

          <span class="modal__text">Already have an account? <a href="#signin" class="modal-btn">Sign in!</a></span>
        </div>
        {/* end sign up  */}

        {/* forgot */}
        <div id="forgot" class="zoom-anim-dialog mfp-hide modal">
          <button class="modal__close" type="button"><img src="img/x.svg" /></button>

          <h6 class="modal__title">Restore password</h6>

          <form action="#" class="form form--modal">
            <input type="text" class="form__input" placeholder="Email" />
            <div class="form__checkbox">
              <input id="privacy2" name="privacy2" type="checkbox" checked="checked" />
              <label for="privacy2">I agree to the <a href="#privacy" class="modal-article">Privacy Policy</a></label>
            </div>
            <button class="form__btn" type="button"><span>Send</span></button>
          </form>

          <span class="modal__text">We will send a password to your Email</span>
        </div>
        {/* end forgot */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  web3: state.web3Store.web3,
  accounts: state.web3Store.accounts,
  // contract: state.Contract.contract,
  // owner: state.Contract.owner,
});

export default connect(mapStateToProps, {
  setToast, notify,
  connectWeb3: connectWeb3,
  // connectContract: connectContract,
})(App);