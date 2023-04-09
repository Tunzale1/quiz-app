const question=document.getElementById("question");
const choices= Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion={};
let acceptingAnswers= true;
let score=0;
let questionCounter=0;
let availableQuestions=[];

let questions=[
    {
        question: "Menim en sevdiyim reng hansidir?",
        choice1:"qirmizi",
        choice2:"yasil",
        choice3: "benovseyi",
        choice4: "men ne bilim pervin",
        answer:3

    },
    {
        question: "Sevgili tapacam bu il?",
        choice1:"insAllah gelen ay",
        choice2:"100%",
        choice3: "1 qr subhen olmasin",
        choice4: "niye de yox, hetta ozu seni tapacaq",
        answer: 4

    },
    {
        question: "ordekler gedir yol ile....",
        choice1:"cibi dolu pul ile",
        choice2:"nolar cixaq gedey tay",
        choice3: "uzulur uregime",
        choice4: "sahura 1 saat qalib",
        answer: 4

    },

]

//hahha
const CORRECT_BONUS=10;
const MAX_QUESTIONS=3;

startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion=()=>{
    if(availableQuestions.length=0 || questionCounter >= MAX_QUESTIONS){
       
        return window.location.assign("./end.html")
    }
    questionCounter++;
    const questionIndex= Math.floor(Math.random() *availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;

choices.forEach(choice=>{
    const number= choice.dataset['number'];
    choice.innerText=currentQuestion["choice"+ number]
});
availableQuestions.splice(questionIndex, 1);
console.log(availableQuestions);
acceptingAnswers=true;
}

choices.forEach(choice=>{
    choice.addEventListener("click", e=>{
        if(!acceptingAnswers) return;
        acceptingAnswers= false;
        const selectedChoice=e.target;
        const selectedAnswer = selectedChoice.dataset["number"]
        console.log(selectedAnswer);
        getNewQuestion()
    })
})

startGame()