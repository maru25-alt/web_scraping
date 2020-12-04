import React from 'react'
import { useState } from 'react';
import { useStateValue } from '../app/StateProvider';
import { getData } from '../app/reducer';

function SearchBar() {
    const [search, setsearch] = useState("");
    const [{num, priceby, showFilters},dispatch] = useStateValue();
    
    const handleSearch = async(e) => {
        e.preventDefault();
        if(search !== ''){
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
           const query =  search.toLowerCase(); 
          dispatch({
            type: "SET_QUERY",
            payload: query
          })
          await getData(query, num, priceby).then(res => {
              console.log(res.data);
            dispatch({
               type: "GET_PRODUCTS",
               payload: res.data
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
    }

   const handleSearchshowFilters = () => {
       dispatch({
           type: "SET_SHOWFILTERS",
           payload: !showFilters
       })

    }

    return (
        <>
         <button onClick={handleSearchshowFilters} className="btn d-block d-sm-none">
            <i className="fa fa-bars " aria-hidden="true"></i>
        </button>
        <form className="search" onSubmit={handleSearch}>
           <input value={search} onChange={(e) => setsearch(e.target.value)} type="text" placeholder="Search Products..."></input>
           <button > <i className="fa fa-search" aria-hidden="true"></i></button>
        </form>
        </>
    )
}

export default SearchBar
