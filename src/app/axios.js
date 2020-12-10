import axios from 'axios';

//http://localhost:8000
//https://scrapping25.herokuapp.com/
const instance = axios.create({
    baseURL: "http://localhost:8000"
})

export default instance