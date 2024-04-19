const questions = [
    {
      question: "From which country did Finland gain its independence in 1917?",
      choices: ["Sweden", "Denmark", " Norway", "Russia" ],
      correctAnswer: 3,
    },
    {
      question: "What is the highest point of Finland?",
      choices: ["Tampere", "Turku", "Halti", "espoo"],
      correctAnswer: 2,
    },
    {
      question: " What is the Swedish name for Helsinki?",
      choices: ["Helsingfors", "Bole", "helsinki", "Sweden"],
      correctAnswer: 0,
    },
    {
      question: "It is a holiday in Finland, which is celebrated on May the 1st.",
      choices: ["Juhannus", "Joulu", "Vappu", "Helluntai"],
      correctAnswer: 2,
    },
    {
      question: "Finland has two official languages. One is Finnish, what is the other??",
      choices: ["English", "Swedish", "Suomi", "Spanish"],
      correctAnswer: 1,
    },
    {
      question: "What is the biggest city in Finland?",
      choices: ["Helsinki", "Turku", "Tampere", "Espoo"],
      correctAnswer: 0,
    },
    {
      question: "Who was elected President of Finland in 2000?",
      choices: ["Tarja Halonen", "Tellervo Koivisto", "Eeva Ahtisaari", "Pentti Arajarvi"],
      correctAnswer: 0,
    },
    {
      question: "What is the oldest city in Finland?",
      choices: ["Helsinki", "Rauma", "Porvoo", "Turku"],
      correctAnswer: 3,
    },
    {
      question: "Finland is famous for:",
      choices: ["watches", "high mountains", "clean environment", "windmills"],
      correctAnswer: 2,
    },
    {
      question: "Finland gained its independence in what year?",
      choices: ["1992", "1899", "1917", "1998"],
      correctAnswer: 2,
    },
    
  ];
  
  let currentQuestion = 0,
    correctAnswers = 0,
    quizOver = false;
  
  $(document).ready(function () {
    // Display the first question
    displayCurrentQuestion();
    $(this).find("#quizMessage").hide();
  
    // On clicking next, display the next question
    $(this)
      .find("#nextButton")
      .on("click", function () {
        if (!quizOver) {
          const value = $("input[type='radio']:checked").val();
  
          if (value === undefined) {
            $(document).find("#quizMessage").text("Please select an answer");
            $(document).find("#quizMessage").show();
          } else {
            $(document).find("#quizMessage").hide();
  
            if (value == questions[currentQuestion].correctAnswer) correctAnswers++;
  
            currentQuestion++; // Since we have already displayed the first question on DOM ready
            if (currentQuestion < questions.length) displayCurrentQuestion();
            else {
              displayScore();
              // Change the text in the next button to ask if user wants to play again
              $(document).find("#nextButton").text("Play Again?");
              quizOver = true;
            }
          }
        } else {
          // quiz is over and clicked the next button (which now displays "Play Again?")
          quizOver = false;
          $(document).find("#nextButton").text("Next Question");
          resetQuiz();
          displayCurrentQuestion();
          hideScore();
        }
      });
  });
  
  // This displays the current question AND the choices
  function displayCurrentQuestion() {
    console.log("In display current Question");
  
    const question = questions[currentQuestion].question;
    const questionClass = $(document).find("#quizContainer > #question");
    const choiceList = $(document).find("#quizContainer > #choiceList");
    const numChoices = questions[currentQuestion].choices.length;
  
    // Set the questionClass text to the current question
    $(questionClass).text(question);
  
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
  
    let choice;
    for (let i = 0; i < numChoices; i++) {
      choice = questions[currentQuestion].choices[i];
      $(
        `<li><input id="radio${i}" type="radio" value="${i}" name="choices" /><label for="radio${i}"> ${choice}</label></li>`
      ).appendTo(choiceList);
    }
  }
  
  function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
  }
  
  function displayScore() {
    const result = $(document).find("#quizContainer > #result");
    result.text(`You scored: ${correctAnswers} out of ${questions.length}`);
    result.css("color", correctAnswers > questions.length / 2 ? "green" : "red");
    result.show();
  }
  
  function hideScore() {
    $(document).find("#result").hide();
  }