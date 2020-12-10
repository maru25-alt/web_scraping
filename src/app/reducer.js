import axios from './axios';
//import axios from 'axios'

export const intialState = {
    products: [],
    loading: false,
    showFilters: false,
    query: "",
    num: 1,
    page: 1,
    priceby: "asc",
    shops: [
        {
            name: "apple",
            value: true,
        },
        {
            name: "ebay",
            value: true,
        },
        {
            name: "amazon",
            value: true,
        },
        {
            name: "john lewis",
            value: true,
        }],
    searchArray: [
        {
            _id: "123",
            item: "phone"
        }
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

//http://localhost:8000/products/getProducts/phone/2/5/asc
//http://localhost:8000
//https://scrapping25.herokuapp.com/products/getProducts/

export const getData = (query, num, priceby, page, shops) => {
   return axios.get(`/products/getProducts/${query}/${page}/${num}/${priceby}`, shops )
}

export const addItem = (item) => {
    return axios.post(`/products/addItem`, item);
}

export const getItems = () => {
    return axios.get(`/products/items`);
}

const reducer = (state, action) => {
    switch(action.type){
        case 'GET_PRODUCTS':
            return{
                ...state,
                products: [ ...state.products, action.payload]
            }
         case 'SET_PAGE':   
           return{
               ...state,
               page: action.payload
           }
        case 'SET_LOADING':
            return{
                ...state,
                loading: action.payload
            } 
        case 'SET_SEARCH_ARRAY': 
           return{
               ...state,
               searchArray: action.payload
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
        case "SET_SHOP":
          const newArray =  state.shops.filter(e => e.name !== action.payload.name);
          console.log(state.shops)
            return{
                ...state,
                shops: [ ...newArray,  {value: action.payload.value, name : action.payload.name} ]
            }      
        default: return  state    
    }
}

export default reducer