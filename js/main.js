let currLevel = 0;
const winLevel = 3;
const lastLevel = 10;
let compSeq = []
let playerSeq = []
console.log(playerSeq.length ===0)
let prevRand = null
let rand = null
const startEl = document.getElementById('start')
const boardEl = document.querySelectorAll('.board')

console.log(boardEl)
console.log(boardEl[0])
console.log(boardEl[4])

console.log("the arrays are equal? " + arraysEqual(compSeq, playerSeq))

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
    
function playToggle (arr) {
    boardEl[arr[arr.length-1]].classList.add('active')
    setTimeout(() => {
        boardEl[arr[arr.length-1]].classList.remove('active')
    }, 150)
}

console.log('-----------------')
// document.getElementById(compSeq[0]).classList.add('active')

console.log("random integer is" + randInteger())
console.log('board element:')
console.log(boardEl)
console.log(boardEl[0])
console.log(boardEl[2])
console.log(startEl)

startEl.addEventListener('click', startGame)

function startGame() {
    currLevel = 0;
    compSeq = [];
    playerSeq = [];
    // console.log(begin.target)
    for (let button of boardEl) {
        button.addEventListener('click', gamePlay)
    }
    for (let button of boardEl) {
        button.classList.remove('active')
    }
    nextRound();
}



function nextRound () {
    currLevel++
    playerSeq = []
    compSeq.push(randInteger())
    prevRand = compSeq[compSeq.length-1]
    console.log('computer sequence is ' + compSeq)
    compRender(compSeq)
}

// THIS FUNCTION NEED TO WORK ON
function winMessage() {
    console.log('you have won the game!')
    // document.querySelectorAll('.board').style.backgroundColor = 'blue'
    console.log(document.querySelectorAll('.gamegrid>.board'))
    document.querySelectorAll('.gamegrid>.board').style.backgroundColor = 'blue'
    const win = document.createElement('div')
    win.classList.add('win-message')
    win.textContent = `You've won the Game!`
}

// this breaks the comp render and the start button for some reason
function roundSuccessRender() {
    console.log('game board element')
    console.log(document.querySelectorAll('.board'))
    console.log(boardEl)
    setTimeout(() => { 
        for (let board of boardEl) {
            board.style.backgroundColor = 'black'
        }
        setTimeout(() => { 
            for (let board of boardEl) {
                board.style.backgroundColor = " #850000"
            }
        }, 200)
    }, 200)
}


function gamePlay (evt) {
    console.log("evt.target")
    console.log(evt.target)
    playerSeq.push(parseInt(evt.target.id))
    playToggle(playerSeq)
    console.log(playerSeq)
    if (arraysEqual(compSeq, playerSeq) && currLevel === winLevel) {
        console.log('you have won the game!')
        // winMessage() 
        for (let button of boardEl) {
            button.removeEventListener ('click', gamePlay)
        }
    } else if (arraysEqual(compSeq, playerSeq)) {
        // roundSuccessRender()
        setTimeout(nextRound, 400)
    } else if (compSeq[playerSeq.length-1] !== playerSeq[playerSeq.length-1]) {
        console.log('you failed :)')
        for (let button of boardEl) {
            button.removeEventListener ('click', gamePlay)
        }
    } else {
        return
    }
}

function compRender (arr) {
    startEl.removeEventListener('click', startGame)
    for (let button of boardEl) {
        button.removeEventListener('click', gamePlay)
    }
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
                    for (let button of boardEl) {
                        button.addEventListener('click', gamePlay)
                    }
                    startEl.addEventListener('click', startGame)
                }
            }, 800)
        }, 800 + indComp*800)
        indComp++
    }
}



console.log('are the arrays equal still? ' + arraysEqual(compSeq, playerSeq))