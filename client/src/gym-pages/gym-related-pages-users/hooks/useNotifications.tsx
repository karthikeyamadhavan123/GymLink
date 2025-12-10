import { useEffect } from "react";
import useUserStore, { useNotificationStore } from "@/zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { NotificationProps } from "../types/types";



export const useNotifications = () => {
  const userId = useUserStore((state) => state.details?.userId);
  const { notifications, setNotifications } = useNotificationStore()
  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_DB_URL + "/jobs/notifications/all",
        { withCredentials: true }
      );
      setNotifications(res.data.notifications || []);
      toast.success("Notifications fetched successfully");
    } catch (err) {
      console.error(err);
    }
  };


  const isRead = (n: NotificationProps) => {
    const readArray = Array.isArray(n?.readBy) ? n.readBy : [];
    return userId ? readArray.includes(userId) : false;
  };

  const markAllRead = async (updatenotifications: NotificationProps[]) => {
    try {
      // never call hooks inside this function — keep it pure

      const notification_ids = [];

      if (!updatenotifications) return;

      let updatedNotificationsList = [];

      if (userId) {
        for (let i = 0; i < updatenotifications.length; i++) {
          notification_ids.push(updatenotifications[i]._id);
          updatenotifications[i].readBy.push(userId);
        }

        updatedNotificationsList = [...updatenotifications];
        setNotifications(updatedNotificationsList);
      }

      const res = await axios.put(
        import.meta.env.VITE_DB_URL + "/jobs/read-all/notifications",
        { notification_ids },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("All notifications marked as read successfully.");
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      toast.error("Could not mark all as read. Try again.");
    }
  };

  const numberOfUnreadMessages =() => {
    if(userId && notifications){
      const count = notifications.filter((notification,_index)=>!notification.readBy.includes(userId)).length
      return count;
    }
  }

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

  return { notifications, isRead, formatTime, setNotifications, markAllRead,numberOfUnreadMessages};
};
