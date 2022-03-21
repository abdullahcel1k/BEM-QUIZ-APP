let questionIndex = 0;
let correctChoiceCounter = 0;
let currentAnswer = undefined;

// Soru listesi
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

// quizPageBody HTML elementinin içerisine her soru değiştiğinde 
// yerleştirebilmek sorularımızın kapsayıcısı olan elementimizi aldık
let questionBody = document.querySelector("#quizPageBody");

// bu metot ile soru değişikliğinde aktif olan soruyu
// yani questionIndex index'ine sahip olan soruyu yeni soru olarak
// işleyip  questionBody elementinin içerisine eliyoruz
const questionRender = () => {
   let answersHtml = "";

   Questions[questionIndex].answers.forEach(item => {
      answersHtml +=
         `<div class="quiz__answers-answer" 
        data-iscorrect="${item.isCorrect}" 
        onclick="selectedChoice(this)">
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

   questionBody.innerHTML = questionHtml;
}

// önceki bir seçim varsa bu kaldırılır 
// daha sonra seçilen cevap belirlenir
const selectedChoice = (e) => {
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

// bir sonraki soruya geçmek için kullanılır
const nextQuestion = () => {

   // eğer bir soru seçimi yapıldıysa
   // bir aksyion veriyoruz aksi durumda hiçbirşey yapmadık
   if (currentAnswer != undefined) {
      // doğru soru seçildiyse seçilen elemen'a 'correct' class'ını ekleyip
      // doğru olarak gösterdi
      if (currentAnswer.dataset.iscorrect == "true") {
         currentAnswer.classList.add("correct");
         correctChoiceCounter++;
      } else {
         /**
          * seçilen soru yanlış ise seçilen eleman'a 'wrong' classını ekledik
          * bu ekleme cevabının yanlış olduğunu gösteren kırmızı rengi ekledi
          * ve daha sonra cevaplarımız içinde doğru olanı bulup ona 'correct'
          * classını ekleyerek doğru olan cevabı gösterdik
          */
         currentAnswer.classList.add("wrong");
         let questionAnswers = Array.from(document.getElementsByClassName("quiz__answers-answer"));
         for (let i = 0; i < questionAnswers.length; i++) {
            if (questionAnswers[i].dataset.iscorrect == "true") {
               questionAnswers[i].classList.add("correct");
               break;
            }
         }
      }

      /**
       * eğer aktif soru son soru ise 
       * kullanıcıya doğru bilgisini ve başarı oranını gösteriyoruz
       */
      if (Questions.length - 1 == questionIndex) {
         setTimeout(() => {
            window.alert(`Toplam ${correctChoiceCounter} doğru yaptınız başarı oranınız : %${(correctChoiceCounter / Questions.length) * 100}`);
         }, 1000);

      } else {
         // eğer son soru değil se 500ms sonra sonraki soruya geçiriyoruz
         setTimeout(() => {
            questionRender();
         }, 500);
      }


      questionIndex += 1;
      currentAnswer = undefined;
   }
}

const prevQuestion = () => {
   if (questionIndex != 0) {
      questionIndex -= 1;
      questionRender();
   }
}

// sayfa ilk açıldığında ilk soruyu getirmesi için 
// "questionRender" metodumuzu bi kere çalıştırıyoruz
questionRender();