
//changing the conntent of page
var button=document.getElementById("counter");
var  counter=0;
button.onclick = function(){
    //Create a request object
    var request=new XMLHttpRequest();
    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
      if(request.readyState===XMLHttpRequest.DONE) 
      {
          if(request.status===200)
          {
            var counter=request.responseText;
            var span=document.getElementById("count");
            span.innerHTML=counter.toString();
          }
      }
    };
    //Make a request
    request.open("GET","http://jobisjames10.imad.hasura-app.io/counter",true);
    request.send(null);
};
var nameInput=document.getElementById("name");
var name=nameInput.value;
var submit=document.getElementById("submit_btn");
submit.onclick= function(){

  var names=['names1','names2','names3','names4'];  
  var list='';
  for(var i=0;i<names.length;i++)
    list+='<li>'+names[i]+'</li>';
  var ul=document.getElementById("namelist");
  ul.innerHTML=list;
};
