import express from 'express';
import cors from 'cors';


import {notFoundMiddleware} from './middlewares/notFound.middleware.js';


import productRouter from './routes/product.routes.js';
import variantRouter from './routes/variant.routes.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get('/', (req, res)=> {
    res.send('Hello World');
})


app.use('/api/v1/products', productRouter);
app.use('/api/v1/products/variants', variantRouter);

app.use(notFoundMiddleware);


export {app}