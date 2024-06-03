import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { NotificationProps } from "pages/notification/NotificationPage";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Notification.module.scss";
export default function NotificationBox({
  notification,
}: {
  notification: NotificationProps;
}) {
  const navigate = useNavigate();

  const onClickNotification = async (url: string) => {
    //isRead 읽으면 업데이트
    const ref = doc(db, "notification", notification.id);
    await updateDoc(ref, {
      isRead: true,
    });
    //해당 url로 이동
    navigate(url);
  };
  return (
    <div key={notification.id} className={styles.notification}>
      <div onClick={() => onClickNotification(notification?.url)}>
        <div className={styles.notification__flex}>
          <div className={styles.notification__createdAt}>
            {notification?.createdAt}
          </div>
          {notification?.isRead === false && (
            <div className={styles.notification__unread} />
          )}
        </div>
        <div className={styles.notification}>{notification.content}</div>
      </div>
    </div>
  );
}
