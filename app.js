const express = require('express');

//Create express app
const app = express();

//Set view engine
app.set('view engine', 'ejs')


app.listen(3000, ()=>{
    console.log('Listening on port 3000')
});

app.get('/', (req, res)=>{
    const blogs=[

        //{title: 'test1', snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "},
        //{title: 'test2', snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "},
        //{title: 'test3', snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}
    ]

    res.render('index', {title : 'Home', blogs})
});

app.get('/about', (req, res)=>{
    res.render('about', {title : 'About'})
});

app.get('/blogs/create', (req, res)=>{
    res.render('create', {title : 'Create a New Blog Post'})
})


//If nothing else matches above, then send the 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title : '404'});
})