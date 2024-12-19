const socket = new WebSocket('ws://localhost:8080');

const sendBtn =document.getElementById('send-btn');
const innerMes = document.getElementById('inner-mes');
const messegesBlock = document.querySelector('.messeges-block');

socket.onopen = (event) => {
    console.log('соединение успешно')
}

socket.onmessage = (event) =>{
    const message = JSON.parse(event.data);
    const messElem = document.createElement('div');

    if(message.type === 'system'){
        messElem.classList.add('sys-txt');
    }

    messElem.textContent = message.content;
    messegesBlock.appendChild(messElem);
    messegesBlock.scrollTop = messegesBlock.scrollHeight;
}

socket.onclose = (event) => {
    if (event.wasClean){
        console.log( `Соединение закрыто корректно`);
    } else{
        console.log('Соединение прервано')
    }
}

socket.onerror = (er) => {
    console.log('Ошибка '+er.message);
}

sendBtn.addEventListener('click', (event) => {    
    event.preventDefault();
    const mes = innerMes.value;
    if (mes) {
        const message = {
            type: 'user',
            content: mes
        }
        socket.send(JSON.stringify(message));
        innerMes.value = "";
    }
})