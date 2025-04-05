'use client'

import { createContext, useContext, ReactNode, useEffect } from "react";

interface NotificationContextType {
  notify: (title: string, option: NotificationOptions) => void;
}

// Create the context with an initial value
const NotificationContext: React.Context<NotificationContextType | undefined> = createContext<NotificationContextType | undefined>(undefined);

const NotificationProvider = ({ children }: { children: ReactNode }) => {

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    } else {
      console.log('This browser does not support notifications.');
    }
  }, [])

  const notify = (title: string, option: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, option);
    } else {
      console.log('Notification permission not granted.');
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notify
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
};

// Custom hook to use the Notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  // Throw an error if the hook is used outside of a NotificationProvider
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export default NotificationProvider