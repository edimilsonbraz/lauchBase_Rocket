// Vetores e objetos

const skills = [
    {
        nome: 'Edimilson',
        idade: 36,
        tecnologias: [
            {nome: 'C++', especialidade: 'Desktop'},
            {nome: 'Python', especialidade: 'Data Science'},
            {nome: 'JavaScript', especialidade: 'Web/Mobile'}
        ]

    }
]

console.log(`O usuário ${skills[0].nome} tem ${skills[0].idade} anos e usa tecnologia ${skills[0].tecnologias[2].nome} com especialidade ${skills[0].tecnologias[2].especialidade}`)
 