const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {

    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        }
      ]

    test('of empty list is zero', () => {
        const emptyList = []

        const result = listHelper.totalLikes(emptyList)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const listWithTwoBlogs = listWithOneBlog
        listWithTwoBlogs.push(            {
            _id: '4s2131241123213312123213f2',
            title: 'Probando',
            author: 'Jose',
            url: 'Local host',
            likes: 2,
            __v: 0
          })
        const result = listHelper.totalLikes(listWithTwoBlogs)
        assert.strictEqual(result, 7)
    })
})