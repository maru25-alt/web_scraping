import React from 'react'

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
             <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <a className="nav-link active" href="/">Home</a>
                <a className="nav-link" href="/">Features</a>
                <a className="nav-link" href="/">Pricing</a>

                </div>
            </div>
       </nav>
    )
}

export default Header
