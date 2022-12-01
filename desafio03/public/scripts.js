const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card')
const modal = document.querySelector('.modal')


for (let card of cards) {
    card.addEventListener("click", function (){
        const paginaId = card.getAttribute("id"); //pega o id da pagina no html e faz com que abra na modal cada pag
        window.location.href = `/courses/${paginaId}` 
    })
}


