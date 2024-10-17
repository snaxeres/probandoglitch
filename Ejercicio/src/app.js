import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'


// declaramos express 
const app = express();
const PORT = 8080;


//Preparar la config del servidor para recibir objetos JSON 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configrar handlebars como motor de plantilla

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


//Ubicacion de carpeta public

app.use(express.static(__dirname + '/public/'));


app.use("/ping", (req, res) => {
    res.send("pong")
})

app.use('/socket', viewsRouter)

const httpServer = app.listen(PORT, () => {
    console.log('estas en el puerto: ' + PORT);

});


//Ejemplo nuevo chat basico
const logs = [];
// instanciamos socket.io

const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    // Esto lo ve todos los usuarios que se conecten
    socketServer.emit('messageLogs', logs)

    //Ejemplo nuevo chat basico
    socket.on('message', data => {
        logs.push(data)

        //enviar los logs al cliente
        socketServer.emit('messageLogs', logs)

    });

    //hacemos un broadcast del nuevo usuario que se conecto para que todos vean que se ingreso un nuevo usuario
    //Notificacion push al resto de los usuarios
    socket.on('userConnected', data => {
        console.log(data);
        socket.broadcast.emit('userConnected', data.user)
        
    })
})


