//Calcular Aposentadoria

const nome1 = 'Diego';
const nome2 = 'Silvana';
const sexo = 'F';
const idade = 58;
const contribuicao = 30;

//Tempo de contribuição mínima para Homem = 35 anos
//Tempo de contribuição mínima para Mulher = 30 anos
// Regra 85-95, A soma de idade + contribuição
//Para homem precisa ser no mínimo 95 anos
//Para mulher precisa ser no mínimo 85 anos


const icont = (idade + contribuicao)

if (sexo == 'M') {
    if (sexo == 'M' && contribuicao >= 35 && icont >= 95) {
        console.log(nome1, "você pode se aposentar!")    
    } else {
        console.log(nome1, "você ainda não pode se aposentar!")
    }
} else if (sexo == 'F' && contribuicao >= 30 && icont >= 85) {
    console.log(nome2, "você pode se aposentar!")
} else {
    console.log(nome2, "você ainda não pode se aposentar!")
} 






