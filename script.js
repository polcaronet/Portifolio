  
  AOS.init();

// Script slides

let count = 1;
document.getElementById("radio1").checked = true;

setInterval( function(){
  nextImage();
}, 7000)

function nextImage(){
  count++;
  if(count > 9){
     count = 1;
  }

  document.getElementById("radio"+count).checked = true;
}

// Script typing


var typingTime = document.getElementById('typing');
typing.innerHTML = '';
var count1 = 0;
var str ='🎓 student e sou desenvolvedor Full Stack!';
var typingTime = setInterval(function() {
  count1 = count1 + 1;
  typing.innerHTML = " " + str.slice(0, count1);
  if (count1 === str.length) {
    clearInterval(typing);
    typing.innerHTML = " " + str
    count1 = 0;
    setInterval(function() {

      if (count1 === 0) {
        typing.innerHTML = " " + str + "|"
        count1 = 1;
      } else {
        typing.innerHTML = " " + str
        count1 = 0;
      };
    }, 10000000);
  };
}, 135)

// MenuShow

function menuShow() {
  let menuMobile = document.querySelector('.mobile-menu');
  if (menuMobile.classList.contains('open')) {
      menuMobile.classList.remove('open');
      document.querySelector('.icon').src = "assets/menu_white_36dp.svg";
  } else {
      menuMobile.classList.add('open');
      document.querySelector('.icon').src = "assets/close_white_36dp.svg";
  }
}


   
