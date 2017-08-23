//submit username & password

var submit=document.getElementById("submit_btn");
var login=document.getElementById("login");
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
             login.innerHTML=`Hi ${username}
             <br>
             <input type="submit" id="submit_btn" value="Logout" />
             `;
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
        reg.value="Registering";
    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
      if(request.readyState===XMLHttpRequest.DONE) 
      {
          if(request.status===500) {
             alert("something went wrong in server");
          }
          else {
             
             alert("REGISTERED SUCCESSFULLY");
             reg.value="Registered";
          }
         
      }
      
    };
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    request.open("POST","http://jobisjames10.imad.hasura-app.io/create-user",true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};



