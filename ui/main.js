console.log('Loaded!');

//changing the conntent of page
var element=document.getElementById("main-text");
element.innerHTML="New Value";

//TO move the image on click
var img=document.getElementById("madi");
var marginLeft=0;
var moveRight=function(){
  marginLeft+=1;
  img.style.marginLeft=marginLeft + "px";
};
img.onclick=function(){
    var interval=setInterval(moveRight,50);
};