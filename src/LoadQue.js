async function loadQuestions() {
    try {
      // Retrieve stored quiz data
      const quizData = JSON.parse(localStorage.getItem("quizData"));
      if (!quizData) {
        console.error("Quiz data not found. Redirecting to the form.");
        window.location.href = "index.html";
        return;
      }
  
      const { level, category } = quizData;
  
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${level}`
      );
      const data = await res.json();
  
      if (!data.results || data.results.length === 0) {
        console.error("No questions found for the selected category and difficulty.");
        return;
      }
  
      const questions = data.results.map((r, idx) => ({
        QueId: idx,
        question: decodeURIComponent(r.question),
        options: [...r.incorrect_answers, r.correct_answer].sort(() => Math.random() - 0.5),
        correct_ans: r.correct_answer,
      }));
  
      const questionsSection = document.getElementById("questions");
      questions.forEach((que) => {
        const questionSection = document.createElement("div");
        questionSection.className = "questionSection";
  
        const ques = document.createElement("h2");
        ques.innerText = que.question;
  
        const optionsSct = document.createElement("div");
        optionsSct.className = "OptionsSect";
  
        que.options.forEach((opt) => {
          const choice = document.createElement("input");
          choice.type = "radio";
          choice.className = "option";
          choice.name = `question-${que.QueId}`;
          choice.value = decodeURIComponent(opt);
  
          const label = document.createElement("label");
          label.innerText = opt;
  
          optionsSct.appendChild(choice);
          optionsSct.appendChild(label);
        });
  
        questionSection.appendChild(ques);
        questionSection.appendChild(optionsSct);
        questionsSection.appendChild(questionSection);
      });
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  }
  
  loadQuestions();
  function checkAnswer(Questions) {
    let score = 0;
  
    Questions.forEach((question) => {
      // Get all the radio buttons for the current question
      const selectedOption = document.querySelector(
        `input[name="question-${question.QueId}"]:checked`
      );
  
      // Check if an option was selected
      if (selectedOption) {
        const userAnswer = selectedOption.value;
  
        // Compare with the correct answer
        if (userAnswer === question.correct_ans) {
          score++; // Increment score if correct
        }
      }
    });
  
    // Display the score
    alert(`You scored ${score} out of ${Questions.length}!`);
  }
  
  function submitQuiz() {
    if (Questions && Questions.length > 0) {
      checkAnswer(Questions); // Pass the Questions array to the function
    } else {
      alert("No questions loaded.");
    }
  }  