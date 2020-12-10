import React from 'react'
import { useState } from 'react'
import img from '../logo2.png';
import {addItem} from '../app/reducer'

function Header() {
    const [item, setitem] = useState('');
    const [modal, setmodal] = useState("");
    const [loading, setloading] = useState(false)

    const handleSubmit = () => {
        setloading(true)
        addItem({
            item
        }).then(res => {
            alert(res.data);
            setitem("")
            setmodal("modal")
            setloading(false);
        }).catch(err => {
            console.log(err)
            setloading(false);
            console.log(item);
        })
       
       
    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
             <a className="navbar-brand" href="/">
                 <img src={img} className="img-fluid" width="100" alt="compare prices"/>
             </a>
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
             </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <button data-toggle="modal" data-target="#exampleModal" className="nav-link btn btn-info" > + Add item <span className="sr-only">(current)</span></button>
                </li>
                </ul>
                </div>
       </nav>

       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add items to the database</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
               
                    <form action="" className="mx-3">
                        <input value={item} onChange={e => setitem(e.target.value)} className="form-control" type="text" placeholder="type item here"/>
                    </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <div>
                      <button disabled={item==="" || loading} onClick={handleSubmit} type="button" data-dismiss={modal} className="btn btn-primary"> {loading ? "Scrapping...." : "Start Scrapping"}</button>
                      {loading && <div className="spinner-border text-info" role="status"></div>}
                    </div>
                   
                </div>
                </div>
            </div>
            </div>
       </>
    )
}

export default Header
