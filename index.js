
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyparser.urlencoded({extended:true}));



app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});


app.post("/",(req,res)=>{
   
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalURL = baseURL + crypto + fiat;
   
    request(finalURL,function(error,response,body){
        //We recieve JSON 
        var data = JSON.parse(body);
        var price = data.last;
        var currentDate = data.display_timestamp;
        // var avgprice = data.averages.week;
        res.write(currentDate);

        res.write("<h1>The Current price of " + crypto +" is " + price +  fiat +" </h1>");
        res.send();
    });
});

app.listen(3000,()=>{
    console.log("Server is running on Port 3000");
})