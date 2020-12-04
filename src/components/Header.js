import React from 'react'
import img from '../logo2.png'

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
             <a className="navbar-brand" href="/">
                 <img src={img} className="img-fluid" width="100" alt="compare prices"/>
             </a>
       </nav>
    )
}

export default Header
