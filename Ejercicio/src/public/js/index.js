//Configuracion de socket 

const socket = io();


//swtalert
Swal.fire({
    icon: 'succes',
    title: 'Socket conectado',
    text: 'Para ver la consola de logs, abre la consola de desarrollador en tu navegador',
    confirmButtonText: 'ok'
})



// socket.emit('mensaje_key', "Hola soy el cliente")
//Escucho al server
// socket.on('mensaje_02', (data)=>{
//     console.log(data);
    
// })

//Broadcast

// socket.on('msg_93', (data)=>{
//     console.log(data);
    
// })

// ejemplo de todos
// socket.on('msj_4', (data)=>{
//     console.log(data);
    
// })
