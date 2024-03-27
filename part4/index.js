require('./mongo')
const {Blog} = require('./models/blog')
const express = require('express')
const app = express()
const cors = require('cors')
const { PORT } = require('./utils/config')


app.use(cors())
app.use(express.json())

app.get('/api/blogs', async (request, response) =>{
    const blogs=await Blog
        .find({})
        response.json(blogs)
})

app.post('/api/blogs', async (request, response) =>{
    const blog = request.body

    if (!blog || !blog.title || !blog.url) {
        return response.status(400).json({
            error: 'title and url properties are required'
        });
    }

    if(!blog.likes || typeof blog.likes === 'undefined'){
        blog.likes=0
    }

    const newBlog = new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    })

    const result= await newBlog.save()
    response.status(201).json(result)
})


const server = app.listen(PORT, () =>{
    console.log(`Serving running in PORT ${PORT}` );
})

module.exports = {
    app,
    server
}