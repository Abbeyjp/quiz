/* Adding the quiz data */
const quizQuestions = [
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
    question: 'What is the tallest mountain in the world?',
    options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
    answer: 'Mount Everest',
  },
  {
    question: 'What’s the national flower of Japan?',
    options: [
      'Lilly',
      'Sunflower',
      'Cherry blossom',
      'Rose'
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
      '7'
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
      'Liverpool F.C.'
    ],
    answer: 'Manchester United F.C.',
  },
  {
    question: 'Which species has genetics almost similar to that of the human?',
    options: ['Lion', 'Rat', 'Elephant', 'Snake'],
    answer: 'Rat',
  },
];

const qContainer = document.getElementById('question');
const rContainer = document.getElementById('opt');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let cQuest = 0;
let score = 0;
let wAns = [];
/** Function to shuffle the options of each question eachtime */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
/** Function to display the data*/
function displayQuestion() {
  const qData = quizQuestions[cQuest];

  const qElement = document.createElement('div');
  qElement.className = 'question';
  qElement.innerHTML = qData.question;

  const oElement = document.createElement('div');
  oElement.className = 'opt';

  const shuffledOptions = [...qData.options];
  shuffleArray(shuffledOptions);
  /** Creating the styling within the js */
  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'question';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    oElement.appendChild(option);
  }

  qContainer.innerHTML = '';
  qContainer.appendChild(qElement);
  qContainer.appendChild(oElement);
}
/** Function to check the answer and add the score*/
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="question"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizQuestions[cQuest].answer) {
      score++;
    } else {
      wAns.push({
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
/** Function to display the final result*/
function displayResult() {
  qContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  rContainer.innerHTML = `You scored ${score} out of ${quizQuestions.length}!`;
}
/** Function to skip the process and retry*/
function retryQuiz() {
  cQuest = 0;
  score = 0;
  wAns = [];
  qContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  rContainer.innerHTML = '';
  displayQuestion();
}
/** Function to display all the answers of the questions that were wrong*/
function showAnswer() {
  qContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let wAnsHtml = '';
  for (let i = 0; i < wAns.length; i++) {
    wAnsHtml += `
      <p>
        <strong>Question:</strong> ${wAns[i].question}<br>
        <strong>Your Answer:</strong> ${wAns[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${wAns[i].correctAnswer}
      </p>
    `;
  }
  /** Display the present score that was achieved */
  rContainer.innerHTML = `
    <p>You have scored ${score} out of ${quizQuestions.length}!</p>
    <p>Incorrect Answers:</p>
    ${wAnsHtml}
  `;
}



submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();