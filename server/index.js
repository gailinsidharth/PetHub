const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDb = require('./config/db')
require('dotenv').config()
const http = require('http');
const socketio = require('socket.io');
const userRoutes = require('./routes/userRoute')
const sellerRoutes = require('./routes/sellerRoute')
const petRoutes = require('./routes/petRoute');
const cartRoute = require('./routes/cartRoute')
const breederRoute = require('./routes/breederRoute')
const breedRoute = require('./routes/breedRoute')
const breedRequestRoute = require('./routes/breedRequestRoute')
const addressRoute = require('./routes/addressRoute')
const adminRoutes = require('./routes/adminRoute')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoute')
const userCartRoutes = require('./routes/userCartRoute')
const orderRoutes = require('./routes/orderRouter')

app.use(bodyParser.json())
app.use(cors());
app.use(express.json())




connectDb();


app.use('/api',userRoutes)
app.use('/api',userRoutes)
app.use('/api',userRoutes)
app.use('/api',sellerRoutes)
app.use('/api',sellerRoutes)
app.use('/api',sellerRoutes)
app.use('/api',petRoutes);
app.use('/api',petRoutes);
app.use('/api',cartRoute);
app.use('/api',breederRoute)
app.use('/api',breedRoute)
app.use('/api',breedRequestRoute)
app.use('/api',addressRoute)
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',userCartRoutes)
app.use('/api',orderRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`server conntected at ${PORT}`)})