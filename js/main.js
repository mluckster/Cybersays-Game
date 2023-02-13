let currLevel = 0;
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

async function toggle (element) {
    return new Promise ((resolve) => {
        setTimeout(() => {
            element.classList.add('active')
        }, 200)
        setTimeout(() => {
            element.classList.remove('active')
            resolve();
        }, 800)
    }) 
}

// used in dom lab, this only works on event listener - evt.target.classList.add('active')
// inserting render function here this will be for the computer array render:

async function compRender () {
    for (indComp=0; indComp<currLevel; indComp++) {
        await toggle (boardEl[compSeq[indComp]])
    }
}
    



// if (playerSeq.length === 0) {
//         let i = 0
//         addActive(i)
//     }
// }
// function addActive (i) {
//     boardEl[compSeq[i]].classList.add('active')
//     setTimeout (() => {
//         removeActive(i)
//     }, 1000)
// }
// function removeActive (i) {
//     boardEl[compSeq[i]].classList.remove('active')
//     i++
//     if (index <= compSeq.length){
//         addActive ()
//     }
//     else {
//         return
//     }
// }





console.log('-----------------')
// document.getElementById(compSeq[0]).classList.add('active')



console.log("random integer is" + randInteger())

console.log(boardEl)
console.log(startEl)

//begin.target is the start button
startEl.addEventListener('click', async (begin) => {
    // console.log(begin.target)
    currLevel = 0;
    compSeq = [];
    playerSeq = [];




    
    while (arraysEqual(compSeq, playerSeq)) {
        if (currLevel === 10) {
            console.log(`congrats, you've won the game`)
        }
        playerSeq = [];
        currLevel++
        newRand = randInteger()
        compSeq.push(newRand)
        console.log('computer sequence is ' + compSeq)
        compRender ()
        // need to render the pattern here  
        // boardEl[0] will select individual board buttons
        
        // checks every index that the player inputs against the same index on computer
        // 
        for (index = 0; index < currLevel; index++) {
            console.log('-----------------')
            console.log(playerSeq[index])
            console.log(compSeq[index])
            playerSeq.push(await getInput())
            console.log('-----------------')
            console.log(playerSeq[index])
            console.log(compSeq[index])
            if (playerSeq[index] !== compSeq[index]){
                // GAME OVER HERE
                break
            }
        }

    }
    console.log('are the arrays equal still? ' + arraysEqual(compSeq, playerSeq))

})






//I think I need this at the top of the startEl.addEventListener and below where
// comp and player arrays get reset
