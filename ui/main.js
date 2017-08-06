console.log('Loaded!');

//changing the conntent of page
var element=document.getElementById("main-text");
element.innerHTML="New Value";

//TO move the image on click
var img=document.getElementById("madi");
img.onclick=function(){
    img.style.marginLeft="100px";
};