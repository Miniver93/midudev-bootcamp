const { test, after, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const {app} = require('../index')
const api = supertest(app)

describe('GET blogs', () =>{
    test('blogs are returned as json', async () =>{
        api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
      
        assert.strictEqual(response.body.length, 2)
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


after(async () => {
    await mongoose.connection.close()
    console.log('connection close');
})
