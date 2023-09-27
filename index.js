const quizData = [
  {
    question: 'What is the capital of India',
    options: ['New Delhi', 'London', 'Newyork', 'Beijing'],
    answer: 'New Delhi',
  },
  {
    question: 'When was Netflix founded?',
    options: ['1997', '2001', '2009', '2015'],
    answer: '1997',
  },
  {
    question: 'Which country won the FIFA World Cup in 2018?',
    options: ['Brazil', 'Germany', 'France', 'Argentina'],
    answer: 'France',
  },
  {
    question: 'What is the name of the tallest mountain in the world?',
    options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
    answer: 'Mount Everest',
  },
  {
    question: 'What’s the national flower of Japan?',
    options: [
      'Lilly',
      'Sunflower',
      'Cherry blossom',
      'Rose',
    ],
    answer: 'Cherry blossom',
  },
  {
    question: 'What is the chemical symbol for iron?',
    options: ['Au', 'Fe', 'Cu', 'H'],
    answer: 'Fe',
  },
  {
    question: 'How many time zones are there in Russia?',
    options: [
      '11',
      '15',
      '1',
      '7',
    ],
    answer: '11',
  },
  {
    question: 'How many keys does a classic piano have?',
    options: ['66', '55', '44', '88'],
    answer: '88',
  },
  {
    question: 'Which football team is known as ‘The Red Devils’?',
    options: [
      'FC Bayen Munich',
      'Manchester City F.C.',
      'Manchester United F.C.',
      'Liverpool F.C.',
    ],
    answer: 'Manchester United F.C.',
  },
  {
    question: 'Which animal has genetics almost similar to that of the human?',
    options: ['Lion', 'Rat', 'Elephant', 'Giraffe'],
    answer: 'Rat',
  },
];


const quizContainer = document.getElementById('question');
const resultContainer = document.getElementById('manswer');
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
    if (answer === quizQuestions[cQuest].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizQuestions[cQuest].question,
        incorrectAnswer: answer,
        correctAnswer: quizQuestions[cQuest].answer,
      });
    }
    cQuest++;
    selectedOption.checked = false;
    if (cQuest < quizQuestions.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);


displayQuestion();

