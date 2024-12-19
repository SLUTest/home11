const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection',(ws) =>{
    console.log('Новый клиент подключился');

    ws.send(JSON.stringify({
        type: 'system',
        content: 'Добро пожаловать в чат!'
    }));

    ws.on('message', (message) => {
        let parseMess;
        try{
            parseMess = JSON.parse(message);
            console.log('Получено сообщение: ', parseMess)
        }
        catch (er) {
            console.log('Произошла ошибка обработки : ' + er);
            return;
        }

        wss.clients.forEach( (elem) => {
            if (elem.readyState === WebSocket.OPEN){
                elem.send(JSON.stringify(parseMess));
            }
        })
    })
})

console.log('сервер запущен')
