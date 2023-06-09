import { io } from "socket.io-client";


export const socket = io('https://yvypora.eastus.cloudapp.azure.com', {
    autoConnect: true,    
    query: {
        token: localStorage.getItem('token'),
    },
});


