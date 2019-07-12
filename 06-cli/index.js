const Commander = require('commander')
const database = require('./database')
const Heroi = require('./heroi')

//node index.js --cadastrar --nome Aquaman --poder Marinho

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome Heroi')
        .option('-p, --poder [value],', "Poder de Heroi")
        .option('-c, --cadastrar', 'Cadastrar um heroi')
        .option('-l, --listar', 'Listar um heroi')
        .option('-r, --remover [value]', 'Remove um heroi pelo id')
        .parse(process.argv)

    const heroi = new Heroi(Commander)
    // console.log('heroi', heroi)

    try {
        if (Commander.cadastrar) {
            const resultado = await database.cadastrar(heroi)
            if (!resultado) {
                console.error('Heroi não foi cadastrado')
                return;
            }
            console.log('Heroi cadastrado com sucesso')
        }
        if (Commander.listar) {
            const resultado = await database.listar()
            console.log(resultado)
            return;
        }

    } catch (error) {
        console.error(error)
    }
}