import React from "react";
import { X, CheckCheck } from "lucide-react";
import NotificationItem from "./NotificationItem";
import { useNotifications } from "../hooks/useNotifications";
import { NotificationModalProps } from "../types/types";


const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const { notifications, isRead, formatTime, markAllAsRead } = useNotifications();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-md rounded-xl shadow-lg border border-zinc-700 p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 hover:bg-zinc-800 rounded-lg transition"
        >
          <X size={20} className="text-gray-300 cursor-pointer" />
        </button>

        {/* Header */}
        <div className="flex justify-around items-center mb-4">
          <h2 className="text-white text-lg font-semibold">🔔 Notifications</h2>

          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1 text-sm px-3 py-1 rounded-md 
                       bg-zinc-800 border border-zinc-700 text-gray-300 
                       hover:border-lime-400 hover:text-lime-300 transition cursor-pointer"
          >
            <CheckCheck size={14} />
            Mark all as read
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {notifications.map((n) => (
            <NotificationItem
              key={n._id}
              n={n}
              isRead={isRead(n)}
              formatTime={formatTime}
            />
          ))}
        </div>

        <div className="mt-5 text-center">
          <p className="text-gray-400 text-xs">These are dummy notifications</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
