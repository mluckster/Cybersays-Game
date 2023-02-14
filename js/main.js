let currLevel = 0;
const winLevel = 2;
const lastLevel = 10;
let compSeq = []
let playerSeq = []
console.log(playerSeq.length ===0)
let newRand = null
const startEl = document.getElementById('start')
const boardEl = document.querySelectorAll('.board')

console.log(boardEl)
console.log(boardEl[0])
console.log(boardEl[4])

console.log("the arrays are equal? " + arraysEqual(compSeq, playerSeq))

// Creates a random integer between 0 and 4 (value of new comp array index)
function randInteger() {
    return Math.floor(Math.random() * 5)
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

// used in asynch functions - returns resolve with a value / reject with a reason (error)
async function getInput() {
    return new Promise((resolve) => {
        for (let button of boardEl) {
            button.addEventListener('click', (evt) => {
                console.log("evt.target")
                console.log(evt.target)
                button.removeEventListener('mousemove', evt.target)
                resolve(parseInt(button.id))
            })
        }
    })
}
// maybe try to remove event listener on getInput - right now it's creating an 
// event listener every time we loop through the rounds of the game

async function compToggle (element) {
    return new Promise ((resolve) => {
        setTimeout(() => {
            element.classList.add('active')
        }, 500)
        setTimeout(() => {
            element.classList.remove('active')
            resolve();
        }, 1200)
    })
}

// used in dom lab, this only works on event listener - evt.target.classList.add('active')
// inserting render function here this will be for the computer array render:

// async function compRender () {
//     for (indComp=0; indComp<currLevel; indComp++) {
//         await compToggle (boardEl[compSeq[indComp]])
//     }
// }


    
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

//begin.target is the start button
startEl.addEventListener('click', (begin) => {
    currLevel = 0;
    compSeq = [];
    playerSeq = [];
    // console.log(begin.target)
    nextRound();
    for (let button of boardEl) {
        button.addEventListener('click', gamePlay)
    }
})

// should maybe try to get away from the wile loop - can call functions instead and use if statement


function nextRound () {
    currLevel++
    playerSeq = []
    newRand = randInteger()
    compSeq.push(newRand)
    console.log('computer sequence is ' + compSeq)
    compRender(compSeq)
}

// THIS FUNCTION NEED TO WORK ON
function winMessage() {
    console.log('you have won the game!')
    document.querySelectorAll('.board').style.backgroundColor = 'blue'
    const win = document.createElement('div')
    win.classList.add('win-message')
    win.textContent = `You've won the Game!`
}

function gamePlay (evt) {
    console.log("evt.target")
    console.log(evt.target)
    playerSeq.push(parseInt(evt.target.id))
    playToggle(playerSeq)
    console.log(playerSeq)
    if (arraysEqual(compSeq, playerSeq) && currLevel === winLevel) {
        console.log('you have won the game!')
        // winMessage() --- need to fix this function and have it display something
        for (let button of boardEl) {
            button.removeEventListener ('click', gamePlay)
        }
    } else if (arraysEqual(compSeq, playerSeq)) {
        nextRound()
    } else if (compSeq[playerSeq.length-1] !== playerSeq[playerSeq.length-1]) {
        console.log('you failed :)')
        for (let button of boardEl) {
            button.removeEventListener ('click', gamePlay)
        }
    } else {
        return
    }
}

// function compRender (arr) {
//     let compIndex = 0
//     let boardTarget = boardEl[arr[compIndex]]
//     addActive (boardTarget, compIndex)
// }
// function addActive (boardTarget, compIndex) {
//     setTimeout
// }


// idk whats happening here, not sure how to fix this
function compRender (arr) {
    let indComp = 0
    let element = boardEl[arr[indComp]]
    setTimeout (() => {
        element.classList.add('active')
        setTimeout (() => {
            element.classList.remove('active')
            indComp++
            if (indComp > arr.length) {
                return
            } else {
                compRender (arr)
            }
        }, 1200)
    }, 200)
}





    // while (indComp<arr.length) {
    //     let element = boardEl[arr[indComp]]
    //     setTimeout(() => {
    //         element.classList.add('active')
    //         setTimeout(() => {
    //             element.classList.remove('active')
    //         }, 1300 + indComp*1300)
    //     }, 200 + indComp*200)
    // }




    console.log('are the arrays equal still? ' + arraysEqual(compSeq, playerSeq))








//I think I need this at the top of the startEl.addEventListener and below where
// comp and player arrays get reset
