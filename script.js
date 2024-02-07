const gameCardsEl = document.querySelector('#cards-wrapper');
const cardEl = document.querySelectorAll('.card');
const outcomeMsgEl = document.querySelector('#outcome-msg');
const timerEl = document.querySelector('#timer')
const btnEl = document.querySelector('button')

const symbols = ['X', 'O', '$', '*', '+', '='];
const symbolsList = [...symbols, ...symbols]

runGame();

function runGame() {
    shuffleCards()
}

function shuffleCards() {
    symbolsList.sort(() => Math.random() - .5)
    cardEl.forEach((card, idx) => {
        card.textContent = symbolsList[idx];
    })
}

function selectCard() {

}

function startTimer() {

}

function restartGame() {

}