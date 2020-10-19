"use strict";
{
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const btn = document.getElementById("btn");
  const result = document.getElementById("result");
  const scorelabel = document.querySelector("#result-score");
  const anime = document.getElementById("anime");
  const count = document.getElementById("count");
  var correct = new Audio("https://raw.githubusercontent.com/CHIHIROKATOca/quizofjapanese/master/audio/correct.mp3");
  var incorrect = new Audio("https://raw.githubusercontent.com/CHIHIROKATOca/samuraiquiz/master/audio/incorrect2.mp3");
  //---------quizSet----------//
  const quizSet =shuffle([
      {id:"01", q: `こんばんは!\n"Konbanwa"`, c : ["Good evening","Good morning","How are you"]},
      {id:"02",q: 'ありがとう\n"Arigatou"' , c : ["Thank you","Help me","Come on"]},
      {id:"03",q: 'おはようございます\n"Ohayo gozaimasu"', c : ["Good morning","Hurry up","What time is it?"]},
      {id:"04",q: 'おやすみなさい\n"Oyasumi nasai"' , c : ["Good night","Start","Happy"]},
      {id:"05",q: 'おなまえは？\n"Onamae wa?"' , c : ["What's your name?","How much?","How long?"]},
    ]);
      let currentNum = 0;
      let isAnswered;
      let score = 0;
  //---------shuffle----------//
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
      }
  //---------checkAnswer----------//
    function checkAnswer(li) {
        if (isAnswered) {
          return;
        }
        isAnswered = true;

        if (li.textContent === quizSet[currentNum].c[0]) {
          li.classList.add('correct');
          score++;
          correct.play();
        } else {
          li.classList.add('wrong');
          incorrect.play();
        }

        for(var j=0;j<correct.length;j++){
          if( correct[ j ]!=this ){ correct[ j ].pause() }
          }

        btn.classList.remove('disabled');
      }

  //---------create element----------//
    function setQuiz(){
        isAnswered = false;
        question.textContent = quizSet[currentNum].q;

        $("#playBtn").data("key", quizSet[currentNum].id);

        while(choices.firstChild){
          choices.removeChild(choices.firstChild);
        }
        //shuffle
        const shuffledChoices = shuffle([...quizSet[currentNum].c]);

        shuffledChoices.forEach(choice =>{
        const li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click",()=>{
            checkAnswer(li);
        });
        choices.appendChild(li);
    });

    if(currentNum === quizSet.length - 1){
      btn.textContent = "Show Score";
    }
    }
    setQuiz();
  //---------Score----------//
    function countNum(){
      count.textContent = `Quiz: 1 / ${quizSet.length}`;
    }
  //---------Voice sound----------//
    function playAudio(){
      const key = $(this).data("key");
      const audio = $(`audio[data-key="${key}"]`)[0];
      audio.currentTime = 0;
  　   audio.play();
    }
    countNum();
    $("#playBtn").click(playAudio);

    btn.addEventListener("click", ()=>{
      function countNum(){
      if(currentNum === quizSet.length - 1){
        count.textContent = `Quiz: ${currentNum + 1} / ${quizSet.length}`;
      }else{
        count.textContent = `Quiz: ${currentNum + 2} / ${quizSet.length}`;
      }
    }
      countNum();
    //---------Show Score----------//
      if(btn.classList.contains("disabled")){
        return;
      }
      btn.classList.add("disabled");
      if(currentNum === quizSet.length - 1){
        scorelabel.textContent = `Score: ${score} / ${quizSet.length}`;
        result.classList.remove("hidden");
      }else{
        currentNum++;
        setQuiz();
      }
    //---------If Perfect....----------//
      if(score === quizSet.length){
        const perfectText = document.getElementById("perfectText");
        perfectText.textContent = "Perfect!!";

        var tmp = document.getElementsByClassName("perfect-bg") ;
        var val="perfect";
        tmp[0].setAttribute("id",val);

        var perfectBg = document.getElementById("perfect-animation");
        perfectBg.style.display;
        perfectBg.style.display = "block";

        var perfectBgColor = document.querySelector(".perfect-body-bg");
        perfectBgColor.style.backgroundColor;
        perfectBgColor.style.backgroundColor = "#ffda48";

        var normalBg = document.getElementById("normal-animation");
        var normalBgT = document.getElementById("normal-animation-tablet");
        var normalBgM = document.getElementById("normal-animation-mobile");
        var normalBgMY = document.getElementById("normal-animation-mobile-yoko");
        normalBg.style.display;
        normalBgT.style.display;
        normalBgM.style.display;
        normalBgMY.style.display;
        normalBg.style.display = "none";
        normalBgT.style.display = "none";
        normalBgM.style.display = "none";
        normalBgMY.style.display = "none";
    }else{
      return;
    }
  })
  }
