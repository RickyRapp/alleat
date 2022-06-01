import React from 'react';
import Link from './Link'

const Header = () => { 
    return(
        <div> 
            <Link loginType="" href="/" className="item">
                Welcome!!!!
            </Link>
            <Link loginType="user" href="/user" className="item">
                User
            </Link>
            <Link loginType="admin" href="/admin" className="item">
                Admin
            </Link>
        </div>
    )
}

export default Header;