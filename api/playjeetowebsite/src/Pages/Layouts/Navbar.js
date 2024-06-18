import React from 'react'
import '../../App.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <div className='container-fluid'>
                <div className='row justify-content-between align-items-center'>
                    <div className='col-5'>
                        <ul>
                            <li className='active'><Link>Home</Link></li>
                            <li><Link>Pages</Link></li>
                            <li><Link>Blog</Link></li>
                            <li><Link>Contact</Link></li>
                        </ul>
                    </div>
                    <div className='col-auto'>
                        <img src='https://triple-seven.axiomthemes.com/wp-content/uploads/2023/11/seven-logo-default.png' alt='Logo' />
                    </div>
                    <div className='col-5'>
                        <ul className='justify-content-end'>
                            <li><Link>Shop</Link></li>
                            <li><Link>SideMenu</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar