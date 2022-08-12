const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.get('/',(req,res)=>{
    res.send('server is running ')
})

//config 
dotenv.config({
    path:"server/.env"
});

//use middleware-------------
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
//db connect instance
const dbConnect = require('./config/dbConnect');
//connect to mongo database
dbConnect();

//============ START ROUTES ===========
const adminAuthRoute = require('./routes/auth/auth.route')
const userAuthRoute = require('./routes/auth/userAuth.route')

const tagRoute = require('./routes/dashboard/tag.route')
const categoryRoute = require('./routes/dashboard/category.route')
const articleRoute = require('./routes/dashboard/article.route')
const homeRouter = require('./routes/home/home.route');
const usersRoute = require('./routes/dashboard/users.route');


app.use('/api/admin/auth',adminAuthRoute);
app.use('/api/user/auth',userAuthRoute);


app.use('/api/dashboard/tag',tagRoute);
app.use('/api/dashboard/category',categoryRoute);
app.use('/api/dashboard/article',articleRoute);
app.use('/api/dashboard/users',usersRoute);
app.use('/api/home',homeRouter);

//============ END ROUTES ============

//=========== start test area


//=========== end test area
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
   console.log("app start listinig to port ",PORT);
});
