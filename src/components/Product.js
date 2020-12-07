import React from 'react'


function Product({product}) {
    const {website,  item, price, link, title} = product;
   

    const trimTitle = (string) => {
            let num = 25
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
       
                <div className="">
                    <h6 className="card-title px-1">Shop: {website}</h6>
                                <a href={link} className="price">
                                <span>{item}</span>
                                <span>{trimTitle(title)}</span>
                                <span>£{priceSymbol(price)}</span>
                                </a>
                                <hr/>
                  </div>
    )
}

export default Product
