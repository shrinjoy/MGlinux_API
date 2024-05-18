import React from 'react'
import Navbar from './Components/Navbar.js'

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
        </main>
    )
}

export default Home