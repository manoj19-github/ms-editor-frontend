import { io } from "socket.io-client";
// const SERVER_URL = `https://ms-editor.onrender.com`;
const SERVER_URL = `http://localhost:5000`;
const options ={
    'force new connection':true,
    reconnectionAttempt:'Infinity',
    timeout:50000,
    transports:['websocket']
}
export const initSocket = async()=>{
    return io(SERVER_URL!,options);
}
