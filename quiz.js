let questionIndex = 0;
let correctChoiceCounter = 0;
let currentAnswer = undefined;

let Questions = [{
   text: "Derya'nın aklından tuttuğu sayının asal çarpanlarının en küçüğü 2, en büyüğü 5'tir.Buna göre, Derya'nın aklından tuttuğu sayı aşağıdakilerden hangisi olamaz?",
   answers: [
      {
         text: "100",
         isCorrect: false,
      },
      {
         text: "125",
         isCorrect: false,
      },
      {
         text: "150",
         isCorrect: false,
      },
      {
         text: "175",
         isCorrect: true,
      }
   ]
}, {
   text: "Soru 2",
   answers: [
      {
         text: "Soru 2 Cevap 1",
         isCorrect: false,
      },
      {
         text: "Soru 2 Cevap 2",
         isCorrect: false,
      },
      {
         text: "Soru 2 Cevap 3",
         isCorrect: false,
      },
      {
         text: "Soru 2 Cevap 4",
         isCorrect: true,
      }
   ]
}, {
   text: "Soru 3",
   answers: [
      {
         text: "Soru 3 Cevap 1",
         isCorrect: false,
      },
      {
         text: "Soru 3 Cevap 2",
         isCorrect: false,
      },
      {
         text: "Soru 3 Cevap 3",
         isCorrect: false,
      },
      {
         text: "Soru 3 Cevap 4",
         isCorrect: true,
      }
   ]
}, {
   text: "Soru 4",
   answers: [
      {
         text: "Soru 4 Cevap 1",
         isCorrect: false,
      },
      {
         text: "Soru 4 Cevap 2",
         isCorrect: false,
      },
      {
         text: "Soru 4 Cevap 3",
         isCorrect: false,
      },
      {
         text: "Soru 4 Cevap 4",
         isCorrect: true,
      }
   ]
}, {
   text: "Soru 5",
   answers: [
      {
         text: "Soru 5 Cevap 1",
         isCorrect: false,
      },
      {
         text: "Soru 5 Cevap 2",
         isCorrect: false,
      },
      {
         text: "Soru 5 Cevap 3",
         isCorrect: false,
      },
      {
         text: "Soru 5 Cevap 4",
         isCorrect: true,
      }
   ]
}];

let questionBody = document.querySelector("#quizPageBody");

const questionRender = () => {
   let answersHtml = "";

   Questions[questionIndex].answers.forEach(item => {
      answersHtml +=
         `<div class="quiz__answers-answer" 
        data-iscorrect="${item.isCorrect}" 
        onclick="checkAnswer(this)">
         ${item.text}
      </div>`
   });

   let questionHtml = `<div class="quiz__question">
   <h3>Question 1</h3>
   <p>
     ${Questions[questionIndex].text}
   </p>
   </div>
   <div class="quiz__answers">
    ${answersHtml}
   </div > `;

   questionBody.innerHTML = "";
   questionBody.innerHTML = questionHtml;
}


const checkAnswer = (e) => {
   if (questionIndex != Questions.length) {
      let questionAnswers = Array.from(document.getElementsByClassName("quiz__answers-answer"));
      for (let i = 0; i < questionAnswers.length; i++) {
         if (questionAnswers[i].classList.contains("selected")) {
            questionAnswers[i].classList.remove("selected");
            break;
         }
      }

      e.classList.add("selected");
      currentAnswer = e;
   }
};


const nextQuestion = () => {

   if (currentAnswer != undefined) {
      if (currentAnswer.dataset.iscorrect == "true") {
         currentAnswer.classList.add("correct");
         correctChoiceCounter++;
      } else {
         currentAnswer.classList.add("wrong");
         let questionAnswers = Array.from(document.getElementsByClassName("quiz__answers-answer"));
         for (let i = 0; i < questionAnswers.length; i++) {
            if (questionAnswers[i].dataset.iscorrect == "true") {
               questionAnswers[i].classList.add("correct");
               break;
            }
         }
      }

      if (Questions.length - 1 == questionIndex) {
         questionIndex += 1;
         setTimeout(() => {
            window.alert(`Toplam ${correctChoiceCounter} doğru yaptınız başarı oranınız : %${(correctChoiceCounter / Questions.length) * 100}`);
         }, 1000);

      } else {
         setTimeout(() => {
            questionIndex += 1;
            questionRender();
            currentAnswer = undefined;
         }, 500);
      }


   }
}

const prevQuestion = () => {
   if (questionIndex != 0) {
      questionIndex -= 1;
      questionRender();
   }
}

questionRender();