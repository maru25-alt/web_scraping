import React from 'react'

function Product({product}) {
    var img = product[0]?.image
   
    return (
        <>
        <div className="col-sm-12 col-md-6">
        <div className="product  form-group">
            <img src={img} className="card-img-top" alt="product"/>
            <div className="card-body">
                <h6 className="card-title">Shop</h6>
                {product && product.map(res => {
                    return(
                        <div  key={res._id}>
                            <a href={res.link} className="price">
                            <span>{res.website}</span>
                            {/* <span>{(res.title)} </span> */}
                            <span>{  res?.price === "" ? "No Price" :  res?.price}</span>
                            </a>
                            <hr/>
                    </div>  
                    )
                })}
            
            </div>
        </div>
            
        </div>

    </>
    )
}

export default Product
