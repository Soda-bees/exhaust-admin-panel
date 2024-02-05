import  io  from "socket.io-client"
import { baseURL } from "../Api"

const socket = io(baseURL)

export default socket

socket.on('connect', () => {
    console.log('Connected to server');
});