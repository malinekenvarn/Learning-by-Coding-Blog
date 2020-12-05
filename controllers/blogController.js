const Blog = require('../models/blog');

//the index page with all posts sorted in decending order (-1)
const blog_index = (req, res)=>{
    Blog.find().sort({createdAt: -1})             
    .then((result)=>{          
        res.render('blogs/index', {title: 'All Posts', blogs: result})        
    })
    .catch((err)=>{
        console.log(err);
    })
};

// find a blog post based on id, render so it can be displayed to viewer
const blog_details = (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
      res.render('blogs/details', {blog: result, title: 'Blog Details'})
    })
    .catch(err=>{
        console.log(err);
    })
};

//get the blog post form
const blog_create_get = (req, res)=>{
    res.render('blogs/create', {title : 'Create a New Blog Post'})
};


//the POST request to create a blog post
const blog_create_post = (req, res)=>{
    const newBlog = new Blog(req.body);
    newBlog.save()
    .then((result)=>{
        res.redirect('/blogs')
    })
    .catch((err)=>{
        console.log(err);
    })
};

//delete blogpost, go to database and find id and delete
const blog_delete = (req, res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)  
    .then(result=>{
        res.json({redirect: '/blogs'})
    })
    .catch(err=>{
        console.log(err)
    })  
};


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}