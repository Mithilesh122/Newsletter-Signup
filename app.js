const bodyParser=require("body-parser");
const express=require("express");
const request=require("request");
const https=require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
    console.log("post");
    var firstName=req.body.firstName;
    var middleName=req.body.middleName;
    var lasName=req.body.lastName;
    const data={
      "members":[
        {
            email_address:lasName,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:middleName
            }
        }
      ]  
    };
    const jsondata=JSON.stringify(data);
    var url="https://us21.api.mailchimp.com/3.0/lists/fb2131b5871";
    console.log(jsondata);
    
    const options={
        method:"POST",
        auth:"Mithilesh:390bfc42c9de3f12ad13fd47728b4a25-us21"
    }

   
    const request=https.request(url,options,function(response){
        

        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
     
    request.write(jsondata);
    request.end;


});

app.listen(3000,function(){
    console.log("server started");
});

// Api key:390bfc42c9de3f12ad13fd47728b4a25-us21
// fb2131b5871