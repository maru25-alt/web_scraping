import React, { useEffect} from 'react'
import Product from './Product';
import Loading from './Loading';
import { useStateValue } from '../app/StateProvider';
import {getData} from '../app/reducer'


function ProductsContainer() {
    const [ {products, loading, query, num , priceby, searchArray}, dispatch] = useStateValue();

    useEffect(() => {
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        dispatch({
            type: "SET_LOADING",
            payload: false
        });
        
    }, [dispatch])

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

   const handleSearchProducts = (e) => {
         e.preventDefault();
         const value = e.target.value;
         dispatch({
            type: "SET_LOADING",
            payload: true
        });
         getData(value, num, priceby).then(res => {
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data
              });
              dispatch({
                type: "SET_QUERY",
                payload: value
              })
              dispatch({
                type: "SET_LOADING",
                payload: false
               });
         }).catch(err => {
            console.log(err);
            dispatch({
              type: "SET_LOADING",
              payload: false
             });
        });
    }
   
    return (
        <div className="products">
            <h5> {query !== "" ? <> {capitalizeFirstLetter(query)} (results) </>  : <>My Feeds</>} </h5>
            {loading ?  <Loading /> :
             <>
             {query === "" ?
             <> {searchArray.map((item, index) => {
                return(
                 <label key={index} className="searchProducts">
                 <input onClick={handleSearchProducts} type="radio" name="search" value={item} id={index} />
                 <img src="https://d17kynu4zpq5hy.cloudfront.net/igi/dozuki/rH6Tb1S1BhLFwEr4.medium" alt="product item"/>
                 <p>{item}</p>
               </label>
               )
            })}</> : 
            <>
                {products.length <= 0 ? <div className="notFound">No Products Found!</div> : 
                   <div className="row container">
                       {products && products.filter(product => product.data.length !== 0).map((product, index) => {
                             return(  <Product key={index} product={product}/>)
                       })
                       }
                   </div>
                }
            </>
        }
            </>
          }
        </div>
    )
}

export default ProductsContainer
