const express =  require('express');
const {amazon, ebay, johnLewis, very, argos, directLaptops} = require("../controller/getData");
const {apple} = require("../controller/appleStore");
let router = express.Router();

router.get('/',( req, res) => {
    return res.status(200).send("Welcome to my app!")
})

router.get("/getProducts/:query/:num/:priceby", async(req, res) => {
    const query = (req.params.query).replace(/\s+/g, "+");
    let num  = parseInt(req.params.num);
    let priceby = req.params.priceby;
     const amazonData  = await amazon(query, num, priceby);
    // console.log("amazon data getting....");
     const ebayData = await ebay(query, num, priceby);
    // console.log("ebay data getting....");
     const johnLewisData = await  johnLewis(query, num, priceby);
    // console.log("john lewis getting....");
    // const veryData = await very(query, num, priceby);
    // console.log(veryData);
   // const argosData = await argos(query, num , priceby);
    const directLaptopsData = await directLaptops(query, num, priceby)
    const appleData = await apple(query, num, priceby);

    const data = [
        {
            website: "Amazon",
            data: amazonData
        },
        {
            website: "Ebay",
            data: ebayData
        },
        {
            website: "John Lewis",
            data: johnLewisData
        },
        // {
        //     website: "Very",
        //     data: veryData
        // },
        // {
        //     website: "Argos",
        //     data:  argosData
        // },
        {
            website: "Direct Laptops",
            data: directLaptopsData
        },
        {
            website: "Apple Store",
            data: appleData
        }
    ]
    res.status(201).send(data);  
})


module.exports = router 