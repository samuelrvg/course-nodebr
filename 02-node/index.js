/*
    0 obter um usuario
    1 obter o numero de teleone de um usuario a partir de seu id
    2 obter o endereco do usuario pelo id
*/

// importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(callback){
    // quando der algum problema -> reject(erro)
    // quando sucess -> resolv
    return new Promise((function resolvePromisse(resolve, reject){
        setTimeout(function(){
            return resolve({
                id:1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    }))
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromisse(resolve, reject){
        setTimeout(() => {
            return resolve({
                telefone: '1115236',
                ddd: 11
            })
        })
    })
}

function obterEndereco(idUsuario, callback){
    return new Promise(function (resolve, reject){
        setTimeout(() => {
            return resolve({
                rua:'x52',
                numero: 8
            })
        }, 2000)
    })
}

const usuarioPromisse = obterUsuario()

//usuario -> telefone -> telefone
usuarioPromisse
    .then(function(usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(telefone){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone
            }
        })
    })
    .then(function(resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        });
    })
    .then(function(resultado){
        console.log('Info:', resultado.usuario.nome, resultado.endereco.rua, resultado.telefone.telefone)
    }).catch(function(error){
        console.log('Deu ruim!', error)
    })

//add async -> automaticamente retorna uma promise
main()

async function main(){
    try{
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEndereco(usuario.id)
        const resultado = await Promise.all([obterEndereco(usuario.id), obterTelefone(usuario.id)])
        const endereco = resultado[0]
        const telefone = resultado[1]
        
        console.log(`
            Nome: ${usuario.nome}
            Telefone: ${telefone.telefone}
            endereco: ${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    }
    catch(error){
        console.log('deu ruim', error)
    }
}

// obterUsuario(function resolverUsuario(erro, usuario){

//     //null || "" || 0 || false
//     if(erro){
//         console.error('DEU RUIM!', erro)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(erro1, telefone){
//         if(erro1){
//             console.error('DEU RUIM!', erro1)
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(erro2, endereco){
//             if(erro2){
//                 console.error('DEU RUIM!', erro1)
//                 return;
//             }

//             console.log(`Nome: ${usuario.nome}, Endereco: ${endereco.rua} - ${endereco.numero}, Telefone: ${telefone.telefone}`)
//         })
//     })
// })