var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

var config={
  user:'jobisjames10',
  database:'jobisjames10',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:"SomeRandomValues",
    cookie:{maxAge:1000*60*60*24*30}
}));

function createTemplate(data){
    var title=data.title;
    var content=data.content;
    var heading=data.heading;
    var date=data.date;
    var htmlTemplate=`
    <html>
        <head>
            <title>${title}</title>
            <meta name="viewport" content="width-device-width,initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div>
                <a href="/">HOME</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date.toDateString()}
            </div>
            <div>
                ${content}
            </div>
            <hr/>
            <div id="comment">
                 <input  type="text" id="com" placeholder="com"></input>
                <input type="submit" value="COMMENT" id="COMMENT"></input>
            </div>
            <ul id="inbox">
            
            </ul>
        </body>
        <script>
            var comment=document.getElementById("COMMENT");

            comment.onclick= function(){
                console.log("clicked");
                 var request=new XMLHttpRequest();
            
                //Capture the response and store it in a variable
                request.onreadystatechange=function(){
                  if(request.readyState===XMLHttpRequest.DONE) 
                  {
                      if(request.status===200)
                      {
                         
                          var names=request.responseText;
                          names=JSON.parse(names);
                          var list='';
                          for(var i=0;i<names.length;i++)
                            list+='<li>'+names[i]+'</li>';
                          var ul=document.getElementById("inbox");
                          ul.innerHTML=list;
                      }
                  }
                  
                };
                var nameInput=document.getElementById("com");
                 var name=nameInput.value;
                request.open("GET","http://jobisjames10.imad.hasura-app.io/submit?comment="+name,true);
                request.send(null);
           };
        </script>
        
    </html>
    `;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    //How do we create a hash
    var hashed=crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join("$");

}

app.get('/hash/:input', function (req, res) {
    var hashedString=hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user', function (req, res) {
    //username password
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString("hex");
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString], function(err,result){
       if(err){
      res.status(500).send(err.toString());
      }
      else{
          res.send("USER SUCCESSFULLY CREATED" +username);
      }
    });
 
});

app.post('/login', function (req, res) {
    //username password
    var username=req.body.username;
    var password=req.body.password;
    pool.query('SELECT * FROM "user" WHERE username=$1',[username], function(err,result){
       if(err){
      res.status(500).send(err.toString());
      }
      else{
            if(result.rows.length === 0){
                 res.status(403).send("username/password is incorrect");
            }
            else{
                var dbString=result.rows[0].password;
                var salt=dbString.split('$')[2];
                var hashedString=hash(password,salt);
               
                if(dbString===hashedString){
                    
                    //Set the session
                    req.session.auth = {userId:result.rows[0].id};
                    //set cookie with a sesson id
                    //Internally on the server side, it maps the sessionn id to an object
                    //{auth : {userid}}
                    res.send("Credentials correct");
                 
                }
                else
                   res.status(403).send("username/password is incorrect"); 
            }
            
      }
    });
 
});

app.get('/check-login',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId) {
       res.send("You r logged in"+ req.session.auth.userId.toString());
   }
   else{
       res.send("Yor are not logged in");
   }
   
});

app.get('/logout',function(req,res){
   delete req.session.auth;
   res.send("Logged Out");
});

var pool=new Pool(config);
app.get('/test-db', function (req, res) {
  //Make a select request
  //return a response with the result
  pool.query('SELECT * FROM test',function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }
      else{
          res.send(JSON.stringify(result.rows));
      }
  });
});

var counter=0;
app.get('/counter', function (req, res) {
    counter++;
  res.send(counter.toString());
});

var names=[] ;
var comments = [];
app.get('/submit', function (req, res) {
    if(req.query.name){
    var name=req.query.name;
    names.push(name);
  res.send(JSON.stringify(names));
    }
    else{
   var cmt = req.query.comment;
    comments.push(cmt);
     res.send(JSON.stringify(comments));
    }
});


comments = [];

app.get('/article/:articleName', function (req, res) {
    var articleName=req.params.articleName;
    pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName] ,function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length===0){
                res.status(404).send("Article Not Found");
            }
            else{
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
  
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
