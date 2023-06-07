import { io } from "socket.io-client";
import { SOCKET_URL } from "../constants/dataConst";

export const socket = io(SOCKET_URL, { path: "/ws/socket.io/", transports: ['websocket', 'polling']});

export const OpenAIService = {
     callApi: () => {
          return async (text: string | any) => {

               socket.emit('chat', text)

          }
     }
}