const {
    deepEqual
} = require('assert')
const database = require("./database")

const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder: 'Speed', id: 1 }
const DEFAULT_ITEM_ATUALIZAR = { nome: 'Lanterna Verde', poder: 'Energia do anel', id: 2 }

describe('Suite de manipulacao de Heroes', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        //const posicaoUm = resultado[0]
        //ok(resultado, expected)
        deepEqual(resultado, expected)
    })

    it('deve cadastrar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(actual, expected)
    })

    //it.only - testa apenas um
    it('deve remover um heroi', async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })

    it('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batmam',
            poder: 'Dinheiro'
        }
        const novoHeroi = {
            nome: 'Batmam',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoHeroi)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    })
})