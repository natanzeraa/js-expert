const File = require('./src/file')
const { error } = require('./src/constants')
const assert = require('assert')


// IFEE -> This is an auto-executable function
;(async () => {

    // Variables inside this code blocks are only valid, during its execution
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = './mocks/invalid-header.csv'
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = './mocks/invalid-fiveItems.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = './mocks/valid-threeItems.csv'
        const expected = [
            {
                id: 1,
                name: 'Shaolim Matador de Porco',
                profession: 'Back-end Developer',
                age: 34
            },
            {
                id: 2,
                name: 'Sandra Rosa Madalena',
                profession: 'QA',
                age: 45
            },
            {
                id: 3,
                name: 'Princesa Fiona',
                profession: 'CEO',
                age: 24
            }
        ]
        const result = await File.csvToJSON(filePath)
        assert.deepEqual(result, expected)
    }
    
})()