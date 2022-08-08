import { io } from "socket.io-client";
const SERVER_URL = process.env.REACT_APP_SERVER_URL
const options ={
    'force new connection':true,
    reconnectionAttempt:'Infinity',
    timeout:10000,
    transports:['websocket']
}
export const initSocket = async()=>{
    return io(SERVER_URL!,options);
}