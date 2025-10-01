import { useState } from 'react';

const useNotification = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const showNotification = () => {
    setIsNotificationOpen(true);
    setTimeout(() => {
      setIsNotificationOpen(false);
    }, 5000);
  };

  return { isNotificationOpen, showNotification };
};

export default useNotification;