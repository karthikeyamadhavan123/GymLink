import React from "react";
import { Props } from "../types/types";

const NotificationItem: React.FC<Props> = ({ n, isRead, formatTime }) => {
  return (
    <div
      className={`p-3 rounded-lg border transition ${
        isRead
          ? "bg-zinc-800/50 border-zinc-700/50 opacity-60"
          : "bg-zinc-800 border-lime-400 border-2"
      }`}
    >
      <p className="text-gray-200 text-sm font-medium">
        New job alert: {n.notificationMessage}
      </p>
      <p className="text-gray-500 text-xs">{formatTime(n.createdAt)}</p>
    </div>
  );
};

export default NotificationItem;
