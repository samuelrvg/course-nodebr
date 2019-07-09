const {
    readFile
} = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(readFile)

//outra forma de obter dados json
//const dadosJson = require('./')

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    escreverArquivo() {

    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
        return dadosFiltrados
    }


}

//const database = new Database()

module.exports = new Database()