import React from 'react'


function Product({product}) {
    var img = product[0]?.image
    var website = product[0]?.website

    const trimTitle = (string) => {
            let num = 10
             if(string.length > num){
                return string.substr(0, num) + '...';
            }
            else{
                return string
            }
      }
   
    const priceSymbol = (price) => {
       if(price.charAt(0) === '£'){
            return price.substring(1)
       }
       else{
           return price
       }
    }
    return (
        <>
                  <div className="col-xs-12 col-md-6">
                    <div className="product  form-group">
                        <img src={img} className="card-img-top" alt="product"/>
                        <div className="card-body">
                            <h6 className="card-title">Shop: {website}</h6>
                            {product && product.map(res => {
                                return(
                                    <div  key={res._id}>
                                        <a href={res.link} className="price">
                                        <span>{trimTitle(res.title)} </span>
                                    
                                        <span>£{priceSymbol(res?.price)}</span>
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
