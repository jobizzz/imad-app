//submit username & password
var logout;
var submit=document.getElementById("submit_btn");
console.log(submit);
var login=document.getElementById("login");
console.log(login);
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
             <input type="submit" id="submit_out" value="Logout" />
             `;
             logout=document.getElementById("submit_out");
              console.log(logout);
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
      
      
      console.log("test");
    };
    var username=document.getElementById("username").value;
     var password=document.getElementById("password").value;
    request.open("POST","http://jobisjames10.imad.hasura-app.io/login",true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};

//Register

var reg=document.getElementById("submit_reg");
console.log(reg);
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

//Louout

//var logout=document.getElementById("submit_out");
console.log(logout);
if (logout !== null){
logout.onclick= function(){

     var request=new XMLHttpRequest();
       
    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
      if(request.readyState===XMLHttpRequest.DONE) 
      {
          if(request.status===500) {
             alert("something went wrong in server");
          }
          else {
             
             alert("Logout");
             login.innerHTML=`<h3>Login to unlock awesome features</h3>
                <div >
                    <input type="text" id="username" placeholder="username"/>
                    <input type="password" id="password" />
                    <br><br>
                    <input type="submit" id="submit_btn" value="Login" />
                    <input type="submit" id="submit_reg" value="Register"/>
                </div> `;
          }
         
      }
      
    };
};
  //  var username=document.getElementById("username").value;
   // var password=document.getElementById("password").value;
    request.open("GET","http://jobisjames10.imad.hasura-app.io/logout",true);
    request.send(null);
   // request.setRequestHeader('Content-Type','application/json');
  //  request.send(JSON.stringify({username:username,password:password}));
}



