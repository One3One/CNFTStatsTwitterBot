//$131 

const express = require("express")
const app = express();

require('dotenv').config();

var twitter = require('twit')
var fs = require('fs')
var request = require('request');
const { Console } = require("console");

var Twitter = new twitter({
    consumer_key:         `${process.env.CONSUMERKEY}`,//consumer_key
    consumer_secret:     `${process.env.CONSUMERSECRET}`,//consumer_secret
    access_token:        `${process.env.ACCESSTOKEN}`,//access_token
    access_token_secret:  `${process.env.ACCESSTOKENSECRET}`,//access_token secret
})

  //Time
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  
  //CNFT
  function CNFT(){
    request("https://api.opencnft.io/1/policy/d50e69069b2b8b6daebe870a08a253791dcabb27a22e08e76115caaf" ,{json : true}, async(err,res,body)=>{

    console.log(body.asset_holders)
    console.log(body.total_volume)
    console.log(body.highest_sale.price)
    console.log(body.floor_price)
       
    //Total Volumes
    var totalvolume =  Number(body.total_volume.toString().slice(0,-7));
    console.log(totalvolume)
    var totalvolumewk = (totalvolume * 0.01) 
    console.log(totalvolumewk)
    var totalvolumek = totalvolumewk + "k"
    console.log(totalvolumek)

    //ATH Sales
    var totalATH =  Number(body.highest_sale.price.toString().slice(0,-7));
    console.log(totalATH)
    var totalATHwk = (totalATH * 0.01) 
    console.log(totalATHwk)
    var totalATHk = totalATHwk + "k"
    console.log(totalATHk)

    //Floor Price
    var totalFloor =  Number(body.floor_price.toString().slice(0,-6));
    console.log(totalFloor)
  

    Twitter.post('statuses/update', { status: "Stats for Raison D'etre 🩸\n\n" + "\nFloor Price: " + totalFloor + " $ADA" + "\nUnique Wallet: " + body.asset_holders + "\nSales Volume: " + totalvolumek + "\nATH Sales: " + totalATHk + "\n\n#CNFT #RaisonDetre"  }).then(result => {
    console.log("CNFT Tweeted");

    }).catch(console.error);

    })
  }

app.get("/NFT",(req,res)=>{
  CNFT();//calling the function
  res.send("I'm tweeting the current Top 10 CNFT")//Giving a response back.
})


app.listen(3000, function() {
  console.log('TWITTER BOT by Raison Detre ACTIVATED 🐦')

//Test
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
console.log(dateTime)

})
