const currLevel = 1;
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





console.log("random integer is" + randInteger())

const startEl = document.getElementById('start')
const boardEl = document.querySelectorAll('.board')
console.log(boardEl)
console.log(startEl)

//begin.target is the start button
startEl.addEventListener('click', (begin) => {
    // console.log(begin.target)
    compSeq = [];
    playerSeq = [];


    while (arraysEqual(compSeq, playerSeq)) {
        for (index = 1; index <= currLevel; index++) {
            newRand = randInteger()
            compSeq.push(newRand)
            console.log('computer sequence is ' + compSeq)
            // need to render the pattern here  
        }
        //this - boardEl[0] will select individual board buttons
        console.log(boardEl[0])
        for (let circle of boardEl) {
            console.log(circle)
            // console.log(boardEl)
            circle.addEventListener('click,', (evt2) => {
                console.log(evt2.target)
            })
        }
    }
    console.log('are the arrays equal still? ' + arraysEqual(compSeq, playerSeq))

})



//I think I need this at the top of the startEl.addEventListener and below where
// comp and player arrays get reset
