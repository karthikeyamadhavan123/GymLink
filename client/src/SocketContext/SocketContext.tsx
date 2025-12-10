

import useUserStore,{useNotificationStore} from "@/zustand";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
    socket: Socket | null;
}

export const SocketContext = createContext<ISocketContext>({
    socket: null,
});

export const useSocketContext = () => {
    return useContext(SocketContext);
};

const SocketContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const {addNotification} = useNotificationStore()
    const authUser = useUserStore((state) => state.details?.userId);


    useEffect(() => {
        if (authUser) {
            const socket_connection: Socket = io(import.meta.env.VITE_DB_URL, {
                query: {
                    userId: authUser,
                },
                withCredentials:true
            },);
            setSocket(socket_connection);            
            socket_connection.on("notification", (notification)=>{
                addNotification(notification.notification)
            });

            return () => {
                socket_connection.close();
            };
        } else {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;