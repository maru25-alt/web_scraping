const cheerio = require('cheerio');
const request = require('request-promise');
var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;


//apple store

const appleData = async(query, num, priceby) => {
    query.toLowerCase();
    const data = [];
    if(query.includes("laptop") || query.includes("macbook")){
            const result = await request.get(`https://www.apple.com/mac/`);
            console.log("getting....1");
            const $ = await cheerio.load(result);
            console.log("getting....2");
            $('.compare-column').each((i, el) => {
                    const title = $(el).find('.compare-headline').text();  
                    const price = $(el).find('.copy-pricing span [data-product-template="${ price.display.from }"]').text();
                    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu2Zjd3XAJ2H9B0arC6n44cKG1V3mSqO6N2A&usqp=CAU";
                const link = 'https://www.apple.com/' + $(el).find('.compare-button').attr('href')
                const item = query;
                const datas = {i,item, image, price, title, link };
                console.log(datas);
                data.push(datas);
            })
            return data
    }  
    else if(query.includes("watch")){
        const result = await request.get(`https://www.apple.com/watch/`);
            const $ = await cheerio.load(result);
            console.log("getting....2");
            $('.compare-item').each((i, el) => {
                    const title = $(el).find('.compare-item-headline').text();  
                    const price = $(el).find('.compare-price').text();
                    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsluc7NE5_q303-FLjbil2sjqia_acsF6QJg&usqp=CAU";
                const link = 'https://www.apple.com/' + $(el).find('.buy-cta').attr('href')
                const item = query;
                const datas = {i,item, image, price, title, link };
                console.log(datas);
                data.push(datas);
            })
            return data

    }
    else if(query.includes("pad")){
        const result = await request.get(`https://www.apple.com/ipad/`);
        const $ = await cheerio.load(result);
        console.log("getting....3");
        $('.device').each((i, el) => {
                const title = $(el).find('.typography-compare-device-headline').text();  
                const price = $(el).find('.pricing span').text();
                const image = "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-og-202003?wid=600&hei=315&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1583201083141";
                const link = 'https://www.apple.com/shop/buy-ipad/ipad-10-2'
                const item = query;
                const datas = {i,item, image, price, title, link };
            console.log(datas);
            data.push(datas);
        })
        console.log(data)
        return data

    }
    else if(query.includes("iphone") || query.includes("phone")){
        const result = await request.get(`https://www.apple.com/iphone/`);
        const $ = await cheerio.load(result);
        console.log("getting....4");
        $('.compare-column ').each((i, el) => {
                const title = $(el).find('.compare-headline ').text();  
                const price = $(el).find('.copy-pricing span').text();
                const image = "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone11-select-2019-family_GEO_EMEA?wid=882&hei=1058&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1567022219953";
                const link = 'https://www.apple.com/shop/buy-iphone/iphone-12'
                const item = query;
                const datas = {i,item, image, price, title, link };
            console.log(datas);
            data.push(datas);
        })
        return data
    }
   else{
    console.log("getting....4");
       return data
   }
}


module.exports = { 
    apple: appleData
};