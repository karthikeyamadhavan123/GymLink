// import useUserStore from "@/zustand";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// interface ISocketContext {
//   socket: Socket | null;
//   s_notifications: any[];
// }

// export const SocketContext = createContext<ISocketContext>({
//   socket: null,
//   s_notifications: []
// });

// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

// const SocketContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   // const [socket, setSocket] = useState<Socket | null>(null);
//   const [s_notifications, setNotifications] = useState<any[]>([]);
//   const authUser = useUserStore((state) => state.details?.userId);


 

//   return (
//     <SocketContext.Provider value={{ socket, s_notifications }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketContextProvider;