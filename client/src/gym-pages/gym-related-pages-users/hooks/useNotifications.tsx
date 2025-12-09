import { useEffect, useState } from "react";
import useUserStore from "@/zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { NotificationProps } from "../types/types";



export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const userId = useUserStore((state) => state.details?.userId);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_DB_URL + "/jobs/notifications/all",
        { withCredentials: true }
      );
      setNotifications(res.data.notifications);
      toast.success("Notifications fetched successfully");
    } catch (err) {
      console.error(err);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const ids = notifications.map((n) => n._id);

      await axios.put(
        import.meta.env.VITE_DB_URL + "/jobs/notifications/mark-read",
        { notification_ids: ids },
        { withCredentials: true }
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n.readBy.includes(userId!) ? n : { ...n, readBy: [...n.readBy, userId!] }
        )
      );

      toast.success("All notifications marked as read!");
    } catch (error) {
      console.log(error);
    }
  };

  // Check if a notification is read by user
  const isRead = (n: NotificationProps) => {
    return userId ? n.readBy.includes(userId) : false;
  };

  // Time formatting logic
  const formatTime = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);

    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return { notifications, isRead, formatTime, markAllAsRead };
};
