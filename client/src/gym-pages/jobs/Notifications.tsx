import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { formatDistanceToNow } from "date-fns";

interface NotificationProps {
  setstate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NotifcyProps {
  createdAt: string;
  jobNotification: {
    _id: string;
    postedBy: {
      gymName: string;
    };
  };
  _id: string;
  notificationMessage: string;
}

const notificationUrl = import.meta.env.VITE_DB_URL + "/jobs/notifications/all";


const Notifications: React.FC<NotificationProps> = ({ setstate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotifcyProps[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(notificationUrl, { withCredentials: true });
        if (response.status === 200) {
          setNotifications(response.data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

 

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Notifications</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setstate(false)}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* Notifications List */}
        <div className="mt-4 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <HashLoader color="#9AE6B4" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-6 text-gray-400">
              No notifications to display
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification: NotifcyProps) => (
                <div 
                  key={notification._id}
                  className={`p-3 rounded-lg transition-all  hover:bg-gray-600`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-lime-400">
                      {notification.jobNotification.postedBy.gymName}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTime(notification.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    {notification.notificationMessage}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-700">
          <button
            onClick={() => setstate(false)}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;