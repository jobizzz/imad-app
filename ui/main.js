//submit username & password

var submit=document.getElementById("submit_btn");
submit.onclick= function(){

     var request=new XMLHttpRequest();

    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
      if(request.readyState===XMLHttpRequest.DONE) 
      {
          if(request.status===200)
          {
             console.log("User logged in ");
             alert("LOGGED IN SUCCESSFULLY");
          }
          else if(request.status===403)
          {
             alert("Invalid username/password");
          }
          else if(request.status===500)
         {
             alert("something went wrong in server");
          }
      }
      
    };
    var username=document.getElementById("username").value;
     var password=document.getElementById("password").value;
    request.open("POST","http://jobisjames10.imad.hasura-app.io/login",true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};

//Register

var reg=document.getElementById("submit_reg");
reg.onclick= function(){

     var request=new XMLHttpRequest();

    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
      if(request.readyState===XMLHttpRequest.DONE) 
      {
          if(request.status===500) {
             alert("something went wrong in server");
          }
          else {
             
             alert("REGISTERED SUCCESSFULLY");
             reg.innerHTML="<value=Registered>";
          }
         
      }
      
    };
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    request.open("POST","http://jobisjames10.imad.hasura-app.io/create-user",true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};



