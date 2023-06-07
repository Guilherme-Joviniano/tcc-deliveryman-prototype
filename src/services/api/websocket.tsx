import { io } from "socket.io-client";


export const socket = io('http://yvypora-backend.eastus.cloudapp.azure.com', {
    autoConnect: true,    
    query: {
        token: localStorage.getItem('token'),
    },
});


