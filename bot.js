var telegram = require('telegram-bot-api');
var fs = require("fs");


var api = new telegram({
    token: '898459116:AAE6ef0DLEDxqQSpANYkyiF7Tbe5TudlY4M',
    updates: {
        enabled: true
    }
});


api.on('message', function(a){

    if(a.text == "Hi" || a.text == "hi" || a.text == "hey" )
    {
        api.sendMessage({
            chat_id: a.chat.id,
            text: 'Hello'
        });

    }

    if(!isNaN(parseFloat(a.text))) {
        if (eval((a.text) % 2 == 0)) {
            api.sendMessage({
                chat_id: a.chat.id,
                text: 'Even'
            })

        } else {
            api.sendMessage({
                chat_id: a.chat.id,
                text: 'Odd'
            })
        }
        console.log(a);
    }
    var des = "{" + a.chat.id + " , " + a.chat.username + "," + a.text+ " }\n"

    fs.readFile("temp.txt", function(err, b)
    {
        if(b.includes(a.text)){
            api.sendMessage({
                chat_id: a.chat.id,
                text: "This message has already been recorded"
            })
        }
        else {
            fs.appendFile('temp.txt', des ,function(error){
                if(error){
                    console.log(error)
                }
                console.log("Append Successful");
            })
        }
    })


    var request = require('request');
    request('https://api.exchangeratesapi.io/latest?base=USD', function (error, response, body) {
        //console.log('error:', error);
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log(JSON.parse(body).rates.INR);
        console.log(response);

    });

    if(a.text.includes("USD")) {
        var arr = a.text.split(" ")
        var req = arr[2]
        var request = require("request")
        request('https://api.exchangeratesapi.io/latest?base=USD', function (error, response, body) {
            var cur = JSON.parse(body).rates[req];
            api.sendMessage({
                chat_id: a.chat.id,
                text: eval(cur * arr[1])
            })
            console.log(cur)

        })

    }

});

