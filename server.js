// imports
const server = require('http').createServer();
server.listen(4000);

const client = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  }).sockets;

const mongo = require('mongodb').MongoClient;

// Connect to mongo
const url = 'mongodb://localhost:27017';


mongo.connect(url, function(err, mongoclient){
    if(err){
        throw err;
    }

    console.log('Connected to MongoDB database...');

    //Connect to socket.io
    client.on('connection',function(socket){

        var db = mongoclient.db('chatdb')
        let chat = db.collection('messages');
        
        //Create function to send status
        sendStatus = function(s) {
            socket.emit('status',s);
        }

        // Get chat from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            // Emit the messages
            socket.emit('output',res);
        });

        //Handle input events
        socket.on('input', function(data){
            let name = data.name;
            let message = data.message;


            //  Check for name and message
            if(name=='' || message==''){
                // Send error status
                sendStatus('Please enter a name and message.');
            } else {
                // Insert message in database
                chat.insertOne({name: name, message: message}, function() {
                    client.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    })
                });
            }
        });

        // Handle clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            chat.remove({}, function(){
                // Emit cleared
                socket.emit('cleared');
                sendStatus({
                    message: 'Conversation cleared',
                    clear: true
                })
            })
        });

    });
});
