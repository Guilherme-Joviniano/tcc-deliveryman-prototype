import { io } from "socket.io-client";


export const socket = io('http://yvypora-backend.eastus.cloudapp.azure.com', {
    query: {
        token: localStorage.getItem('user-logged-token'),
    },
});


