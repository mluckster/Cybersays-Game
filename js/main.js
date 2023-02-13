let currLevel = 0;
const lastLevel = 10;
let compSeq = []
let playerSeq = []
let newRand = null

console.log('-----------------')
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

async function getInput() {
    return new Promise((resolve) => {
        for (let button of boardEl) {
            button.addEventListener('click', () => {
                resolve(parseInt(button.id))
            })
        }
    })
}




console.log("random integer is" + randInteger())

const startEl = document.getElementById('start')
const boardEl = document.querySelectorAll('.board')
console.log(boardEl)
console.log(startEl)

//begin.target is the start button
startEl.addEventListener('click', async (begin) => {
    // console.log(begin.target)
    currLevel = 0;
    compSeq = [];
    playerSeq = [];
    
    while (arraysEqual(compSeq, playerSeq)) {
        playerSeq = [];
        currLevel++
        newRand = randInteger()
        compSeq.push(newRand)
        console.log('computer sequence is ' + compSeq)
        // need to render the pattern here  
        // boardEl[0] will select individual board buttons
        
        // console.log(boardEl)
        for (index = 0; index < currLevel; index++) {
            playerSeq.push(await getInput())
            console.log(playerSeq[index])
            console.log(compSeq[index])
            if (playerSeq[index] !== compSeq[index]){
                break
            }
        }
        
    }
    console.log('are the arrays equal still? ' + arraysEqual(compSeq, playerSeq))

})






//I think I need this at the top of the startEl.addEventListener and below where
// comp and player arrays get reset
