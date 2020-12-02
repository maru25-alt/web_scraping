import React from 'react'

function Footer() {
    const date = new Date();
    return (
        <footer className="footer">
           <p>All rights reserved &copy;  {date.getFullYear()}</p>
        </footer>
    )
}

export default Footer
