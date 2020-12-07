import React, { useEffect} from 'react'
import Product from './Product';
import Loading from './Loading';
import { useStateValue } from '../app/StateProvider';
import {getData} from '../app/reducer'


function ProductsContainer() {
    const [ {products, loading, query, num , priceby, searchArray, page}, dispatch] = useStateValue();

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
         getData(value, num, priceby, page).then(res => {
             console.log(res.data)
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

    const handlePagination = () => {
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        let new_page = page + 1
        dispatch({
            type: "SET_PAGE",
            payload: new_page
        })
         getData(query, num, priceby, new_page).then(res => {
             console.log(res.data)
            dispatch({
                type: "GET_PRODUCTS",
                payload: res.data
              });
    
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
                        <div className="product  form-group">
                          <img src={products[0].image} className="card-img-top" alt="product"/>
                       {products && products.map((product) => {
                             return(  <Product key={product._id} product={product}/>)
                       })
                       }
                       </div>

                   </div>
                }
                 <button onClick={handlePagination} className="btn btn-info text-center">Load More</button>
            </>
        }
            </>
          }
           
        </div>
    )
}

export default ProductsContainer
