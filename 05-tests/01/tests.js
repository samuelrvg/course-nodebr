//npm i -g mocha
const assert = require('assert')
const { obterPessoas } = require('./service')

const nock = require('nock')

describe('Star Wars Tests', function () {

    this.beforeAll(() => {
        const response = {

        }
    })

    it('deve buscar r2d2 com formato correto', async () => {
        const expected = [{ nome: 'r2d2', peso: 96 }]
        const nomeBase = `r2d2`
        const resultado = await obterPessoas(nomeBase)
        assert.deepEqual(resultado, expected())
    })
})
