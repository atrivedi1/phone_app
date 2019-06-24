import React from 'react';

function determineNotificationType(message) {
  if (message.includes("0788312345")) {
    return "Notification_Problem"
  } else {
    return "Notification_Success"
  }
}

function Notification(props) {
  let { message, closeNotification } = props;

  return (
    <div 
      className={determineNotificationType(message)} 
      onClick={(e) => {closeNotification()}}
    >
        {message}
    </div>
  );
}

export default Notification