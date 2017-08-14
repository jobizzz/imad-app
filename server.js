var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
  user:'jobisjames10',
  database:'jobisjames10',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles={
   'article-one':{
    title:"Article One|Jobis",
    heading:"Article One",
    date:"Aug 5,2017",
    content:`
            <p>
                this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.
            </p>

            <p>
                this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.
            </p>
            <p>
                this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.this is the content of article 1.
            </p>   
    `
    },
    'article-two':{
    title:"Article Two|Jobis",
    heading:"Article Two",
    date:"Aug 7,2017",
    content:`
            <p>
                this is the content of article 2
            </p>   
    `
    },
    'article-three':{
    title:"Article Three|Jobis",
    heading:"Article Three",
    date:"Aug 10,2017",
    content:`
            <p>
                this is the content of article 3
            
            </p>   
    `
    }
};

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
                ${date}
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
app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
    
   
  res.send(createTemplate(articles[articleName]));
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
