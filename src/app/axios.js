import axios from 'axios';


const instance = axios.create({
    baseURL: "https://price-compare-app25.herokuapp.com/"
})

export default instance