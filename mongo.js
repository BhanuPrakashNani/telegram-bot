var mongojs = require('mongojs')
var db = mongojs('mongodb://bhanuprakashnani:rajeswari12345@cluster0-shard-00-00-eivd1.mongodb.net:27017/project1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', ['codinza'])

var car = {
    name: "lamborghini",
    model: "gallardo",
    persons: ["pass1", "pass2", "pass3"]
}

var telegram = require('telegram-bot-api');
var fs = require("fs");


var api = new telegram({
    token: '898459116:AAE6ef0DLEDxqQSpANYkyiF7Tbe5TudlY4M',
    updates: {
        enabled: true
    }
});


api.on('message', function(a) {

    var bhanu = {

        text: a.text,
        from: a.chat.from
    }

    db.codinza.find(bhanu, function(err, data){

        if (data.length == 0){
            db.codinza.insert(bhanu, function(err, data) {
                if(err){
                    console.log(err)
                }
                else{

                    api.sendMessage({
                        chat_id: a.chat.id,
                        text: 'yes'
                    })
                    console.log("Inserted Successfully")
                }
            })

        }

        else {
            api.sendMessage({
                chat_id: a.chat.id,
                text: "This is already recorded"
            })
        }
    })

})
