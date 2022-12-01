// // //Programa armazenas um objeto e cria um loop pra imprimir os dados solicitados

const usuarios = [
    { nome: "Carlos", tecnologias: ["HTML", "CSS"] },
    { nome: "Jasmine", tecnologias: ["JavaScript", "CSS"] },
    { nome: "Tuane", tecnologias: ["HTML", "Node.js"] }
   
]
            
        // for (let usuario of usuarios) {
        //     console.log(`${usuario.nome} trabalha com ${usuario.tecnologias.join(", ")}`)
        // }
      
    //Busca por tecnologia
    function checaSeUsuarioUsaCSS(usuario)  {  
        for (let tecnologia of usuario.tecnologias) {
            if (tecnologia == 'CSS') return true
        } 
            return false
    }

    for (let usuario of usuarios) {
        const usuarioTrabalhaComCSS = checaSeUsuarioUsaCSS(usuario)

        if (usuarioTrabalhaComCSS) {
            console.log(`O usuário ${usuario.nome} trabalha com CSS`)
        }
                    
    }

    