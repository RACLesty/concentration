const gameCardsEl = document.querySelector('#cards-wrapper');
const cardEl = document.querySelectorAll('.card');
const outcomeMsgEl = document.querySelector('#outcome-msg');
const timerEl = document.querySelector('#timer')
const btnEl = document.querySelector('button')

const symbols = ['X', 'O', '$', '*', '+', '='];
const symbolsList = [...symbols, ...symbols]

let selectedCards = [];
let move = false;
let matchedCount = 0;
let timerInterval;

runGame();

gameCardsEl.addEventListener('click', selectCard);

btnEl.addEventListener('click', restartGame)

function runGame() {
    shuffleCards()
    startTimer()
}

function shuffleCards() {
    symbolsList.sort(() => Math.random() - .5);
    cardEl.forEach((card, idx) => {
        card.textContent = symbolsList[idx];
        card.setAttribute('data-symbol', symbolsList[idx])
    })
}

function selectCard(event) {
    const clickedCard = event.target;
    if (
    !clickedCard.classList.contains('card') || 
    move || 
    selectedCards.includes(clickedCard) || 
    clickedCard.classList.contains('matched')
    ) return;
    flipCard(clickedCard)
    selectedCards.push(clickedCard);
    if (selectedCards.length ===2) {
        move = true
        checkMatch()
    }
}

function flipCard(card) {
    card.classList.add('flipped')
}

function checkMatch(){
    const [card1, card2] = selectedCards;
    const symbol1 = card1.getAttribute('data-symbol');
    const symbol2 = card2.getAttribute('data-symbol');
    if (symbol1 === symbol2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        if(matchedCount === symbolsList.length) {
            clearInterval(timerInterval);
            outcomeMsgEl.textContent = 'Congratulations! You won!'
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    move = false
    selectedCards = []
}

function startTimer() {
    let timerLeft = 30;
    timerInterval = setInterval(() => {
        timerEl.textContent = `Time Left: ${timerLeft} seconds`;
        timerLeft--;
        if (timerLeft < 0) {
            clearInterval(timerInterval)
        }
    }, 1000);

}

function restartGame() {
    clearInterval(timerInterval);
    selectCard = [];
    move = false;
    shuffleCards();
    cardEl.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
    startTimer();
}