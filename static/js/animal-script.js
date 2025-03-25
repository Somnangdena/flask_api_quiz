const quizData = [
  {
    question: 'Which animal is known as the "King of the Jungle"?',
    options: [
      'Tiger', 
      'Elephant', 
      'Lion', 
      'Gorilla'
    ],
    answer: 'Lion',
  },
  {
    question: 'Which of the following animals is a mammal?',
    options: [
      'Shark', 
      'Octopus', 
      'Turtle', 
      'Dolphin'],
    answer: 'Dolphin',
  },
  {
    question: 'What is the largest species of whale?',
    options: [
      'Blue whale', 
      'Humpback whale', 
      'Orca', 
      'Beluga whale'],
    answer: 'Blue whale',
  },
  {
    question: 'Which animal is known for its ability to change color?',
    options: [
      'Chameleon',
      'Zebra', 
      'Elephant', 
      'Giraffe'
      ],
    answer: 'Chameleon',
  },
  {
    question: 'Which animal has the longest lifespan?',
    options: [
      'Elephant',
      'Blue whale',
      'Tortoise',
      'Zebra',
    ],
    answer: 'Tortoise',
  },
  {
    question: 'Which bird is known for its ability to mimic human speech?',
    options: [
      'Parrot', 
      'Eagle', 
      'Sparrow', 
      'Penguin',
    ],
    answer: 'Parrot',
  },
  {
    question: 'Which animal is known to sleep the most?',
    options: [
      'Sloth',
      'Koala',
      'Lion',
      'Cat',
    ],
    answer: 'Sloth',
  },
  {
    question: 'Which animal can live both in water and on land?',
    options: [
      'Frog', 
      'Whale', 
      'Snake', 
      'Elephant'],
    answer: 'Frog',
  },
  {
    question: 'What is the fastest land animal?',
    options: [
      'Cheetah',
      'Leopard',
      'Lion',
      'Gazelle',
    ],
    answer: 'Cheetah',
  },
  {
    question: 'Which animal is known to be the largest land mammal?',
    options: [
      'Hippopotamus', 
      'Elephant', 
      'Rhinoceros', 
      'Giraffe'],
    answer: 'Elephant',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();