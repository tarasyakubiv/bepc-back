const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);
let config = require('config');

const mongoose = require('mongoose');

let apiRoutes = require("./routes/api-routes")

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(config.DBHost, { useNewUrlParser: true })

var port = process.env.PORT || 8080

io.origins('*:*');

io.on('connection', (socket) => {

    socket.on('NEW_CHANGE', function(data){
        io.emit('REFRESH', data);
    })
});

app.use('/api', apiRoutes);

server.listen(port, function () {
    console.log("Running Tree View on port " + port)
})

module.exports = server;




