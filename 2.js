let gameCounter;
let gameTimeLeft;
let gameOn = false;
let setQA;
let numberOfQuestion=0;
let numberOfCorrectQuestion=0;
let numberOfWrongQuestion=0;

document.querySelector("#start").addEventListener("click",()=>{
    gameOn = true
    document.getElementById("overlay").style.display = "none";
    document.querySelector("#questionanswered").innerHTML=numberOfQuestion;
    let timeLeft=30
    document.querySelector("#remainingtime").innerHTML=timeLeft;
    gameCounter= setInterval(()=>{timeLeft--;document.querySelector("#remainingtime").innerHTML = timeLeft},1000);
    gameTimeLeft= setTimeout(gameOver, 30000);
    newQuestion();
})

for(let b=1;b<5; b++) {
    document.getElementById("box" + b).onclick = ()=> {
        let requiredBox="box" + b;
        let requiredAnswer;
        if(requiredBox === "box1"){
            requiredAnswer=setQA.answerOption[0];
        }
        else if(requiredBox === "box2"){
            requiredAnswer=setQA.answerOption[1];
        }
        else if(requiredBox === "box3"){
            requiredAnswer=setQA.answerOption[2];
        }
        else {
            requiredAnswer=setQA.answerOption[3];
        }
        numberOfQuestion++;
        if(requiredAnswer === setQA.correctAnswer) {
            numberOfCorrectQuestion++;
        }
        else{
            numberOfWrongQuestion++;
        }
        document.querySelector("#questionanswered").innerHTML=numberOfQuestion;
        newQuestion();
    }
}
const gameOver=()=>{
    window.clearInterval(gameCounter);
    gameOn = false;
    document.getElementById("overlay").style.display = "block";
    document.querySelector("#statementA").innerHTML=`You answered ${numberOfQuestion} questions`;
    document.getElementById("start").style.display = "none";
    document.querySelector("#statementB").innerHTML=`Correct: ${numberOfCorrectQuestion} `;
    document.querySelector("#statementC").innerHTML=`Wrong: ${numberOfWrongQuestion}`;
    let requiredtotal=10;
    let averagePer=0
    if (numberOfQuestion<requiredtotal){
        averagePer= Math.ceil((numberOfCorrectQuestion/requiredtotal)*10);
    }{
        averagePer= Math.ceil((numberOfCorrectQuestion/(numberOfQuestion+numberOfWrongQuestion))*10);
    }
    document.querySelector("#statementD").innerHTML=`You beat ${averagePer} out of 10 people`;
}
const newQuestion=()=>{
    setQA = generateQA();
    document.querySelector("#showquestion").innerHTML=`${setQA.firstNumber} x ${setQA.secondNumber}=?`;
    document.querySelector("#option1").innerHTML=`A: ${setQA.answerOption[0]} `;
    document.querySelector("#option2").innerHTML=`B: ${setQA.answerOption[1]}`;
    document.querySelector("#option3").innerHTML=`C: ${setQA.answerOption[2]}`;
    document.querySelector("#option4").innerHTML=`D: ${setQA.answerOption[3]}`;
}
const generateQA=()=> {
    let firstNumber = Math.ceil(Math.random()*10);
    let secondNumber = Math.ceil(Math.random()*10);
    let correctAnswer= firstNumber * secondNumber
    let answerOption=[0,0,0,0]
    answerOption[3]=correctAnswer
    for (let i=0;i<3;i++){
        repeat=1
        while(repeat){
            tempOption=Math.ceil(Math.random()*10)*Math.ceil(Math.random()*10)
            if(tempOption!==correctAnswer){
                repeat=0;
            }
            answerOption[i]=tempOption
        }
    }
    shuffleArray(answerOption);
    return {firstNumber,secondNumber,correctAnswer,answerOption};
}


const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
