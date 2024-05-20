import React from 'react'
import Navbar from './Components/Navbar.js'
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import { Link } from 'react-router-dom'

function Home() {
    return (
        <main>
            <Navbar />
            <section className="HomeBanner">
                <div className='container'>
                    <div className='row g-3'>
                        <div className='col-xl-12'>
                            <div className='mainHomeBanner'>
                                <div className='content col-xl-6'>
                                    <h1>We have a wide selection of online casino games</h1>
                                    <p>Sunt laborum exercitation reprehenderit quis nostrud ipsum. Veniam nisi occaecat ex consectetur.</p>
                                    <a className="redThickBtn">More Information</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="subWrapper">
                                <img src='https://triple-seven.axiomthemes.com/wp-content/uploads/2023/11/post79-copyright-840x681.jpg' />
                                <div className="content">
                                    <h3>Casino Game Name</h3>
                                    <p>Aute Lorem id enim elit Lorem et.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="subWrapper">
                                <img src='https://triple-seven.axiomthemes.com/wp-content/uploads/2023/11/post80-copyright-840x800.jpg' />
                                <div className="content">
                                    <h3>Casino Game Name</h3>
                                    <p>Aute Lorem id enim elit Lorem et.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="subWrapper">
                                <img src='https://triple-seven.axiomthemes.com/wp-content/uploads/2023/11/post81-copyright-840x495.jpg' />
                                <div className="content">
                                    <h3>Casino Game Name</h3>
                                    <p>Aute Lorem id enim elit Lorem et.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="subWrapper">
                                <img src='https://triple-seven.axiomthemes.com/wp-content/uploads/2023/11/post82-copyright-840x570.jpg' />
                                <div className="content">
                                    <h3>Casino Game Name</h3>
                                    <p>Aute Lorem id enim elit Lorem et.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='freeDemo'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-6'>
                            <div className='imgWrapper'>
                                <img src='https://triple-seven.axiomthemes.com/wp-content/uploads/2023/11/seven-img-4-copyright.jpg' />
                            </div>
                        </div>
                        <div className='col-xl-6 my-auto'>
                            <div className='content'>
                                <span>MAKE A SPIN</span>
                                <h1>Welcome to the best online casino: win your million in slots</h1>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                <a className="redThickBtn">Make a Free Spin</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='textMarqueeScroller py-2'>
                <MarqueeText direction='right' duration={20} pauseOnHover={false} className={'marqueeText'}>
                    Casino Games <i class="fa-solid fa-spade px-3"></i> Jackpot Games <i class="fa-solid fa-club mx-2"></i> Slot Games
                </MarqueeText>
            </section>
            <section className='featuredGames'>
                <div className='container'>
                    <div className='row g-3'>
                        <div className='content'>
                            <span>Try Now</span>
                            <h1>Featured For You</h1>
                        </div>
                        <div className='col-xl-4'>
                            <div className='wrapper'>
                                <div className='imgWrapper'>
                                    <img src={'https://triple-seven.axiomthemes.com/wp-content/uploads/2023/11/post68-copyright-890x664.jpg'} />
                                </div>
                                <div className='content'>
                                    <h3>Vegas slots</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4'>
                            <div className='wrapper'>
                                <div className='imgWrapper'>
                                    <img src={'https://triple-seven.axiomthemes.com/wp-content/uploads/2024/01/seven-img-13-copyright-890x664.jpg'} />
                                </div>
                                <div className='content'>
                                    <h3>Fortress slots</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4'>
                            <div className='wrapper'>
                                <div className='imgWrapper'>
                                    <img src={'https://triple-seven.axiomthemes.com/wp-content/uploads/2023/11/post61-copyright-890x664.jpg'} />
                                </div>
                                <div className='content'>
                                    <h3>Casino slots</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4'>
                            <div className='wrapper'>
                                <div className='imgWrapper'>
                                    <img src={'https://triple-seven.axiomthemes.com/wp-content/uploads/2023/11/post70-copyright-890x664.jpg'} />
                                </div>
                                <div className='content'>
                                    <h3>Treasure slots</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4'>
                            <div className='wrapper'>
                                <div className='imgWrapper'>
                                    <img src={'https://triple-seven.axiomthemes.com/wp-content/uploads/2023/11/post59-copyright-410x307.jpg'} />
                                </div>
                                <div className='content'>
                                    <h3>Shaman’s slots</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4'>
                            <div className='wrapper'>
                                <div className='imgWrapper'>
                                    <img src={'https://triple-seven.axiomthemes.com/wp-content/uploads/2023/10/post13-copyright-890x664.jpg'} />
                                </div>
                                <div className='content'>
                                    <h3>Lucky casino</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='baseCTA'>
                <div className='container'>
                    <div className='content row'>
                        <div className='col-xl-7'>
                            <h1>Take part in our tournament and get $100,000</h1>
                        </div>
                        <div className='col-xl-5 d-flex justify-content-between'>
                            <a className='baseBtn trans'>Click to get a Bonus</a>
                            <a className='baseBtn'>Contact Us Online</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className='footer'>
                <div className='container'>
                    <div className='row'>
                        <div className='content'>
                            <p><Link to='/'>PlayJeeto</Link> © {new Date().getFullYear()}. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home