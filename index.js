const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/users.routes');
const ucontroller = require('./controllers/user.controller');
const path  = require('path');
const app = express();

const Stock = require('./models/stock.model');


const server = require('http').createServer(app);

const io = require('socket.io')(server);
const { verify } = require('./utilities/auth');


io.on('connection', (socket)=>{ 
    
    // listen for message from user 
    socket.on('authenticate', async function (auth){ 
        const   valid= await verify(auth.token);
        if(!valid) {
            socket.emit("unauthorized",{"unauthorized":true})
        }

       async function emit() {
            const data = await ucontroller.userdata(auth.token);
            if(data.valid&&socket.connected) {
                socket.emit("data",{"data":data});
                let time = Math.random()*10000+2000;
                setTimeout(async function() { 
                    await  emit();
                },time);
            }  else {
                socket.emit("unauthorized",{"unauthorized":true});
            }
        }

       await emit();
    }); 
    
    // when server disconnects from user 
    socket.on('disconnect', ()=>{ 

    }); 
  }); 

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname+'/public')))

const dbconfig = require('./config/database.config.js');



const mongoose = require('mongoose');
const { token } = require('morgan');

mongoose.Promise = global.Promise;

mongoose.connect(dbconfig.dburl, {
    useNewUrlParser: true
}).then(async () => {
  
    async function updatedata() {
        let stock= await Stock.find();

        for(let key of stock) {
            key.value = Math.floor(Math.random()*3000);
            await key.save();
        }
        
        let time = Math.random()*5000;
        setTimeout(async function() { await updatedata();},time);
    }
    await updatedata();
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//Listening for Users Endpoint;
user(app);




app.get('*', function(req, res){
    res.sendFile(path.join(__dirname+'/public/login.html'))
});
// listen for requests
// app.listen(3000, () => {
//     console.log("Server is listening on port 3000");
// });

server.listen(process.env.PORT||3000);
