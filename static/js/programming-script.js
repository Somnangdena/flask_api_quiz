const quizData = [
  {
    question: 'What is a correct syntax to output "Hello World" in Python?',
    options: [
      'echo("Hello World");', 
      'print("Hello World")', 
      'p("Hello World")', 
      'echo "Hello World"'],
    answer: 'print("Hello World")',
  },
  {
    question: 'Which of the following is a correct way to define a function in Python?',
    options: [
      'function myFunc():', 
      'def myFunc():', 
      'func myFunc():', 
      'define myFunc():'],
    answer: 'def myFunc():',
  },
  {
    question: 'What is the correct way to create a list in Python?',
    options: [
      'list = (1, 2, 3)', 
      'list = {1, 2, 3}', 
      'list = [1, 2, 3]', 
      'list = <1, 2, 3>'],
    answer: 'list = [1, 2, 3]',
  },
  {
    question: 'What does the len() function do in Python?',
    options: [
      'Returns the data type of an object',
       'Returns the first item of the object', 
       'Checks whether the object is empty', 
       'Returns the length (number of items) of an object'],
    answer: 'Returns the length (number of items) of an object',
  },
  {
    question: 'Which of the following data types is immutable in Python?',
    options: [
      'List',
      'Set',
      'Dictionary',
      'Tuple',
    ],
    answer: 'Tuple',
  },
  {
    question: ' What is the correct syntax for importing the math module in Python?',
    options: [
      'import math', 
      'import Math', 
      'import math()', 
      'include math'],
    answer: 'import math',
  },
  {
    question: 'What is the correct extension of the Python file?',
    options: [
      '.python',
      '.pl',
      '.py',
      '.p',
    ],
    answer: '.py',
  },
  {
    question: 'Which of the following is used to create a comment in Python?',
    options: [
      '// This is a comment', 
      '# This is a comment', 
      '/* This is a comment */', 
      '<!-- This is a comment -->'],
    answer: '# This is a comment',
  },
  {
    question: 'How do you add an element to a set in Python?',
    options: [
      'set.add(element)',
      'set.append(element)',
      'set.insert(element)',
      'set.push(element)',
    ],
    answer: 'set.add(element)',
  },
  {
    question: 'How can you access a specific element in a list in Python?',
    options: [
      'Use the index() method', 
      'Use square brackets', 
      'Use the find() method', 
      'Use the get() method'],
    answer: 'Use square brackets',
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