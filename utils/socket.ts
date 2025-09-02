import { baseUrl } from "@/constants/baseUrl";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (query: Record<string, any> = {}): Socket => {
    console.log(query)
  if (!socket) {
    socket = io(`${baseUrl}`, {
      query,
      transports: ["websocket"],
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
