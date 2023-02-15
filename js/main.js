let currLevel = 0;
const winLevel = 10;
let highScore = 0
let compSeq = []
let playerSeq = []
console.log(playerSeq.length ===0)
let prevRand = null
let rand = null
const startEl = document.getElementById('start')
const boardEl = document.querySelectorAll('.board')
const highScoreEl = document.getElementById('highscore')
const gameGridEl = document.querySelector('.gamegrid')
let winId = document.createElement('p')
let loseId = document.createElement('p')
const imageEl = document.getElementById('image')

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

startEl.addEventListener('click', startGame)

function startGame() {
    imageEl.classList.remove('fail')
    imageEl.classList.remove('success')
    winId.remove()
    loseId.remove()
    currLevel = 0;
    compSeq = [];
    playerSeq = [];
    addButtons() //I might be able to take this out
    nextRound();
}
function renderHighScore() {
    highScoreEl.innerHTML = `High Score: ${highScore}`
}
function nextRound () {
    playerSeq = []
    compSeq.push(randInteger())
    prevRand = compSeq[compSeq.length-1]
    console.log('computer sequence is ' + compSeq)
    compRender(compSeq)
}
function winMessage() {
    imageEl.classList.add('success')
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
    imageEl.classList.add('success')
    setTimeout(() => { 
        imageEl.classList.remove('success')
    }, 150)
}
function failRender() {
    imageEl.classList.add('fail')
}
function updateHighScore() {
    currLevel++
    if (currLevel>highScore) {
        highScore = currLevel
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
function gamePlay (evt) {
    console.log("evt.target")
    console.log(evt.target)
    playerSeq.push(parseInt(evt.target.id))
    // playToggle(playerSeq)
    console.log(playerSeq)
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
function compRender (arr) {
    startEl.removeEventListener('click', startGame)
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
                    startEl.addEventListener('click', startGame)
                }
            }, 800)
        }, 800 + indComp*800)
        indComp++
    }
}