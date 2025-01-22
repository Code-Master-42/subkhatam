"use client"
import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Your car rental is confirmed for tomorrow!", read: false },
    { id: 2, message: "Don't forget to leave a review for your last rental.", read: false },
    { id: 3, message: "Special offer: 20% off on weekend rentals!", read: false },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-600">No new notifications.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li key={notif.id} className={`p-4 border rounded-lg flex items-start justify-between ${notif.read ? 'bg-gray-100' : 'bg-white'}`}>
              <div className="flex items-start">
                <Bell className={`mr-3 ${notif.read ? 'text-gray-400' : 'text-blue-500'}`} />
                <span className={notif.read ? 'text-gray-600' : 'text-black'}>{notif.message}</span>
              </div>
              <div className="flex items-center">
                {!notif.read && (
                  <button 
                    onClick={() => markAsRead(notif.id)}
                    className="text-sm text-blue-500 hover:text-blue-700 mr-3"
                  >
                    Mark as read
                  </button>
                )}
                <button 
                  onClick={() => deleteNotification(notif.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )}