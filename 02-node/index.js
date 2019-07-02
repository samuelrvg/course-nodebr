/*
0 obter um usuario
1 obter o numero de teleone de um usuario a partir de seu id
2 obter o endereco do usuario pelo id
*/

function obterUsuario(callback){
    setTimeout(function(){
        return callback('test error', {
            id:1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback){
    setTimeout(function(){
        return callback(null, {
            telefone: '1115236',
            ddd: 11
        })
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua:'x52',
            numero: 8
        })
    }, 2000)

}

// function resolverUsuario(erro, usuario){
//     console.log('usuario', usuario)
// }

// obterUsuario(resolverUsuario)
obterUsuario(function resolverUsuario(erro, usuario){

    //null || "" || 0 || false
    if(erro){
        console.error('DEU RUIM!', erro)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone){
        if(erro1){
            console.error('DEU RUIM!', erro1)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco){
            if(erro2){
                console.error('DEU RUIM!', erro1)
                return;
            }

            console.log(`Nome: ${usuario.nome}, Endereco: ${endereco.rua} - ${endereco.numero}, Telefone: ${telefone.telefone}`)
        })
    })
})

// const usuario = obterUsuario()
// const telefone = obterTelefone(usuario.id)

// console.log('usuario', usuario)
// console.log('telefone', telefone)
//const endereco = obterEndereco()