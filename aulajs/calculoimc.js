//Desafio 1-1 
//Construir programa que calcula IMC(Calculo de indece massa)

const nome = "Jose"
const peso = 84;
const altura = 1.88;

const imc = peso / (altura * altura)

console.log(imc)

if (imc >= 30) {
    console.log("José, você acima do peso, PRECISA SE MEXER!")
} else if (imc <= 29.9 ) {
    console.log ("José, você não está acima do peso, PARABÉNS!!!")
}



