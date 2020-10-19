var audio2 = new Audio();
audio2.src = 'https://raw.githubusercontent.com/CHIHIROKATOca/samuraiquiz/master/audio/Musicloop3low.mp3';

window.onload = function(){
  audio2.play();
  audio2.loop = true;
}
function play() {
  audio2.play();
  audio2.loop = true;
}
function pause() {
  audio2.pause();
}