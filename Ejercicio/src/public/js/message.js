const socket = io();

let user;


const chatBox = document.getElementById('chatBox');


//Aplicando Swal

Swal.fire({
    icon: 'info',
    title: 'Socket conectado',
    input: 'text',
    text: 'Ingrese el username',
    color: '#716add',
    inputValidator: (value) => {
        if (!value) {
            return 'Por favor ingrese un nombre de usuario'
        } else {
            //2da parte
            socket.emit('userConnected', {user: value})
        }
    },
    //no deja pasar el usuuario
    allowOutsideClick: false,

}).then(result => {
    user = result.value


    //cargamos el dato en el navegador
    const myName = document.getElementById('myName')
    myName.innerText = user
})



//enviar caracteres
chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatBox.value })
            chatBox.value = ''
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'alerta',
                text: 'Por favor ingrese un mensaje'
            }
            )
        }

    }

});


//Escuchamos a todos los usuarios que estan conectados
// Recibimos un array de objetos  -----> [{user: 'jhon', message, etc}]

socket.on('messageLogs', data=>{
    const messageLogs = document.getElementById('messageLogs');
    let logs = ''

    data.forEach(log => {
        logs += `<div><span>${log.user}:</span> ${log.message}</div>`
    });

    messageLogs.innerHTML = logs;
})

//Escuchamos si un usuario se conecta
//(Sgda parte)

socket.on('userConnected', user => {
    let message = `Nuevo Usuario conectado: ${user}`
    Swal.fire({
        icon: 'info',
        title: 'Nuevo usuario conectado a la sala',
        text: message,
        toast: true,
        color: '#716add',
        possition: 'top-right'
    })
})