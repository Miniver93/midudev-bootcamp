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
      
    test('the first note author is Jose', async () => {
        const response = await api.get('/api/blogs')
    
        const contents = response.body.map(e => e.author)
        assert.strictEqual(contents.includes('Jose'), true)
    })

    test('the unique identifier property of the blog post is named id', async () =>{
        const response = await api.get('/api/blogs')

        const contents = response.body
        const paramId = Object.keys(...contents)
        console.log(paramId);
        assert.strictEqual(paramId[3], 'id')
    })
})

describe('POST blogs', () =>{
    test('sucessfully creates a new blog post', async () =>{
        const blog = { 
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
            author: "Manolo",
            url: "localhost"
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)

            const request = await api.post('/api/blogs')
            const contents = request.body
            assert.strictEqual(contents.likes, 0)
    })
})

after(async () => {
    await mongoose.connection.close()
    console.log('connection close');
})
