import { createContext } from 'react';
import socketio, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";


interface ContextInterface {
  [x: string]: any;
  socket: Socket;
}


export const socket = socketio(SOCKET_URL,{
  withCredentials: true,
  extraHeaders: {
      "secretHeader": "secret value"
  }
});
export const SocketContext = createContext<ContextInterface |null >(null);