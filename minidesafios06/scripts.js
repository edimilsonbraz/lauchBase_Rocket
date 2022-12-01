// function printDouble(number) {
//     setTimeout(
//         () => {
//             console.log(number * 2)
//         },
//         Math.floor(Math.rondom() * 100) +1
//     )
// }

//  function printAll(){
//     printDouble(5)
//     printDouble(10)
//     printDouble(22)
//     printDouble(1)
//     printDouble(89)
// }

// printAll()
// function escreva() {
//     console.log('Olá, Programador! \n');

// }
// escreva();
// escreva();
// escreva();
// console.log('Teste');
// escreva();

// function escrevaMensagem(mensagem) {
//     console.log(mensagem)
// }
// escrevaMensagem('Hello Word!')
// escrevaMensagem('Edimilson Braz')

// function soma(a, b) {
//     return a + b;
// }

// let resultadoSoma = soma(10, 5)
// console.log(resultadoSoma)

// function somaTudo(numeros) {
//     let total = 0

//     for(let num of numeros ) {
//         total = total + num
//     }
//     return total
// }

// let arrayNumeros = [3, 5, 7, 10, 9, 12]
// let resultado = somaTudo(arrayNumeros)
// console.log('somaTudo', resultado)



// function escrevaEndereco(rua, cidade, pais, ...complementos) {
//     console.log(rua)
//     console.log(cidade)
//     console.log(pais)
//     console.log(complementos)
// }

// escrevaEndereco('Rua Programador a Bordo', 'Brasília', 'Brasil', 'stado Distrito Federal', 'apto 1102', 'CEP:72322-601')




// Função autoexecutavel
// (function autoExecuta(nome) {
//     console.log("Executei", nome)

// }('Edimilson'))





//Uma variavel recebendo uma função
// let subtraiDoisNumeros = function subtrai(a, b) {
//     return a - b
// }
// console.log(subtraiDoisNumeros(10, 5))



//CALLBACKS
function somaCallback(a, b, fnCallback) {
    return fnCallback(a + b)
}
console.log(somaCallback(10, 3, function(total) {
    return total * 2
}))
