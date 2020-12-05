const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define the structure of the data that we will store in the database
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true}); //created or uppdated on <date>

//create a model based on the schema
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;



