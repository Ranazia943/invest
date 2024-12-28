import React, { useEffect, useState } from 'react';
import { Delete, GppGood } from "@mui/icons-material";
import { useAuthContext } from '../authcontext/AuthContext';  // Import the custom hook to access the auth context
import toast from 'react-hot-toast'; // Import react-hot-toast for success message

const Notification = () => {
  const { authUser } = useAuthContext();  // Access the authUser from the context
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!authUser) {
      return; // If there's no user, don't try to fetch notifications
    }

    const fetchNotifications = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseURL}/api/withdrawl/notifications/${authUser._id}`);  // Use authUser._id
        const data = await response.json();
        setNotifications(data.notifications); // Set the notifications to state
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [authUser]);  // Re-run effect if authUser changes

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const deleteNotification = async (notificationId) => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseURL}/api/withdrawl/notifications/${notificationId}`, {
        method: 'DELETE', // DELETE request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }

      // Remove the deleted notification from the state
      setNotifications(notifications.filter(notification => notification._id !== notificationId));

      // Show success message
      toast.success('Notification deleted successfully');
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('Failed to delete notification');
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="cards space-y-4 w-[95%] md:w-[90%] mx-auto mt-20">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="card relative border flex-1 rounded-lg px-2 py-4 shadow-lg duration-300 hover:-translate-y-2 hover:shadow-green-100 flex justify-between items-center" 
                   style={{ backgroundColor: notification.isRead ? '#f0f0f0' : '#e3f2fd' }}>
                <div className="flex items-center gap-4 md:gap-16">
                  <div className="ml-2 md:ml-10">
                    <GppGood sx={{ color: notification.type === 'alert' ? 'red' : 'green' }} />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg lg:text-xl font-[500]" style={{ color: notification.type === 'alert' ? 'red' : 'green' }}>
                      {notification.title}
                    </h2>
                    <h4 className="text-[1.3vw] font-[400]" style={{ color: notification.type === 'alert' ? 'red' : 'green' }}>
                      {notification.message}
                    </h4>
                  </div>
                </div>
                <div className="text-danger" style={{ color: 'red' }}>
  <Delete onClick={() => deleteNotification(notification._id)} /> {/* Add the onClick handler */}
</div>

              </div>
            ))
          ) : (
            <p>No notifications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
