const express = require('express');
const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

const app = express();

 app.use(express.json());
  app.use(bodyParser.json());
 app.use(cors())


app.get('/',( req, res) => {
    return res.status(200).send("Welcome to my app!")
})

 app.use('/products',  productRoutes)


app.listen(port,  ()=> {
    console.log(`Server running at http://localhost:${port}`);
})

