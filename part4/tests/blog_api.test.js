const { test, after, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const {app} = require('../index')
const api = supertest(app)

describe('GET blogs', () =>{
    test('blogs are returned as json', async () =>{
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
      
    test.skip('the first note author is Jose', async () => {
        const response = await api.get('/api/blogs')
    
        const contents = response.body.map(e => e.author)
        assert.strictEqual(contents.includes('Jose'), true)
    })

    test('the unique identifier property of the blog post is named id', async () =>{
        const response = await api.get('/api/blogs')

        const contents = response.body
        const paramId = Object.keys(...contents)
        console.log(paramId);
        assert.strictEqual(paramId[4], 'id')
    })
})

describe('POST blogs', () =>{
    test('sucessfully creates a new blog post', async () =>{
        const blog = { 
            title: "El coche fantástico",
            author : "Sergio",
            url : "http://localhost:3001/api/blogs/4",
            likes: 5
            }
        
        const firstResponse = await api.get('/api/blogs')
        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            const secondResponse = await api.get('/api/blogs')
            const contents = secondResponse.body.map(blog => blog.author)
            assert.strictEqual(secondResponse.body.length, firstResponse.body.length +1)
            assert(contents.includes(blog.author))
    })

    test('likes property is missing it will default to the value 0', async () => {
        const blog = {
                title: "First class tests",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)

            const response = await api.get('/api/blogs')
            const contents = response.body
            assert.strictEqual(contents[contents.length -1].likes, 0)
    })

    test('missing title property responds with 400 Bad Request', async () => {
        const blogWithoutTitle = {
            author: "John Doe",
            url: "http://example.com"
        };
    
        await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400);
    });
    
    test('missing url property responds with 400 Bad Request', async () => {
        const blogWithoutUrl = {
            title: "Example Blog",
            author: "John Doe"
        };
    
        await api
            .post('/api/blogs')
            .send(blogWithoutUrl)
            .expect(400);
    });
})

describe('DELETE blogs', () =>{
    test.skip('blog can be delete', async () => {
        const firstResponse = await api.get('/api/blogs')
        const blogs = firstResponse.body
        const [blogToDelete] = blogs

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const secondResponse = await api.get('/api/blogs')
        const contents = secondResponse.body.map(blog => blog.title)
        assert.strictEqual(secondResponse.body.length, firstResponse.body.length -1)
        assert.notDeepStrictEqual(contents, blogToDelete)
    })

    test('blog cant be delete', async () => {
        const firstResponse = await api.get('/api/blogs')
        await api
            .delete('/api/blogs/12312')
            .expect(400)

            const secondResponse = await api.get('/api/blogs')
        assert.strictEqual(secondResponse.body.length, firstResponse.body.length)
    })

})

// after(async () => {
//     await mongoose.connection.close()
//     console.log('connection close');
// })
