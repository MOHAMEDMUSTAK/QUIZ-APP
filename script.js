const questions = [
    { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris" },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Venus", "Mars", "Jupiter"], correct: "Mars" },
    { question: "What is the largest ocean on Earth?", answers: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: "Pacific" },
    { question: "Who wrote 'Romeo and Juliet'?", answers: ["Shakespeare", "Hemingway", "Austen", "Dickens"], correct: "Shakespeare" },
    { question: "What is the square root of 64?", answers: ["6", "7", "8", "9"], correct: "8" },
    { question: "What is the chemical symbol for Gold?", answers: ["Ag", "Au", "Pb", "Fe"], correct: "Au" },
    { question: "Which gas do plants absorb from the atmosphere?", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: "Carbon Dioxide" },
    { question: "Who painted the Mona Lisa?", answers: ["Van Gogh", "Michelangelo", "Leonardo da Vinci", "Picasso"], correct: "Leonardo da Vinci" },
    { question: "Which country hosted the 2016 Summer Olympics?", answers: ["China", "Brazil", "USA", "UK"], correct: "Brazil" },
    { question: "What is the fastest land animal?", answers: ["Lion", "Horse", "Cheetah", "Tiger"], correct: "Cheetah" },
    { question: "Which is the smallest planet in our solar system?", answers: ["Mercury", "Mars", "Pluto", "Venus"], correct: "Mercury" },
    { question: "What is the capital of Japan?", answers: ["Beijing", "Seoul", "Tokyo", "Bangkok"], correct: "Tokyo" },
    { question: "How many continents are there on Earth?", answers: ["5", "6", "7", "8"], correct: "7" },
    { question: "Who developed the theory of relativity?", answers: ["Newton", "Tesla", "Einstein", "Galileo"], correct: "Einstein" },
    { question: "What is the currency of the United Kingdom?", answers: ["Euro", "Dollar", "Pound", "Yen"], correct: "Pound" }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        if (answer === currentQuestion.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";   
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionElement.innerText = `Quiz Completed! Your score: ${score} / ${questions.length}`;
        resetState();
        nextButton.innerHTML = "Restart";
        nextButton.style.display = "block";
        nextButton.addEventListener("click", startQuiz);
    }
});
startQuiz();
