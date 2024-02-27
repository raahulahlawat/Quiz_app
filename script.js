const questions = [
    {
        question: "What is the group of crows called ?",
        answers: [
            {text: "1. Murder", correct: "true"},
            {text: "2. Group of Crows", correct: "false"},
            {text: "3. Flock", correct: "false"},
            {text: "4. A Herb", correct: "false"},
        ]
    },
    {
        question: "Which countary has the highest life expectancy in the world ?",
        answers: [
            {text: "1. India", correct: "false"},
            {text: "2. Hong Kong", correct: "true"},
            {text: "3. Australia", correct: "false"},
            {text: "4. China", correct: "false"},
        ]
    },
    {
        question: "What year was the United Nations etablished ?",
        answers: [
            {text: "1. 1957", correct: "false"},
            {text: "2. 1947", correct: "false"},
            {text: "3. 1945", correct: "true"},
            {text: "4. 1938", correct: "false"},
        ]
    },
    {
        question: "What company was initially  known as 'Blue Ribbon Sports'?",
        answers: [
            {text: "1. Adidas", correct: "false"},
            {text: "2. Puma", correct: "false"},
            {text: "3. Reebok", correct: "false"},
            {text: "4. Nike", correct: "true"},
        ]
    },
    {
        question: "What disease commonly spread on pirate ships?",
        answers:[
            {text: "1. Fever", correct: "false"},
            {text: "2. Scurvy", correct: "true"},
            {text: "3. Malaria", correct: "false"},
            {text: "4. Dengue", correct: "false"},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.disabled = true;
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();
