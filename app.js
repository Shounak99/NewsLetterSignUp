const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
//const request=require('request');
const { response } = require("express");

const app=express();
const port =3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post('/post',(req,res)=>{
    var firstName=String(req.body.firstName);
    var lastName=String(req.body.lastName);
    var email=String(req.body.email);
    console.log(`First Name: ${firstName},
    Last Name : ${lastName},
    Email : ${email}`);

    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }

        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us11.api.mailchimp.com/3.0/lists/e1d062e1f5";
    const options={
        method:'POST',
        auth:'Shounak1:c096ddd11a0b88ec771d3c8c5f4fc3ba-us11'

    }
     const request=https.request(url,options,(response)=>{
    if(response.statusCode>=200 && response.statusCode<=299){
        response.on('data',(data)=>{
            console.log(JSON.parse(data));
        })
        res.sendFile(__dirname+'/success.html');
    }
    else{
        res.sendFile(__dirname+'/failure.html');
    }
    })
    request.write(jsonData);
    request.end();
    

})

app.post('/failure',(req,res)=>{
    res.redirect('/');
})

app.post('/success',(req,res)=>{
    res.redirect('/');
})
app.listen(process.env.PORT || port,()=>{console.log("Listening to "+port)});

// e1d062e1f5 c096ddd11a0b88ec771d3c8c5f4fc3ba-us11