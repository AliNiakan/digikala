const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const userRoutes = require('./routes/UserRoutes')
const buyProductsRoutes = require('./routes/BuyProdutcsRoutes')
const ProductsRoute = require('./routes/ProductsRoutes')
const paymentRoutes = require('./routes/PaymentRoutes')
const listsRoutes = require('./routes/ListsRoutes')
const { verifyPayment } = require('./controllers/PaymentController')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const { uploadImage } = require('./middleware/UploadMiddleware')
const { upload } = require('./controllers/UploadImageController')


const port = process.env.PORT
const app = express()

//Connect to Database
connectDB()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



//Routes
app.use('/products', ProductsRoute)
app.use('/users', userRoutes)
app.use('/order', buyProductsRoutes)
app.use('/payment', paymentRoutes)
app.use('/lists', listsRoutes)
app.get('/callback', verifyPayment)
app.post('/upload_files', uploadImage.single('image'), upload);
app.use('/public', express.static('public'))


//Not found anything => 404 Page
app.use((''), (req, res, next) => {
    res.status(404)
    let originalUrl = req.originalUrl
    originalUrl = originalUrl.substring(1)
    throw new Error(`${originalUrl} Not found.`.red)
})



app.listen(port, () => {
    console.log(`Server is run now on ${port}`.bgMagenta)
})