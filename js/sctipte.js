let replay = 0

var bs=localStorage.getItem("bestscore");
console.log(bs)

// array of words
const wordsE = [
    "the","me" ,"of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part" 
]

const wordsN = ["fanatic",
"geeks","for","geeks","a",    "portal","to","learn","can",   "be","computer","science", "zoom","yup","fire","in","be","data","geeks","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"]

const wordsH = ["fantastics","score","calculate", "landscape", "dare" ,"level", "involvement", "sufficient", "headline", "could", "index" ,"procedure", "them" ,"bread" ,"cow" ,"material","commercial" ,"indeed", "protection", "development", "avoid"]

let words=Array.from(wordsN);
// setting levels

let levls = {
    "Easy" : 6,
    "Normal": 3,
    "Hard":2
}

// default lvl
// let defaultLvl = document.querySelector('input[name="def"]:checked').value //change level from here

// start
// chose ure defuculity level
var forme = document.getElementById("def");
var x= document.querySelector('input[name="deffeculity"]:checked');

console.log(x.value); 

forme.onchange= function(){
    x= document.querySelector('input[name="deffeculity"]:checked');
    defaultLvl = x.value 
    lvlNamesSpan.innerHTML = defaultLvl
    defaultSeconds = levls[defaultLvl]
    secoundSpan.innerHTML = defaultSeconds
    timeSpam.innerHTML = defaultSeconds

    // new idea
    
    if(defaultLvl === "Easy"){
        words = Array.from(wordsE)
    }
    else if(defaultLvl === "Normal"){
        words = Array.from(wordsN)
    }else{
        words = Array.from(wordsH)
    }
}

// asigment the time to 0 whene enter ok
window.addEventListener("keydown",function(e){
    
    if (e.code=="Enter"){
        
    timeSpam.innerHTML = "0";
    
}
});

// end


let defaultLvl = x.value
let defaultSeconds = levls[defaultLvl]

// catch selectors

let startBtn = document.querySelector(".start")
let restartBtn = document.querySelector(".Restart")
let lvlNamesSpan = document.querySelector(".messages .lvl")
let secoundSpan = document.querySelector(".messages .seconds")
let theword = document.querySelector(".the-word")
let upcomingWord = document.querySelector(".upcoming-word")
let input = document.querySelector(".input")
let timeSpam = document.querySelector(".time span")
let scoreGot = document.querySelector(".score .got")
let scoreTotal = document.querySelector(".score .total")
let scoreBest =  document.querySelector(".score .bestscore")
let finishMessage = document.querySelector(".finish")

// setting levls names + seconds + score

lvlNamesSpan.innerHTML = defaultLvl
secoundSpan.innerHTML = defaultSeconds
timeSpam.innerHTML = defaultSeconds
scoreTotal.innerHTML = words.length
scoreBest.innerHTML = bs
// disable paste event 

input.onpaste = function (){
    return false
}

//start game

startBtn.addEventListener("click", function (){
    forme.style.display="none"
    this.remove()
    input.focus()
    // generate words function 
    generateWords()
})
// restart gane 
restartBtn.style.display = "none"
restartBtn.addEventListener("click", function(){
     
    if(replay === 1){
        scoreGot.innerHTML="0"
        forme.style.display="none"
        restartBtn.style.display = "none"
        // this.remove()
        input.focus()
        replay = 0
        finishMessage.innerHTML = ''
        input.value = ''
        // generate words function 
        if(defaultLvl === "Easy"){
            words = Array.from(wordsE)
        }
        else if(defaultLvl === "Normal"){
            words = Array.from(wordsN)
        }else{
            words = Array.from(wordsH)
        }
        generateWords()
    }
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
                    var span = document.createElement('span')
                    span.className = 'good'
                    var spantext = document.createTextNode('You Win')
                    span.appendChild(spantext)
                    finishMessage.appendChild(span)
                    //remove upcaming box
                    upcomingWord.remove()
                    timeSpam.innerHTML = "1"
                    
                    replay = 1
                    restartBtn.style.display = "block"
                    
                    forme.style.display="block"
                    if (scoreGot.innerHTML > scoreBest.innerHTML){
                        
                        scoreBest.innerHTML=scoreGot.innerHTML
                        
                        localStorage.setItem("bestscore",scoreBest.innerHTML );
                    }
                }
            }else { // game over 
                var span = document.createElement("span")
                span.className = 'bad'
                var spantext = document.createTextNode('Game Over')
                span.appendChild(spantext)
                finishMessage.appendChild(span)
                timeSpam.innerHTML = "1"
                replay = 1
                restartBtn.style.display = "block"
                
                forme.style.display="block"
                if (scoreGot.innerHTML > scoreBest.innerHTML){
                    scoreBest.innerHTML=scoreGot.innerHTML
                    
                    localStorage.setItem("bestscore",scoreBest.innerHTML );
                }
            }
        }
        timeSpam.innerHTML--
    },1000)

}