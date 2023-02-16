// Variable declaration 
let currLevel = 0;
const winLevel = 8;
let highScore = 0
let compSeq = []
let playerSeq = []
let prevRand = null
let rand = null
let renderDuration = 800


// Element objects
const startEl = document.getElementById('start')
const boardEl = document.querySelectorAll('.board')
const highScoreEl = document.getElementById('highscore')
const gameGridEl = document.querySelector('.gamegrid')
const splashEl = document.getElementById('splash')
let winId = document.createElement('p')
let loseId = document.createElement('p')
const slowEl = document.getElementById('slow')
const fastEl = document.getElementById('fast')
const normalEl = document.getElementById('normal')
const extremeEl = document.getElementById('extreme')


// Straightforward Functions
// Creates a random integer between 0 and 4 (value of new comp array index)
function randInteger() { 
    do {
        rand = Math.floor(Math.random() * 5)
    } while (rand === prevRand)
    return rand
}

// Checks to see if every index of two arrays are equal
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length){
        return false
    } else {
        for(index = 0; index<arr1.length; index++) {
            if (arr1[index] !== arr2[index]) {
                return false
            }
        }
        return true
    }
}

function changeDiff(evt) {
    if (evt.target.id === 'extreme') {
        normalEl.classList.remove("selector")
        extremeEl.classList.add('selector')
    } else if (evt.target.id === 'normal') {
        normalEl.classList.add("selector")
        extremeEl.classList.remove('selector')
    }
}

function changeSpeed(evt) {
    if (evt.target.id === 'fast') {
        slowEl.classList.remove("selector")
        fastEl.classList.add('selector')
        renderDuration = 200
    } else if (evt.target.id === 'slow') {
        slowEl.classList.add("selector")
        fastEl.classList.remove('selector')
        renderDuration = 800
    }
}

function removeButtons() {
    for (let button of boardEl) {
        button.removeEventListener ('click', gamePlay)
    }
}

function addButtons() {
    for (let button of boardEl) {
        button.addEventListener('click', gamePlay)
    }
}

function updateHighScore() {
    currLevel++
    if (currLevel>highScore) {
        highScore = currLevel
    }
}


// Render Functions
function renderHighScore() {
    highScoreEl.innerHTML = `High Score: ${highScore}`
}

function winMessage() {
    splashEl.classList.add('success')
    winId.id = 'win'
    gameGridEl.appendChild(winId)
    winId.innerHTML = 'WINNER WINNER CHICKEN DINNER'
}

function loseMessage() {
    loseId.id = 'lose'
    gameGridEl.appendChild(loseId)
    loseId.innerHTML = 'YOU LOST L0L'
}

function roundSuccessRender() {
    splashEl.classList.add('success')
    setTimeout(() => { 
        splashEl.classList.remove('success')
    }, 150)
}

function failRender() {
    splashEl.classList.add('fail')
}

function compRender (arr) {
    startEl.removeEventListener('click', startGame)
    slowEl.removeEventListener('click', changeSpeed)
    fastEl.removeEventListener('click', changeSpeed)
    removeButtons()
    let indComp = 0
    let lightIndex = 0     
    while (indComp < arr.length) {
        let element = boardEl[arr[indComp]]
        setTimeout(() => {
            element.classList.add('active')
            setTimeout(() => {
                element.classList.remove('active')
                lightIndex++
                if (lightIndex === arr.length) {
                    addButtons()
                    slowEl.addEventListener('click', changeSpeed)
                    fastEl.addEventListener('click', changeSpeed)
                    startEl.addEventListener('click', startGame)
                }
            }, renderDuration)
        }, 600 + indComp*renderDuration)
        indComp++
    }
}

// Main Code for Game Operation
startEl.addEventListener('click', startGame)
slowEl.addEventListener('click', changeSpeed)
fastEl.addEventListener('click', changeSpeed)
normalEl.addEventListener('click', changeDiff)
extremeEl.addEventListener('click', changeDiff)


function startGame() {
    splashEl.classList.remove('fail')
    splashEl.classList.remove('success')
    winId.remove()
    loseId.remove()
    currLevel = 0;
    compSeq = [];
    playerSeq = [];
    addButtons()
    nextRound();
}

function nextRound () {
    playerSeq = []
    if (extremeEl.classList.contains('selector')) {
        compSeq = []

        for (i=0; i<=currLevel; i++) {
            compSeq.push(randInteger())
            prevRand = compSeq[compSeq.length-1]
        }

    } else {
        compSeq.push(randInteger())
    }
    prevRand = compSeq[compSeq.length-1]
    compRender(compSeq)
}

function gamePlay (evt) {
    playerSeq.push(parseInt(evt.target.id))
    if (arraysEqual(compSeq, playerSeq) && currLevel === winLevel-1) {
        updateHighScore()
        renderHighScore()
        winMessage() 
        removeButtons()
    } else if (arraysEqual(compSeq, playerSeq)) {
        roundSuccessRender()
        updateHighScore()
        renderHighScore()
        setTimeout(nextRound, 200)
    } else if (compSeq[playerSeq.length-1] !== playerSeq[playerSeq.length-1]) {
        loseMessage()
        failRender()
        removeButtons()
    } else {
        roundSuccessRender()
    }
}