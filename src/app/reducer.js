//import instance from './axios';
import axios from 'axios'

export const intialState = {
    products: [],
    loading: false,
    showFilters: false,
    query: "",
    num: 3,
    priceby: "asc",
    searchArray: ["phone",
    "tv",
    "laptop",
    "macbook",
    "Iphone",
    "ipad"
]

}

export const sortByPrice = (products, type) => {
   switch (type) {
       case "maxPrice":
           return products.sort((a, b) => Number(b.price) - Number(a.price));
        case "minPrice":
            return products.sort((a, b) => Number(a.price) - Number(b.price));
       default:
           break;
   }
}

export const getData = (query, num, priceby) => {
   return axios.get(`https://price-compare-app25.herokuapp.com/products/getProducts/${query}/${num}/${priceby}`)
  
}

const reducer = (state, action) => {
    switch(action.type){
        case 'GET_PRODUCTS':
            return{
                ...state,
                products:  action.payload
            }
        case 'SET_LOADING':
            return{
                ...state,
                loading: action.payload
            } 
        case 'SET_NUM': 
           return{
            ...state,
            num : action.payload
           } 
        case 'SET_PRICEBY': 
          return{
            ...state,
            priceby: action.payload
          }      
        case 'SET_QUERY' :
            return{
                ...state,
               query: action.payload
            } 
        case "SET_SHOWFILTERS":  
           return{
               ...state,
               showFilters: action.payload

           }    
        default: return  state    
    }
}

export default reducer