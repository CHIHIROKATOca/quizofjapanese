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


   const quizSet =shuffle([
    {id:"01",q: 'おあいできて うれしいです\n"Oaidekite ureshii desu"', c : ["Nice to meet you","Look over here","Perfect"]},
    {id:"02",q: 'これ、いくらですか？\n"kore ikura desuka?"' , c : ["How much is it?","I'll teach you","I am a hero"]},
    {id:"03",q: 'どういたしまして\n"Dou itashi mashite"', c : ["You're welcome","I'll never give up","It is over"]},
    {id:"04",q: 'えいごは はなせますか？\n"Eigo wa hanase masuka?"' , c : ["Can you speak English?","Can you speak Spanish?","What's your name?"]},
    {id:"05",q: 'ちょうしは どうですか？\n"Choushi wa dou desuka?"' , c : ["How's it going?","How long?","How much?"]},
]);
let currentNum = 0;
let isAnswered;
let score = 0;
let count0 = 1;

  //questionに入れるテキストは、quizSetの[]番目のq


  function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[j], arr[i]] = [arr[i], arr[j]];
      }
      return arr;
    }

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

    function setQuiz(){
      isAnswered = false;
      question.textContent = quizSet[currentNum].q;

      $("#playBtn").data("key", quizSet[currentNum].id);


      while(choices.firstChild){
        choices.removeChild(choices.firstChild);
      }
      //選択肢がシャッフルされる
      const shuffledChoices = shuffle([...quizSet[currentNum].c]);
      //shuffledChoices.forEach(choice)とは、
      //1・constでリストをつくるように指定。
      //その中にquizセットのc(問題)をforEachで入れる
      //2・liのテキストはchoiceを入れるように指定して(いまこの設定をしているもの)
      //3・choicesの子にliを追加する
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

  function countNum(){
    count.textContent = `Quiz: 1 / ${quizSet.length}`;
  }
  function playAudio(){
    const key = $(this).data("key");
    const audio = $(`audio[data-key="${key}"]`)[0];
    audio.currentTime = 0;
　   audio.play();
    console.log($(`audio[data-key="${key}"]`))
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


    if(btn.classList.contains("disabled")){
      return;
    }
    btn.classList.add("disabled");

    if(currentNum === quizSet.length - 1){
      // console.log(`Score: ${score} / ${quizSet.length}`);
      scorelabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove("hidden");
    }else{
      currentNum++;
      setQuiz();
    }

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


      // goNext.innerText="Go Next Level";
      // goNext.href = "index_hard.html";
    }else{
      return;
    }

  })
  }
