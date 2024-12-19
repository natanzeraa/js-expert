const { readFile } = require('fs/promises')
const { error } = require('./constants')

const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}

class File {
    static async csvToJSON(filePath) {
        const content = await readFile(filePath, 'utf8')
        const validation = this.isValid(content)

        if (!validation.valid) throw new Error(validation.error)

        const result = this.parseCsvToJSON(content)
        return result
    }

    static isValid(csvString, options = DEFAULT_OPTION) {
        /**
         * csvString.split(/\r?\n/)
         * 
         * WTF IS THAT? 🧐
         * If your code editor is using CRLF it adds (\r\n) at the end of each line 👇
          
         * 'id,name,profession,age\r\n' +
         *  '1,Shaolim Matador de Porco,Back-end Developer,34\r\n' +
         *  '2,Sandra Rosa Madalena,QA,45\r\n' +
         *  '3,Princesa Fiona,CEO,24', 
            
         * and when its using LF it adds (\n) only:
         
         * 'id,name,profession,age\n' +
         * '1,Shaolim Matador de Porco,Back-end Developer,34\n' +
         * '2,Sandra Rosa Madalena,QA,45\n' +
         * '3,Princesa Fiona,CEO,24', 
         
         * so . . . that means it might crash your tests, so we are validating this cases using REGEXP 😎
         */

        const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/)
        const isValidHeader = header === options.fields.join(',')
        if (!isValidHeader) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        if (
            !fileWithoutHeader.length ||
            fileWithoutHeader.length > options.maxLines
        ) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }
        return { valid: true }
    }

    static parseCsvToJSON(csvString) {
        const lines = csvString.split(/\r?\n/)
        const firstLine = lines.shift()
        const header = firstLine.split(',')

        const users = lines.map(line => {
            const columns = line.split(',')
            const user = {}

            for (const index in columns) {
                user[header[index]] = columns[index]
            }
            return user
        })
        return users
    }
}

module.exports = File