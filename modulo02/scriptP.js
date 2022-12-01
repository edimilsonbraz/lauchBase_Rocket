const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card')
const modal = document.querySelector('.modal')


for (let card of cards) {
    card.addEventListener("click", function (){
        const paginaId = card.getAttribute("id"); //pega o id da pagina no html e faz com que abra na modal cada pag
        modalOverlay.classList.add('active')
        modalOverlay.querySelector("iframe").src = `https://rocketseat.com.br/${paginaId}` //pegando o iframe
    })
}
//botao pra pegar o modal
document.querySelector('.close-modal').addEventListener("click", function () {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector("iframe").src = "" //remove a pag na modal quando fechado
    modal.classList.remove('maximize')
})

document.querySelector('.maximize-modal').addEventListener("click", function () {
    if(!modal.classList.contains('maximize')) {
        modal.classList.add('maximize')
    }
})


