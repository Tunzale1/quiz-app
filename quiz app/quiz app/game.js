const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText= document.getElementById("questionCounter");
const scoreText = document.getElementById("score")

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
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
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;


    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? "duz" : "sehv";
        
        if(classToApply === "duz"){
            incrementScore(CORRECT_BONUS);
        }
        if(classToApply==="sehv"){
            decrementScore(CORRECT_BONUS)
        }
        selectedChoice.parentElement.classList.add(classToApply)
       

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
          }, 1000);
        
      
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };

decrementScore = num => {
    score -= num;
    scoreText.innerText= score
}  

startGame();