const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const verifyToken = require('./middleware/verifyToken');
const errorHandler = require('./middleware/errorHandler')
const cors= require('cors')
dotenv.config();
const PORT = 3000;
const userRoutes= require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoute');
app.use(cors());
app.use(express.json())
app.use('/user',userRoutes)
app.use('/job',verifyToken,jobRoutes)

app.get('/health',(req,res)=>{
    res.json({
        message:"app is running"
    })
})
app.use("*", (req, res) => {
    res.status(404).json({
        message: 'Endpoint not found',
        status: 'Error',
    });
});
app.use(errorHandler);
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('MongoDB is connected :)'))
.catch((error) => console.log(error))
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})