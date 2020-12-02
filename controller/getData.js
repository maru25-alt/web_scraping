const cheerio = require('cheerio');
const request = require('request-promise');
var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;


const PRODUCT_RETURNS = 5


const filterBy = (arr, type) => {
    let returnData = [];
    const pricetoInt = (price) => {
        const validPrice  = price.substr(0,price.indexOf(' '))
        if(price.charAt(0) === '£'){
             return parseFloat(validPrice.substring(1))
        }
        else{
            return parseFloat(validPrice)
        }
     }
     switch (type) {
         case "asc":
            returnData = arr.sort((a, b) => pricetoInt(b.price) - pricetoInt(a.price));
         case "desc": 
            returnData = arr.sort((a, b) =>pricetoInt(a.price) - pricetoInt(b.price)); 
         default:
            returnData = arr 
     }
     return returnData;
}


const amazonData = async(query, num, priceby) => {
    const data = [];
    const result = await request.get(`https://www.amazon.in/s?k=${query}&page=1`);
    const $ = await cheerio.load(result);
    $('.s-asin').each((i,el)=> {
        const title = $(el).find('h2 span').text();  
        const price = $(el).find('.a-price-whole').text();
        const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
        const image = $(el).find('.s-image').attr('src');
        const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
        const item = query;
        const website = "Amazon"
        const datas = {i,title,price,rating,link,image,item , website};
        data.push(datas);
    });
    let filteresData = filterBy(data, priceby);
    return filteresData.slice(0, num) 
}

const ebayData = async(query, num, priceby) => {
    const data = [];
    const result = await request.get(`https://www.ebay.co.uk/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=${query}&_sacat=0`);
    const $ = await cheerio.load(result);
    $('.s-item').each((i,el)=> {
        const title = $(el).find('.s-item__title').text();  
        const price = $(el).find('.s-item__price').text();
        const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
        const image = $(el).find('.s-item__image-wrapper img').attr('src');
        const link = $(el).find('.s-item__link').attr('href')
        const item = query;
        const website = "Ebay";
        const datas = {i,title,price,rating,link,image,item, website };
        data.push(datas);
   })
   let NUM = num + 1
   let filteresData = filterBy(data, priceby);
   return filteresData.slice(1, NUM) 

}  


const laptopsData = async(query, num, priceby) => {
    const data = [];
    const result = await request.get(`https://www.laptopsdirect.co.uk/bct/laptops-and-netbooks/laptops/apple/apple-macbook-pro?fts=macbook%20pro`);
    //https://www.very.co.uk/e/q/jeans.end?_requestid=166669
    const $ = await cheerio.load(result);
    $('.s-item').each((i,el)=> {
        const title = $(el).find('.s-item__title').text();  
        const price = $(el).find('.s-item__price').text();
        const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
        const image = $(el).find('.s-item__image-wrapper img').attr('src');
        const link = $(el).find('.s-item__link').attr('href')
        const item = query;
        const website = "Ebay";
        const datas = {i,title,price:parseInt(price),rating,link,image,item, website };
        data.push(datas);
   })
   return data.slice(0, 3) 

}  



module.exports = { amazon: amazonData, ebay:ebayData , laptops:laptopsData};