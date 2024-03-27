const { test,describe } = require('node:test')
const assert = require('node:assert')

const { reverse } = require('../utils/for_testing')

describe('reverse', () =>{
    test('reverse of a', () =>{
        const result = reverse('a')
    
        assert.strictEqual(result, 'a') //Esto se lo mismo que expect(result).toBe('a') de jest, pero ahora de node:test
    })
    
    test('reverse of react', () => {
        const result = reverse('react')
      
        assert.strictEqual(result, 'tcaer')
    })
      
    test('reverse of saippuakauppias', () => {
        const result = reverse('saippuakauppias')
      
        assert.strictEqual(result, 'saippuakauppias')
    })
})
