//to keep my personal database settings private
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const host = process.env.HOST;
const dbURI = process.env.MONGODB_URI;

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

//create express app
const app = express();

//connect to database, listen to port...
mongoose.connect(dbURI, { useNewUrlParser: true,  useUnifiedTopology: true }) 
.then((result)=>app.listen(port, host, ()=>{
    console.log(`Server is listening:  ${host} : ${port}`)}))
    .catch((err)=>{console.log(err)})

//to control that we have connection with database
const db = mongoose.connection
db.on('error', error=>console.log(error))
db.once('open', ()=>console.log('Connected to Mongoose'))

//set view engine
app.set('view engine', 'ejs');

//static files (public files)
app.use(express.static('public'));

//middleware that takes the url encoded data and pass it to an object
app.use(express.urlencoded({extended: true}));

// a tool that logs information, like status codes and so on...
app.use(morgan('dev'));


//home page handler routes
app.get('/', (req, res)=>{
    res.redirect('/blogs');
});

app.get('/about', (req, res)=>{
    res.render('about', {title : 'About'})
});


//blog routes
app.use('/blogs', blogRoutes);


//if nothing else matches above, then send the 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title : '404'});
});

