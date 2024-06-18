import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <section className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='content'>
                        <p><Link to='/'>PlayJeeto</Link> © {new Date().getFullYear()}. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer