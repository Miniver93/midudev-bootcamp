require('./mongo')
const {Blog} = require('./models/blog')
const express = require('express')
const app = express()
const cors = require('cors')
const { PORT } = require('./utils/config')
const { default: mongoose } = require('mongoose')


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

app.delete('/api/blogs/:id', async (request, response, next) =>{
    const {id} = request.params
    if(!mongoose.isValidObjectId(id)){
        return response.status(400).send({ error: 'that is not a valid id'}).end()
    }
    
    try {
        const result = await Blog.findByIdAndDelete(id)
        if(!result){
            return response.status(400).send({ error: 'that id does not exist in db'}).end()
        }else{
            response.status(204).end()
        }
    } catch (error) {
        next(error)
    }
    

    


})
app.use(require('./middleware/notFound.js'))
app.use(require('./middleware/handleError.js'))

const server = app.listen(PORT, () =>{
    console.log(`Serving running in PORT ${PORT}` );
})

module.exports = {
    app,
    server
}