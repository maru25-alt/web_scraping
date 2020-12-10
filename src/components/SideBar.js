import React from 'react';
import { useStateValue} from '../app/StateProvider';
import {getData, getItems} from '../app/reducer'
import { useEffect } from 'react';

function SideBar() {
    const [ {query, num, priceby, searchArray, showFilters, page, shops}, dispatch] = useStateValue();

    useEffect(() => {
       getItems().then(res => {
           dispatch({
               type: "SET_SEARCH_ARRAY",
               payload: res.data
           })
       })
    }, [dispatch])

    const  handleChangeNum = (e) => {
        const value = parseInt(e.target.value)
        if(e.target.value.includes("Choose...")){
            return 0
        }
        console.log(e.target.value);
        dispatch({
            type: "SET_NUM",
            payload: value
        });
        dispatch({
            type: "SET_SHOWFILTERS",
            payload: !showFilters
        })
        if(query !== ""){
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            getData(query, value, priceby, page, shops).then(res => {
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

    const handleSearchProducts = (e) => {
        e.preventDefault();
        const value = e.target.value;
        dispatch({
           type: "SET_LOADING",
           payload: true
       });
       dispatch({
        type: "SET_SHOWFILTERS",
        payload: !showFilters
       })
       dispatch({
        type: "SET_QUERY",
        payload: value
      })
        getData(value, num, priceby, page, shops).then(res => {
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

   const handleShops = (e) =>{
    dispatch({
        type: "SET_SHOP",
        payload: {
            value: e.target.checked,
            name: e.target.name
        }
       })
   }

    return (
        <>
        <div className={showFilters  ? 'sidebar sidebar__visability' :  'sidebar sidebar__visability apply_invisible'} >
            <h4>Filters:</h4>
            <hr></hr>
            <div>
                <h5>Select Shop</h5>
                {shops && shops.map((e , i)=> {
                    return(
                        <div key={i} className="form-group form-check" >
                            <input onChange={handleShops} type="checkbox" name={e.name}  className="form-check-input" id="amazon" checked={e.value}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">{e.name}</label>
                        </div>
                    )
                })}
            </div>
            <hr></hr>
            <div>
                  <h5>Prices Per Product</h5>
                  <div>
                  <select onChange={handleChangeNum} className="custom-select" id="inputGroupSelect01">
                        <option defaultValue>Choose...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        <option value="5">Five</option>
                   </select>
                  </div>
            </div>
            <hr></hr>
            <div>
                <h5>Search Products</h5>
                <div>
                    {searchArray && searchArray.map((e,i)=> {
                          return(
                            <div className="form-group form-check" key={e._id}>
                               <input onClick={handleSearchProducts}  type="radio" value={e.item} name="search" className="form-check-input" id="minPrice" />
                               <label className="form-check-label" htmlFor="exampleCheck1">{e.item}</label>
                            </div>
                          )
                    })}
                    <button data-toggle="modal" data-target="#items" className="btn btn-info btn-sm">View more Products</button>
                </div>

            </div>
            <hr/>
        </div>


        <div className="modal fade" id="items" tabIndex="-1" aria-labelledby="items" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Products in the database</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                   {searchArray.map(item => 
                       <span key={item._id} className="badge badge-info ml-3">{item.item}</span>
                   )}
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SideBar
