
import axios from 'axios';

interface IMessageService {
    createdAt: string,
    senderName: string,
    senderId: number,
    receiverName: string,
    receiverId: number,
    content: string
    id: string
}

export class ChatService {
    private API = axios.create({
        baseURL: "http://yvypora-backend.eastus.cloudapp.azure.com/no-relational/"
    })

    async index(senderId: number, receiverId: number): Promise<{ error: boolean, data: IMessageService[], code: number }> {
        const { data } =  await this.API.get(`chat?receiverId=${senderId}&senderId=${receiverId}`)
        return data;
    }
}