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
        if(i <= num){
            const title = $(el).find('h2 span').text();  
            const price = $(el).find('.a-price-whole').text();
            const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
            const image = $(el).find('.s-image').attr('src');
            const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
            const item = query;
            const website = "Amazon"
            const datas = {i,title,price,rating,link,image,item , website};
            data.push(datas);
        }
       
    });
    let filteresData = filterBy(data, priceby);
    return filteresData.slice(0, num) 
}

const ebayData = async(query, num, priceby) => {
    const data = [];
    const result = await request.get(`https://www.ebay.co.uk/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=${query}&_sacat=0`);
    const $ = await cheerio.load(result);
    $('.s-item').each((i,el)=> {
        if(i <= num){
            const title = $(el).find('.s-item__title').text();  
            const price = $(el).find('.s-item__price').text();
            const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
            const image = $(el).find('.s-item__image-wrapper img').attr('src');
            const link = $(el).find('.s-item__link').attr('href')
            const item = query;
            const datas = {i,title,price,rating,link,image,item, };
            data.push(datas);
        }
   })
   let NUM = num + 1
   let filteresData = filterBy(data, priceby);
   return filteresData.slice(1, NUM) 

}  


const jonhLewisData = async(query, num, priceby) => {
     const data = [];
     const result = await request.get(`https://www.johnlewis.com/search?search-term=${query}`)
     const $ = await cheerio.load(result);
     $('.product-card_c-product-card__container__38Nrq').each((i, el) => {
         if(i <= num ){
            const title = $(el).find('.title_title__1MULs').text();  
            const price = $(el).find('.price_c-product-card__price__3NI9k').text();
            const rating = $(el).find('.rating_stars__34OwL').text();
            const image = $(el).find('.image_image__E2_gC').attr('src');
            const link = $(el).find('.product-card_c-product-card__link__3NDUX').attr('href')
            const item = query;
            const datas = {i,title,price,rating,link,image,item };
            data.push(datas);
         }
     })
     let NUM = num + 1
     let filteresData = filterBy(data, priceby);
     return filteresData.slice(1, NUM) 
}


const argosData = async(query, num, priceby) => {
    const data = [];
    const result = await request.get(`https://www.argos.co.uk/browse/technology/televisions-and-accessories/televisions/c:30106/?clickOrigin=searchbar:search:term:tv`);
    const $ = await cheerio.load(result);
    $('.ProductCardstyles__Wrapper-sc-1fgptbz-1').each((i, el) => {
        if(i <= num ){
           console.log(i)
           const title = $(el).find('.ProductCardstyles__Title-sc-1fgptbz-12').text();  
           const price = $(el).find('.ProductCardstyles__PriceText-sc-1fgptbz-14 strong').text();
           const rating = $(el).find('.productRating').attr('title');
           const image = 'https:' + $(el).find('.ProductCardstyles__ImageWrapper-sc-1fgptbz-3 div picture img').attr('src');
           const link = 'https://www.argos.co.uk/' + $(el).find('.ProductCardstyles__ImageContainer-sc-1fgptbz-2 a').attr('href')
           const item = query;
           const datas = {i,title,price,rating,link,image,item };
           data.push(datas);
        }
    })
    let NUM = num + 1
    let filteresData = filterBy(data, priceby);
    return filteresData.slice(1, NUM) 
}


const veryData = async(query, num, priceby) => {
    console.log("getting....1");
    const data = [];
    const result = await request.get(`https://www.very.co.uk/electricals/laptops/macbooks/e/b/116394,118987,4873.end`);
    console.log("getting....1");
    const $ = await cheerio.load(result);
    console.log("getting....2");
    $('.product').each((i, el) => {
        console.log(i)
        if(i <= num ){
           console.log(i)
           const title = $(el).find('.productBrandDesc').text();  
           const price = $(el).find('.productWasPrice').text();
           const rating = $(el).find('.productRating').attr('title');
           const image = $(el).find('.productMainImage img').attr('src');
           const link = $(el).find('.productMainImage').attr('href')
           const item = query;
           const datas = {i,title,price,rating,link,image,item };
           console.log(datas);
           data.push(datas);
        }
    })
    let NUM = num + 1
    let filteresData = filterBy(data, priceby);
    return filteresData.slice(1, NUM) 
}

//https://www.laptopsdirect.co.uk/ct/?fts=tv
const laptopsData = async(query, num, priceby) => {
    const data = [];
    const result = await request.get(`https://www.laptopsdirect.co.uk/ct/tv-and-home-entertainment/tvs?fts=tv`);
    const $ = await cheerio.load(result);
    $('.OfferBox').each((i,el)=> {
        if(i <= num){
            const title = $(el).find('.offerboxtitle').text();  
            const price = $(el).find('.offerprice').text();
            const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
            const image = 'https://www.laptopsdirect.co.uk' + $(el).find('.sr_image a img').attr('src');
            const link = 'https://www.laptopsdirect.co.uk' + $(el).find('.offerboxtitle').attr('href')
            const item = query;
            const website = "";
            const datas = {i,title,price,rating,link,image,item };
            data.push(datas);
        }     
   })
    let filteresData = filterBy(data, priceby);
    return filteresData.slice(0, num)  
}  


//apple store

const appleData = async(query, num, priceby) => {
    console.log("getting....1");
    const data = [];
    const result = await request.get(`https://www.apple.com/mac/`);
    console.log("getting....1");
    const $ = await cheerio.load(result);
    console.log("getting....2");
    $('.compare-item').each((i, el) => {
        if(i <= num ){
           console.log(i)
           const title = $(el).find('.compare-headline').text();  
           const price = $(el).find('[data-product-template="${ price.display.from }"]').text();
           const rating = $(el).find('.productRating').attr('title');
           const image = $(el).find('.productMainImage img').attr('src');
           const link = 'https://www.apple.com/' + $(el).find('..compare-button').attr('href')
           const item = query;
           const datas = {i,title,price,rating,link,image,item };
           console.log(datas);
           data.push(datas);
        }
    })
    return data
}

const currys = async(query, num , priceby) => {

}

module.exports = { 
    amazon: amazonData,
    ebay:ebayData , 
    directLaptops:laptopsData, 
    johnLewis: jonhLewisData, 
    very: veryData,
    argos: argosData,
    apple: appleData
};