const mongoClient = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

// Single Connection / User:
// socket.emit

// All Connections / Users:
// client.emit

// Connect to MongoDB
mongoClient.connect('mongodb://127.0.0.1/simplechat', (error, database) => {
    if (error) {
        throw error;
    }
    console.log('MongoDB connected...');

    const db = database.db('simplechat');

    // Connect to Socket.io
    client.on('connection', (socket) => {
        console.log('Client connected...');

        let chats = db.collection('chats');

        // Create function to send notification to single connection / user
        sendNotification = (notification) => {
            socket.emit('notification', notification);
        }

        // Get chats from mongodb collection and send it to the clients
        sendAllChats = () => {
            chats.find().limit(100).sort({_id:1}).toArray((error, result) => {
                if (error) {
                    throw error;
                }
                // Emit the messages
                client.emit('output', result);
                console.log('All messaged sent');
            });
        }

        sendAllChats();

        // Handle input events
        socket.on('input', (data) => {
            console.log(data);
            let name = data.name;
            let message = data.message;

            // Check for name and message
            if (name == '' || message == '') {
                // Send error status
                sendNotification({
                    message: 'Please enter a name and message',
                    alertClass: 'alert-warning'
                });
            } else {
                // Insert message
                chats.insert({name: name, message: message}, (data) => {
                    // socket.emit('output', [data]);
                    sendAllChats();
                })
            }
        });

        // Handle clear
        socket.on('DeleteAllMessages', (data) => {
            // Remove all chats from collection
            chats.remove({}, () => {
                console.log('All messaged have been deleted.');
                // Emit cleared
                client.emit('cleared');
                sendNotification({
                    message: 'All messaged have been deleted.',
                    alertClass: 'alert-info'
                });
            });
        });
    });

});

