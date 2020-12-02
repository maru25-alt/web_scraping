const express =  require('express');
const {amazon, ebay} = require("../controller/getData");
let router = express.Router();

router.get('/',( req, res) => {
    return res.status(200).send("Welcome to my app!")
})

router.get("/getProducts/:query/:num/:priceby", async(req, res) => {

    const query = (req.params.query).replace(/\s+/g, "+");
     let num  = parseInt(req.params.num);
     let priceby = req.params.priceby;
    //  if(req.body.num){
    //    let  num = parseInt(req.params.num);
    //  }
    //  if(req.body.priceby){
    //      priceby = req.params.priceby;
    //  }
    console.log(num, priceby)
    const amazonData  = await amazon(query, num, priceby);
    const ebayData = await ebay(query, num, priceby)
    const data = [
        {
            website: "Amazon",
            data: amazonData
        },
        {
            website: "Ebay",
            data: ebayData
        }
    ]
    res.status(201).send(data);  
})


module.exports = router 