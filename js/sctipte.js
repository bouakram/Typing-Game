// array of words
let words = [
    "the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"
]

// setting levels

let levls = {
    "Easy" : 6,
    "Normal": 3,
    "Hard":2
}

// default lvl
// let defaultLvl = document.querySelector('input[name="def"]:checked').value //change level from here
let defaultLvl = "Normal"
let defaultSeconds = levls[defaultLvl]

// catch selectors

let startBtn = document.querySelector(".start")
let lvlNamesSpan = document.querySelector(".messages .lvl")
let secoundSpan = document.querySelector(".messages .seconds")
let theword = document.querySelector(".the-word")
let upcomingWord = document.querySelector(".upcoming-word")
let input = document.querySelector(".input")
let timeSpam = document.querySelector(".time span")
let scoreGot = document.querySelector(".score .got")
let scoreTotal = document.querySelector(".score .total")
let finishMessage = document.querySelector(".finish")

// setting levls names + seconds + score

lvlNamesSpan.innerHTML = defaultLvl
secoundSpan.innerHTML = defaultSeconds
timeSpam.innerHTML = defaultSeconds
scoreTotal.innerHTML = words.length

// disable paste event 

input.onpaste = function (){
    return false
}

//start game

startBtn.addEventListener("click", function (){
    this.remove()
    input.focus()
    // generate words function 
    generateWords()
})

//function generator words 

function generateWords(){
    // get randoms words from the array 
    let randWords = words[Math.floor(Math.random()* words.length)]
    // get word index 
    let wordIndex = words.indexOf(randWords)
    // remouve hte word from the array with the index
    words.splice(wordIndex, 1)
    //show the random word
    theword.innerHTML = randWords
    // empty upcoming words 
    upcomingWord.innerHTML = ''

    //generate upcoming words 
    for(let i = 0; i<words.length; i++ ){
        // creat div elmnt
        let div = document.createElement("div")
        let txt = document.createTextNode(words[i])
        div.appendChild(txt)
        upcomingWord.appendChild(div)
    }
    startplay()
}

// start play function 
function startplay(){
    timeSpam.innerHTML = defaultSeconds
    let start = setInterval(()=> {
        timeSpam.innerHTML--
        if(timeSpam.innerHTML === "0"){
            //stop timne
            clearInterval(start)
            // compare words 
            if(theword.innerHTML.toLocaleLowerCase() === input.value.toLocaleLowerCase()){
                // empty input feild
                input.value = ''
                // incress score
                scoreGot.innerHTML++
                if(words.length > 0){//if still words
                    generateWords()
                }else{
                    let span = document.createElement('span')
                    span.className = 'good'
                    let spantext = document.createTextNode('You Win')
                    span.appendChild(spantext)
                    finishMessage.appendChild(span)
                    //remove upcaming box
                    upcomingWord.remove()
                }
            }else { // game over 
                let span = document.createElement("span")
                span.className = 'bad'
                let spantext = document.createTextNode('Game Over')
                span.appendChild(spantext)
                finishMessage.appendChild(span)
            }
        }
    },1000)

}