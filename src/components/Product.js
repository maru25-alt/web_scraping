import React from 'react'


function Product({product}) {
    const {website, data} = product;
    let img = ""
    if(data){
        img = data[0]?.image
    }
   

    const trimTitle = (string) => {
            let num = 40
             if(string.length > num){
                return string.substr(0, num) + '...';
            }
            else{
                return string
            }
      }
    const displayRating   = (rating) => {
        return parseInt(rating.slice(0, 2))
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
        <div className="col-12">
            <div className="product  form-group">
                <img src={img} className="card-img-top" alt="product"/>
                <div className="card-body">
                    <h6 className="card-title">Shop: {website}</h6>
                    {data && data.map(res => {
                        return(
                            <div  key={res.id}>
                                <a href={res.link} className="price">
                                <span>{trimTitle(res.title)} </span>
                                {/* {res.rating &&  <span className="product__rating">
                                {Array(displayRating(res?.rating)).fill().map((_, i) => {
                                return  <i className="fas fa-star-alt" key={i}></i>
                                   })
                                }
                                </span>} */}
                                <span>£{priceSymbol(res?.price)}</span>
                                </a>
                                <hr/>
                           </div>  
                        )
                    })}
                   
                </div>
            </div>
            
        </div>
    )
}

export default Product
